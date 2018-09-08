import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = function styles(_ref) {
  const space = _ref.space;

      
const color = _ref.color;
  return {
    hr: {
      borderBottom: [[1, color.border, 'solid']],
      marginTop: 0,
      marginBottom: space[2]
    }
  };
};

export function HrRenderer(_ref2) {
  const classes = _ref2.classes;
  return React.createElement("hr", {
    className: classes.hr
  });
}
HrRenderer.propTypes = {
  classes: PropTypes.object.isRequired
};
export default Styled(styles)(HrRenderer);