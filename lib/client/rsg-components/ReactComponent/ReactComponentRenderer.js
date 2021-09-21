import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import Pathline from 'rsg-components/Pathline';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var color = _ref.color,
      fontSize = _ref.fontSize,
      space = _ref.space;
  return {
    root: {
      marginBottom: space[6]
    },
    header: {
      marginBottom: space[3]
    },
    tabs: {
      marginBottom: space[3]
    },
    tabButtons: {
      marginBottom: space[1]
    },
    tabBody: {
      overflowX: 'auto',
      maxWidth: '100%',
      WebkitOverflowScrolling: 'touch'
    },
    docs: {
      color: color.base,
      fontSize: fontSize.text
    }
  };
};

export var ReactComponentRenderer = function ReactComponentRenderer(_ref2) {
  var classes = _ref2.classes,
      name = _ref2.name,
      heading = _ref2.heading,
      pathLine = _ref2.pathLine,
      description = _ref2.description,
      docs = _ref2.docs,
      examples = _ref2.examples,
      tabButtons = _ref2.tabButtons,
      tabBody = _ref2.tabBody;
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root,
    "data-testid": name + "-container"
  }, /*#__PURE__*/React.createElement("header", {
    className: classes.header
  }, heading, pathLine && /*#__PURE__*/React.createElement(Pathline, null, pathLine)), (description || docs) && /*#__PURE__*/React.createElement("div", {
    className: classes.docs
  }, description, docs), tabButtons && /*#__PURE__*/React.createElement("div", {
    className: classes.tabs
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.tabButtons
  }, tabButtons), /*#__PURE__*/React.createElement("div", {
    className: classes.tabBody
  }, tabBody)), examples);
};
ReactComponentRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  heading: PropTypes.node.isRequired,
  filepath: PropTypes.string,
  pathLine: PropTypes.string,
  tabButtons: PropTypes.node,
  tabBody: PropTypes.node,
  description: PropTypes.node,
  docs: PropTypes.node,
  examples: PropTypes.node,
  isolated: PropTypes.bool
};
export default Styled(styles)(ReactComponentRenderer);