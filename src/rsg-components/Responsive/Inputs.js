import React, { PropTypes } from 'react';

class Inputs extends React.Component {
	onChange(configName) {
		return (event) => {
			this.props.updateResponsiveConfig({ [configName]: event.target.value });
		};
	}

	render() {
		return (
			<div>
				width:
				<input
					type="text"
					value={this.props.responsiveConfig.width}
					onChange={this.onChange('width')}
				/>
			</div>
		);
	}
}

Inputs.propTypes = {
	responsiveConfig: PropTypes.object.isRequired,
	updateResponsiveConfig: PropTypes.func.isRequired,
};

export default Inputs;
