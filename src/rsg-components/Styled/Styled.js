import React, { Component } from 'react';
import PropTypes from 'prop-types';
import addStyles from '../../styles/addStyles';

export default styles => WrappedComponent =>
	class extends Component {
		static contextTypes = {
			config: PropTypes.object,
		};

		componentWillMount() {
			const componentName = WrappedComponent.name.replace(/Renderer$/, '');
			this.classes = addStyles(styles, this.context.config || {}, componentName);
		}

		render() {
			return <WrappedComponent {...this.props} classes={this.classes} />;
		}
	};
