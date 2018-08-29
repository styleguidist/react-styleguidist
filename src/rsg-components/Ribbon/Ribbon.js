import React from 'react';
import PropTypes from 'prop-types';
import RibbonRenderer from 'rsg-components/Ribbon/RibbonRenderer';
import { Consumer } from '../../provider';

function Ribbon({ config }) {
	const { ribbon } = config;
	return ribbon ? <RibbonRenderer {...ribbon} /> : null;
}

Ribbon.propTypes = {
	config: PropTypes.object,
};

export default Consumer(Ribbon);
