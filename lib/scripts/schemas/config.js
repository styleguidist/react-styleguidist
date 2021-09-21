"use strict";

exports.__esModule = true;
exports.default = void 0;

var _glogg = _interopRequireDefault(require("glogg"));

var _path = _interopRequireDefault(require("path"));

var _startCase = _interopRequireDefault(require("lodash/startCase"));

var _kleur = _interopRequireDefault(require("kleur"));

var reactDocgen = _interopRequireWildcard(require("react-docgen"));

var _reactDocgenDisplaynameHandler = require("react-docgen-displayname-handler");

var _reactDocgenAnnotationResolver = _interopRequireDefault(require("react-docgen-annotation-resolver"));

var _findUserWebpackConfig = _interopRequireDefault(require("../utils/findUserWebpackConfig"));

var _getUserPackageJson = _interopRequireDefault(require("../utils/getUserPackageJson"));

var _findFileCaseInsensitive = _interopRequireDefault(require("../utils/findFileCaseInsensitive"));

var _error = _interopRequireDefault(require("../utils/error"));

var consts = _interopRequireWildcard(require("../consts"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// If you want to access any of these options in React, don’t forget to update CLIENT_CONFIG_OPTIONS array
// in loaders/styleguide-loader.js
const EXTENSIONS = 'js,jsx,ts,tsx';
const DEFAULT_COMPONENTS_PATTERN = // HACK: on windows, the case insensitivity makes each component appear twice
// to avoid this issue, the case management is removed on win32
// it virtually changes nothing
process.platform === 'win32' ?
/* istanbul ignore next: no windows on our test plan */
`src/components/**/*.{${EXTENSIONS}}` : `src/@(components|Components)/**/*.{${EXTENSIONS}}`;
const logger = (0, _glogg.default)('rsg');
const configSchema = {
  assetsDir: {
    type: ['array', 'existing directory path'],
    example: 'assets'
  },
  tocMode: {
    type: 'string',
    default: 'expand'
  },
  compilerConfig: {
    type: 'object',
    default: {
      // Don't include an Object.assign ponyfill, we have our own
      objectAssign: 'Object.assign',
      // Transpile only features needed for IE11
      target: {
        ie: 11
      },
      transforms: {
        // Don't throw on ESM imports, we transpile them ourselves
        modules: false,
        // Enable tagged template literals for styled-components
        dangerousTaggedTemplateString: true,
        // to make async/await work by default (no transformation)
        asyncAwait: false
      }
    }
  },
  // `components` is a shortcut for { sections: [{ components }] },
  // see `sections` below
  components: {
    type: ['string', 'function', 'array'],
    example: 'components/**/[A-Z]*.js'
  },
  configDir: {
    process: (value, config, rootDir) => rootDir
  },
  context: {
    type: 'object',
    default: {},
    example: {
      map: 'lodash/map'
    }
  },
  contextDependencies: {
    type: 'array'
  },
  configureServer: {
    type: 'function'
  },
  dangerouslyUpdateWebpackConfig: {
    type: 'function'
  },
  defaultExample: {
    type: ['boolean', 'existing file path'],
    default: false,
    process: val => val === true ? _path.default.resolve(__dirname, '../../../templates/DefaultExample.md') : val
  },
  exampleMode: {
    type: 'string',
    process: (value, config) => {
      return config.showCode === undefined ? value : config.showCode ? 'expand' : 'collapse';
    },
    default: 'collapse'
  },
  getComponentPathLine: {
    type: 'function',
    default: componentPath => componentPath
  },
  getExampleFilename: {
    type: 'function',
    default: componentPath => {
      const files = [_path.default.join(_path.default.dirname(componentPath), 'Readme.md'), // ComponentName.md
      componentPath.replace(_path.default.extname(componentPath), '.md'), // FolderName.md when component definition file is index.js
      _path.default.join(_path.default.dirname(componentPath), _path.default.basename(_path.default.dirname(componentPath)) + '.md')];

      for (const file of files) {
        const existingFile = (0, _findFileCaseInsensitive.default)(file);

        if (existingFile) {
          return existingFile;
        }
      }

      return false;
    }
  },
  handlers: {
    type: 'function',
    default: componentPath => reactDocgen.defaultHandlers.concat((0, _reactDocgenDisplaynameHandler.createDisplayNameHandler)(componentPath))
  },
  ignore: {
    type: 'array',
    default: ['**/__tests__/**', `**/*.test.{${EXTENSIONS}}`, `**/*.spec.{${EXTENSIONS}}`, '**/*.d.ts']
  },
  editorConfig: {
    process: value => {
      if (value) {
        throw new _error.default(`${_kleur.default.bold('editorConfig')} config option was removed. Use “theme” option to change syntax highlighting.`);
      }
    }
  },
  logger: {
    type: 'object'
  },
  minimize: {
    type: 'boolean',
    default: true
  },
  moduleAliases: {
    type: 'object'
  },
  mountPointId: {
    type: 'string',
    default: 'rsg-root'
  },
  pagePerSection: {
    type: 'boolean',
    default: false
  },
  previewDelay: {
    type: 'number',
    default: 500
  },
  printBuildInstructions: {
    type: 'function'
  },
  printServerInstructions: {
    type: 'function'
  },
  propsParser: {
    type: 'function'
  },
  require: {
    type: 'array',
    default: [],
    example: ['babel-polyfill', 'path/to/styles.css']
  },
  resolver: {
    type: 'function',
    default: (ast, recast) => {
      const findAllExportedComponentDefinitions = reactDocgen.resolver.findAllExportedComponentDefinitions;
      const annotatedComponents = (0, _reactDocgenAnnotationResolver.default)(ast, recast);
      const exportedComponents = findAllExportedComponentDefinitions(ast, recast);
      return annotatedComponents.concat(exportedComponents);
    }
  },
  ribbon: {
    type: 'object',
    example: {
      url: 'http://example.com/',
      text: 'Fork me on GitHub'
    }
  },
  sections: {
    type: 'array',
    default: [],
    process: (val, config) => {
      if (!val) {
        // If root `components` isn't empty, make it a first section
        // If `components` and `sections` weren’t specified, use default pattern
        const components = config.components || DEFAULT_COMPONENTS_PATTERN;
        return [{
          components
        }];
      }

      return val;
    },
    example: [{
      name: 'Documentation',
      content: 'Readme.md'
    }, {
      name: 'Components',
      components: './lib/components/**/[A-Z]*.js'
    }]
  },
  serverHost: {
    type: 'string',
    default: '0.0.0.0'
  },
  serverPort: {
    type: 'number',
    default: parseInt(process.env.NODE_PORT) || 6060
  },
  showCode: {
    type: 'boolean',
    default: false,
    deprecated: 'Use exampleMode option instead'
  },
  showUsage: {
    type: 'boolean',
    default: false,
    deprecated: 'Use usageMode option instead'
  },
  showSidebar: {
    type: 'boolean',
    default: true
  },
  skipComponentsWithoutExample: {
    type: 'boolean',
    default: false
  },
  sortProps: {
    type: 'function'
  },
  styleguideComponents: {
    type: 'object'
  },
  styleguideDir: {
    type: 'directory path',
    default: 'styleguide'
  },
  styles: {
    type: ['object', 'existing file path', 'function'],
    default: {},
    example: {
      Logo: {
        logo: {
          fontStyle: 'italic'
        }
      }
    },
    process: (val, config, configDir) => {
      return typeof val === 'string' ? _path.default.resolve(configDir, val) : val;
    }
  },
  template: {
    type: ['object', 'function'],
    default: {},
    process: val => {
      if (typeof val === 'string') {
        throw new _error.default(`${_kleur.default.bold('template')} config option format has been changed, you need to update your config.`, 'template');
      }

      return val;
    }
  },
  theme: {
    type: ['object', 'existing file path'],
    default: {},
    example: {
      link: 'firebrick',
      linkHover: 'salmon'
    },
    process: (val, config, configDir) => typeof val === 'string' ? _path.default.resolve(configDir, val) : val
  },
  title: {
    type: 'string',
    process: val => {
      if (val) {
        return val;
      }

      const name = (0, _getUserPackageJson.default)().name || '';
      return `${(0, _startCase.default)(name)} Style Guide`;
    },
    example: 'My Style Guide'
  },
  updateDocs: {
    type: 'function'
  },
  updateExample: {
    type: 'function',
    default: props => {
      if (props.lang === 'example') {
        props.lang = 'js';
        logger.warn('"example" code block language is deprecated. Use "js", "jsx" or "javascript" instead:\n' + consts.DOCS_DOCUMENTING);
      }

      return props;
    }
  },
  updateWebpackConfig: {
    type: 'function',
    removed: `Use "webpackConfig" option instead:\n${consts.DOCS_WEBPACK}`
  },
  usageMode: {
    type: 'string',
    process: (value, config) => {
      return config.showUsage === undefined ? value : config.showUsage ? 'expand' : 'collapse';
    },
    default: 'collapse'
  },
  verbose: {
    type: 'boolean',
    default: false
  },
  version: {
    type: 'string'
  },
  webpackConfig: {
    type: ['object', 'function'],
    process: val => {
      if (val) {
        return val;
      }

      const file = (0, _findUserWebpackConfig.default)();

      if (file) {
        logger.info(`Loading webpack config from:\n${file}`); // eslint-disable-next-line import/no-dynamic-require

        return require(file);
      }

      logger.warn('No webpack config found. ' + 'You may need to specify "webpackConfig" option in your style guide config:\n' + consts.DOCS_WEBPACK);
      return undefined;
    },
    example: {
      module: {
        rules: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }]
      }
    }
  }
};
var _default = configSchema;
exports.default = _default;