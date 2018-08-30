import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const Context = React.createContext();

export function Consumer(WrappedComponent) {
	const componentName = WrappedComponent.name.replace(/Renderer$/, '');
	return class extends Component {
		static displayName = `Consumer(${componentName})`;
		state = {};
		render() {
			return (
				<Context.Consumer>
					{context => {
						if (!context) {
							throw new Error(`Consumer cannot be rendered outside the Provider component`);
						}
						return <WrappedComponent {...context} {...this.props} />;
					}}
				</Context.Consumer>
			);
		}
	};
}

export function Provider(props) {
	const { children, ...rest } = props;
	const ui = typeof children === 'function' ? children(this.state) : children;

	return <Context.Provider value={{ ...rest }}>{ui}</Context.Provider>;
}

Provider.propTypes = {
	children: PropTypes.any,
	codeRevision: PropTypes.number.isRequired,
	config: PropTypes.object.isRequired,
	slots: PropTypes.object.isRequired,
	displayMode: PropTypes.string,
};
