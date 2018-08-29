import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createStyleSheet from '../../styles/createStyleSheet';

export default (styles, WrappedComponent, componentName) =>
	class Styled extends Component {
		static displayName = `Styled(${componentName})`;
		static propTypes = {
			config: PropTypes.object,
		};
		constructor(props) {
			super(props);
			this.sheet = createStyleSheet(styles, props.config || {}, componentName);
			this.sheet.update(props).attach();
		}

		componentDidUpdate(nextProps) {
			this.sheet.update(nextProps);
		}

		render() {
			return <WrappedComponent {...this.props} classes={this.sheet.classes} />;
		}
	};
