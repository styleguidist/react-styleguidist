import React from 'react';
import { responsiveContextTypes } from 'rsg-components/Responsive/Provider';

function makeStyle(config) {
	return {
		width: config.width === 'auto' ? 'auto' : config.width + 'px',
		overflow: 'auto',
	};
}

const ResponsiveContainer = (props, context) => {
	return (
		<div style={makeStyle(context.responsiveConfig)}>
			{props.children}
		</div>
	);
};

ResponsiveContainer.propTypes = {
	children: React.PropTypes.node,
};

ResponsiveContainer.contextTypes = responsiveContextTypes;

export default ResponsiveContainer;
