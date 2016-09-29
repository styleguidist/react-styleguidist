import React from 'react';
import { responsiveContextTypes } from 'rsg-components/Responsive/Provider';
import Inputs from 'rsg-components/Responsive/Inputs';
import Presets from 'rsg-components/Responsive/Presets';

const s = require('./Toolbar.css');

const ResponsiveToolbar = (props, context) => {
	return (
		<div className={s.toolbar}>
			<Inputs {...context} />
			<Presets {...context} />
		</div>
	);
};

ResponsiveToolbar.contextTypes = responsiveContextTypes;

export default ResponsiveToolbar;
