import React from 'react';
import PropTypes from 'prop-types';
import MdFullscreen from 'react-icons/lib/md/fullscreen';
import MdFullscreenExit from 'react-icons/lib/md/fullscreen-exit';
import ToolbarButton from 'react-styleguidist-plugin-toolbarbutton'
import {getUrl} from 'react-styleguidist-utils';

const IsolateButton = ({ name, example, isolated }) =>
	isolated ? (
		<ToolbarButton href={getUrl({ anchor: true, slug: '/' })} title="Show all components">
			<MdFullscreenExit />
		</ToolbarButton>
	) : (
		<ToolbarButton href={getUrl({ name, example, isolated: true })} title="Open isolated">
			<MdFullscreen />
		</ToolbarButton>
	);

IsolateButton.propTypes = {
	name: PropTypes.string.isRequired,
	example: PropTypes.number,
	isolated: PropTypes.bool,
};

export default IsolateButton;
