import React from 'react';
import PropTypes from 'prop-types';
import TabButton from 'rsg-components/TabButton';
import isEmpty from 'lodash/isEmpty';

var UsageTabButton = function UsageTabButton(props) {
  var component = props.props;
  var showButton = !isEmpty(component.props) || !isEmpty(component.methods);
  return showButton ? /*#__PURE__*/React.createElement(TabButton, props, "Props & methods") : null;
};

UsageTabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  props: PropTypes.shape({
    props: PropTypes.array,
    methods: PropTypes.array
  }).isRequired,
  active: PropTypes.bool
};
export default UsageTabButton;