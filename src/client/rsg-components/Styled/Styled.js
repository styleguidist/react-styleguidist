import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createStyleSheet from '../../styles/createStyleSheet';

export default styles => WrappedComponent => {
	const componentName = WrappedComponent.name.replace(/Renderer$/, '');
	return class extends Component {
		static displayName = `Styled(${componentName})`;
		static contextTypes = {
			config: PropTypes.object,
			currentTheme: PropTypes.string,
		};

		constructor(props, context) {
			super(props, context);

			this.createSheet(context.currentTheme, props);
		}

		componentWillUpdate(nextProps, nextState, nextContext) {
			if (this.context.currentTheme !== nextContext.currentTheme) {
				this.createSheet(nextContext.currentTheme, nextProps);
			} else {
				this.sheet.update(nextProps);
			}
		}

		createSheet(currentTheme, props) {
			const { config } = this.context;

			if (this.sheet) {
				this.sheet.detach();
			}

			this.sheet = createStyleSheet(currentTheme, componentName, styles, config)
				.update(props)
				.attach();
		}

		render() {
			return <WrappedComponent {...this.props} classes={this.sheet.classes} />;
		}
	};
};
