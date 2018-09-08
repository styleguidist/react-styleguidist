function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const prismTheme = function prismTheme(_ref) {
  let _ref2;

  const color = _ref.color;
  return _ref2 = {}, _defineProperty(_ref2, "& .token.comment,\n& .token.prolog,\n& .token.doctype,\n& .token.cdata", {
    isolate: false,
    color: color.codeComment
  }), _defineProperty(_ref2, "& .token.punctuation", {
    isolate: false,
    color: color.codePunctuation
  }), _defineProperty(_ref2, "& .namespace", {
    isolate: false,
    opacity: 0.7
  }), _defineProperty(_ref2, "& .token.property,\n& .token.tag,\n& .token.boolean,\n& .token.number,\n& .token.constant,\n& .token.symbol", {
    isolate: false,
    color: color.codeProperty
  }), _defineProperty(_ref2, "& .token.deleted", {
    isolate: false,
    color: color.codeDeleted
  }), _defineProperty(_ref2, "& .token.selector,\n& .token.attr-name,\n& .token.string,\n& .token.char,\n& .token.builtin", {
    isolate: false,
    color: color.codeString
  }), _defineProperty(_ref2, "& .token.inserted", {
    isolate: false,
    color: color.codeInserted
  }), _defineProperty(_ref2, "& .token.operator,\n& .token.entity,\n& .token.url,\n& .language-css .token.string,\n& .style .token.string", {
    isolate: false,
    color: color.codeOperator
  }), _defineProperty(_ref2, "& .token.atrule,\n& .token.attr-value,\n& .token.keyword", {
    isolate: false,
    color: color.codeKeyword
  }), _defineProperty(_ref2, "& .token.function,\n& .token.class-name", {
    isolate: false,
    color: color.codeFunction
  }), _defineProperty(_ref2, "& .token.regex,\n& .token.important,\n& .token.variable", {
    isolate: false,
    color: color.codeVariable
  }), _defineProperty(_ref2, "& .token.important,\n& .token.bold", {
    isolate: false,
    fontWeight: 'bold'
  }), _defineProperty(_ref2, "& .token.italic", {
    isolate: false,
    fontStyle: 'italic'
  }), _defineProperty(_ref2, "& .token.entity", {
    isolate: false,
    cursor: 'help'
  }), _ref2;
};

export default prismTheme;