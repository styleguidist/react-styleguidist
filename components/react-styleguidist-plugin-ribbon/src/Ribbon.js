import React from 'react';
import PropTypes from 'prop-types';
import RibbonRenderer from 'react-styleguidist-plugin-ribbon/ribbonrenderer'

export default function Ribbon(props, { config }) {
	const { ribbon } = config;
	return ribbon ? <RibbonRenderer {...ribbon} /> : null;
}

Ribbon.contextTypes = {
	config: PropTypes.object,
};
