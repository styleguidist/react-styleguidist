import React, { Component, ComponentType, ComponentClass } from 'react';
import { Styles, StyleSheet, Classes } from 'jss';
import Context from 'rsg-components/Context';
import createStyleSheet from '../../styles/createStyleSheet';

export interface JssInjectedProps {
	classes: Classes;
}

export default function StyleHOC<P extends JssInjectedProps>(
	styles: Styles
): (WrappedComponent: ComponentClass<P>) => ComponentType<Omit<P, keyof JssInjectedProps>> {
	return (WrappedComponent: ComponentClass<P>) => {
		const componentName = WrappedComponent.name.replace(/Renderer$/, '');
		return class extends Component<Omit<P, keyof JssInjectedProps>> {
			public static displayName = `Styled(${componentName})`;
			public static contextType = Context;
			public sheet: StyleSheet;
			public constructor(props: Omit<P, keyof JssInjectedProps>, context: any) {
				super(props, context);
				this.sheet = createStyleSheet(styles, context.config || {}, componentName);
				this.sheet.update(props).attach();
			}

			public componentDidUpdate(nextProps: P) {
				this.sheet.update(nextProps);
			}

			public render() {
				return <WrappedComponent {...({ ...this.props, classes: this.sheet.classes } as P)} />;
			}
		};
	};
}
