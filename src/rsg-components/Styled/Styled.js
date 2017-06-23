import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createStyleSheet from '../../styles/createStyleSheet';

export default styles => WrappedComponent => {
	const componentName = WrappedComponent.name.replace(/Renderer$/, '');
	return class extends Component {
		static displayName = `Styled(${componentName})`;
		static contextTypes = {
			config: PropTypes.object,
		};

		componentWillMount() {
			this.sheet = createStyleSheet(styles, this.context.config || {}, componentName);
			this.sheet.update(this.props).attach();
		}

		componentWillReceiveProps(nextProps) {
			this.sheet.update(nextProps);
		}

		render() {
			return <WrappedComponent {...this.props} classes={this.sheet.classes} />;
		}
	};
};
