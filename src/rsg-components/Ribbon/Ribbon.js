import React from 'react';
import PropTypes from 'prop-types';
import RibbonRenderer from 'rsg-components/Ribbon/RibbonRenderer';

export default function Ribbon({}, { config }) {
	return <RibbonRenderer {...config.ribbon} />;
}

Ribbon.contextTypes = {
	config: PropTypes.object,
};
