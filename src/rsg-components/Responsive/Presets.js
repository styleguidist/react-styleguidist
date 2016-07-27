import React, { PropTypes } from 'react';

const presets = [
	{
		label: 'Reset',
		config: {
			width: 'auto',
		},
	},
	{
		label: 'Mobile',
		config: {
			width: '360',
		},
	},
	{
		label: 'Tablet',
		config: {
			width: '720',
		},
	},
	{
		label: 'Laptop',
		config: {
			width: '1360',
		},
	},
	{
		label: 'Desktop',
		config: {
			width: '1920',
		},
	},
];

const Presets = (props) => {
	return (
		<div>
			{presets.map((preset, index) => {
				return (
					<button key={index} onClick={() => props.updateResponsiveConfig(preset.config)}>
						{preset.label}
					</button>
				);
			})}
		</div>
	);
};

Presets.propTypes = {
	updateResponsiveConfig: PropTypes.func.isRequired,
};

export default Presets;
