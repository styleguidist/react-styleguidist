import "core-js/modules/es6.function.name";
import React from 'react';
import PropTypes from 'prop-types';
import MdFullscreen from 'react-icons/lib/md/fullscreen';
import MdFullscreenExit from 'react-icons/lib/md/fullscreen-exit';
import ToolbarButton from 'rsg-components/ToolbarButton';
import getUrl from '../../utils/getUrl';

const IsolateButton = function IsolateButton(_ref) {
  const name = _ref.name;

      
const example = _ref.example;

      
const isolated = _ref.isolated;
  return isolated ? React.createElement(ToolbarButton, {
    href: getUrl({
      anchor: true,
      slug: '/'
    }),
    title: "Show all components"
  }, React.createElement(MdFullscreenExit, null)) : React.createElement(ToolbarButton, {
    href: getUrl({
      name,
      example,
      isolated: true
    }),
    title: "Open isolated"
  }, React.createElement(MdFullscreen, null));
};

IsolateButton.propTypes = {
  name: PropTypes.string.isRequired,
  example: PropTypes.number,
  isolated: PropTypes.bool
};
export default IsolateButton;