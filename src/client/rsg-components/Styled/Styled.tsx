import React, { Component, ComponentType } from 'react';
import { Styles, StyleSheet, Classes } from 'jss';
import Context, { StyleGuideContextContents } from 'rsg-components/Context';
import createStyleSheet from '../../styles/createStyleSheet';
import * as Rsg from '../../../typings';

export interface JssInjectedProps {
	classes: Classes;
}

export default function StyleHOC<P extends JssInjectedProps>(
	styles: (t: Rsg.Theme) => Styles<string>
): (WrappedComponent: ComponentType<P>) => ComponentType<Omit<P, keyof JssInjectedProps>> {
	return (WrappedComponent: ComponentType<P>) => {
		const componentName = WrappedComponent.name.replace(/Renderer$/, '');
		return class extends Component<Omit<P, keyof JssInjectedProps>> {
			public static displayName = `Styled(${componentName})`;
			public static contextType = Context;
			private sheet: StyleSheet;
			public constructor(
				props: Omit<P, keyof JssInjectedProps>,
				context: StyleGuideContextContents
			) {
				super(props, context);
				this.sheet = createStyleSheet(
					styles,
					// the protection here is useful for tests
					context.config || {},
					componentName,
					context.cssRevision
				);
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
