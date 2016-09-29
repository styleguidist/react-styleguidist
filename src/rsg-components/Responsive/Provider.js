import React, { PropTypes } from 'react';

export const responsiveContextTypes = {
	responsiveConfig: PropTypes.object.isRequired,
	updateResponsiveConfig: PropTypes.func.isRequired,
};

export default class ResponsiveProvider extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
	};

	static childContextTypes = responsiveContextTypes;

	constructor() {
		super();
		this.state = {
			width: 'auto',
		};
		this.updateResponsiveConfig = this.updateResponsiveConfig.bind(this);
	}

	getChildContext() {
		return {
			responsiveConfig: this.state,
			updateResponsiveConfig: this.updateResponsiveConfig,
		};
	}

	updateResponsiveConfig(config) {
		this.setState(config);
	}

	render() {
		return React.Children.only(this.props.children);
	}
}
