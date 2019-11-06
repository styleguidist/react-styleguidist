import React, { Component, ComponentType, ComponentClass } from 'react';
import { Styles } from 'jss';
import Context from 'rsg-components/Context';
import createStyleSheet from '../../styles/createStyleSheet';

export default (styles: Styles) => (WrappedComponent: ComponentClass):ComponentClass => {
	const componentName = WrappedComponent.name.replace(/Renderer$/, '');
	return class extends Component {
		public static displayName = `Styled(${componentName})`;
		public static contextType = Context;
		public constructor(props, context) {
			super(props, context);
			this.sheet = createStyleSheet(styles, context.config || {}, componentName);
			this.sheet.update(props).attach();
		}

		public componentDidUpdate(nextProps) {
			this.sheet.update(nextProps);
		}

		public render() {
			return <WrappedComponent {...this.props} classes={this.sheet.classes} />;
		}
	};
};
