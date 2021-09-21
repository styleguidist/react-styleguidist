"use strict";

require("core-js/modules/es.symbol.description");

exports.__esModule = true;
exports.default = getProps;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _reactDocgen = require("react-docgen");

var _lodash = _interopRequireDefault(require("lodash"));

var _doctrine = _interopRequireDefault(require("doctrine"));

var _glogg = _interopRequireDefault(require("glogg"));

var _highlightCodeInMarkdown = _interopRequireDefault(require("./highlightCodeInMarkdown"));

var _removeDoclets = _interopRequireDefault(require("./removeDoclets"));

var _requireIt = _interopRequireDefault(require("./requireIt"));

var _getNameFromFilePath = _interopRequireDefault(require("./getNameFromFilePath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _glogg.default)('rsg');

const examplesLoader = _path.default.resolve(__dirname, '../examples-loader.js');

const JS_DOC_METHOD_PARAM_TAG_SYNONYMS = ['param', 'arg', 'argument'];
const JS_DOC_METHOD_RETURN_TAG_SYNONYMS = ['return', 'returns'];
const JS_DOC_ALL_SYNONYMS = [...JS_DOC_METHOD_PARAM_TAG_SYNONYMS, ...JS_DOC_METHOD_RETURN_TAG_SYNONYMS]; // HACK: We have to make sure that doclets is a proper object with correct prototype to
// work around an issue in react-docgen that breaks the build if a component has JSDoc tags
// like @see in its description, see https://github.com/reactjs/react-docgen/issues/155
// and https://github.com/styleguidist/react-styleguidist/issues/298

const getDocletsObject = str => ({ ..._reactDocgen.utils.docblock.getDoclets(str)
});

const getDoctrineTags = documentation => {
  return _lodash.default.groupBy(documentation.tags, 'title');
};

const doesExternalExampleFileExist = (componentPath, exampleFile) => {
  const exampleFilepath = _path.default.resolve(_path.default.dirname(componentPath), exampleFile);

  const doesFileExist = _fs.default.existsSync(exampleFilepath);

  if (!doesFileExist) {
    logger.warn(`An example file ${exampleFile} defined in ${componentPath} component not found.`);
  }

  return doesFileExist;
};

const getMergedTag = (tags, names) => {
  return names.reduce((params, name) => [...params, ...(tags[name] || [])], []);
};
/**
 * 1. Remove non-public methods.
 * 2. Extract doclets.
 * 3. Highlight code in descriptions.
 * 4. Extract @example doclet (load linked file with examples-loader).
 *
 * @param {object} doc
 * @param {string} filepath
 * @returns {object}
 */


function getProps(doc, filepath) {
  const outDocs = {
    doclets: {},
    displayName: '',
    ...doc,
    methods: undefined
  }; // Keep only public methods

  outDocs.methods = (doc.methods || []).filter(method => {
    const doclets = method.docblock && _reactDocgen.utils.docblock.getDoclets(method.docblock);

    return doclets && doclets.public;
  }); // Parse the docblock of the remaining methods with doctrine to retrieve
  // the JSDoc tags
  // if a method is visible it must have a docblock

  outDocs.methods = outDocs.methods.map(method => {
    const allTags = getDoctrineTags(_doctrine.default.parse(method.docblock, {
      sloppy: true,
      unwrap: true
    })); // Merge with react-docgen information about arguments and return value
    // with information from JSDoc

    const paramTags = getMergedTag(allTags, JS_DOC_METHOD_PARAM_TAG_SYNONYMS);
    const params = method.params && method.params.map(param => ({ ...param,
      ...paramTags.find(tagParam => tagParam.name === param.name)
    }));

    if (params) {
      method.params = params;
    }

    const returnTags = getMergedTag(allTags, JS_DOC_METHOD_RETURN_TAG_SYNONYMS);
    const returns = method.returns ? { ...method.returns,
      type: {
        type: 'NameExpression',
        ...method.returns.type
      }
    } : returnTags[0];

    if (returns) {
      method.returns = returns;
    } // Remove tag synonyms


    method.tags = _lodash.default.omit(allTags, JS_DOC_ALL_SYNONYMS);
    return method;
  });

  if (doc.description) {
    // Read doclets from the description and remove them
    outDocs.doclets = getDocletsObject(doc.description);

    const documentation = _doctrine.default.parse(doc.description);

    outDocs.tags = getDoctrineTags(documentation);
    outDocs.description = (0, _highlightCodeInMarkdown.default)((0, _removeDoclets.default)(doc.description));
    let exampleFileExists = false;
    let exampleFile = outDocs.doclets.example; // doc.doclets.example might be a boolean or undefined

    if (typeof outDocs.doclets.example === 'string' && filepath) {
      exampleFile = outDocs.doclets.example.trim();
      exampleFileExists = doesExternalExampleFileExist(filepath, exampleFile);
    }

    if (exampleFileExists) {
      outDocs.example = (0, _requireIt.default)(`!!${examplesLoader}!${exampleFile}`);
      delete outDocs.doclets.example;
    }
  } else {
    outDocs.doclets = {};
  }

  if (doc.props) {
    // Read doclets of props
    Object.keys(doc.props).forEach(propName => {
      if (!doc.props) {
        return;
      }

      const prop = doc.props[propName];
      const doclets = getDocletsObject(prop.description); // When a prop is listed in defaultProps but not in props the prop.description is undefined

      const documentation = _doctrine.default.parse(prop.description || ''); // documentation.description is the description without tags


      prop.description = documentation.description;
      prop.tags = getDoctrineTags(documentation); // Remove ignored props

      if (doclets && doclets.ignore && outDocs.props) {
        delete outDocs.props[propName];
      } else if (outDocs.props) {
        outDocs.props[propName] = prop;
      }
    });
  }

  if (!doc.displayName && filepath) {
    // Guess the exported component's display name based on the file path
    outDocs.displayName = (0, _getNameFromFilePath.default)(filepath);
  }

  if (outDocs.doclets && outDocs.doclets.visibleName) {
    outDocs.visibleName = outDocs.doclets.visibleName; // Custom tag is added both to doclets and tags
    // Removing from both locations

    delete outDocs.doclets.visibleName;

    if (outDocs.tags) {
      delete outDocs.tags.visibleName;
    }
  }

  return outDocs;
}