import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
  var space = _ref.space,
      color = _ref.color;
  return {
    hr: {
      borderBottom: [[1, color.border, 'solid']],
      marginTop: 0,
      marginBottom: space[2]
    }
  };
};

export var HrRenderer = function HrRenderer(_ref2) {
  var classes = _ref2.classes;
  return /*#__PURE__*/React.createElement("hr", {
    className: classes.hr
  });
};
HrRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired
};
export default Styled(styles)(HrRenderer);