import "core-js/modules/es.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import ToolbarButton from 'rsg-components/ToolbarButton';
import getUrl from '../../utils/getUrl';

var IsolateButton = function IsolateButton(_ref) {
  var name = _ref.name,
      example = _ref.example,
      isolated = _ref.isolated,
      href = _ref.href;

  if (isolated && !href) {
    return null;
  }

  var testID = example ? name + "-" + example + "-isolate-button" : name + "-isolate-button";
  return isolated ? /*#__PURE__*/React.createElement(ToolbarButton, {
    href: href,
    title: "Show all components",
    testId: testID
  }, /*#__PURE__*/React.createElement(MdFullscreenExit, null)) : /*#__PURE__*/React.createElement(ToolbarButton, {
    href: getUrl({
      name: name,
      example: example,
      isolated: true
    }),
    title: "Open isolated",
    testId: testID
  }, /*#__PURE__*/React.createElement(MdFullscreen, null));
};

IsolateButton.propTypes = {
  name: PropTypes.string.isRequired,
  example: PropTypes.number,
  isolated: PropTypes.bool
};
export default IsolateButton;