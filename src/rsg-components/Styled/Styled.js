import React, { Component } from 'react';
import { Context } from '../../provider';
import styledWrapper from './StyledWrapper';

export default styles => WrappedComponent => {
	const componentName = WrappedComponent.name.replace(/Renderer$/, '');

	const Styled = styledWrapper(styles, WrappedComponent, componentName);

	return class extends Component {
		static displayName = `Consumer(${componentName})`;
		state = {};

		render() {
			return (
				<Context.Consumer>
					{values => <Styled config={values ? values.config : {}} {...this.props} />}
				</Context.Consumer>
			);
		}
	};
};
