import React, { Component } from 'react';
import PropTypes from 'prop-types';
import addStyles from '../../styles/addStyles';

export default styles => WrappedComponent => {
	const componentName = WrappedComponent.name.replace(/Renderer$/, '');
	return class extends Component {
		static displayName = `Styled(${componentName})`;
		static contextTypes = {
			config: PropTypes.object,
		};

		componentWillMount() {
			this.classes = addStyles(styles, this.context.config || {}, componentName);
		}

		render() {
			return <WrappedComponent {...this.props} classes={this.classes} />;
		}
	};
};
