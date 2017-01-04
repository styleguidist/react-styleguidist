import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import noop from 'lodash/noop';
import { transform } from 'buble';
import PlaygroundError from 'rsg-components/PlaygroundError';
import Wrapper from 'rsg-components/Wrapper';

const compileCode = code => transform(code, {
	objectAssign: 'Object.assign',
}).code;

export default class Preview extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
	};
	state = {
		error: null,
	};

	componentDidMount() {
		this.executeCode();
	}

	componentDidUpdate(prevProps) {
		if (this.props.code !== prevProps.code) {
			this.executeCode();
		}
	}

	executeCode() {
		ReactDOM.unmountComponentAtNode(this.mountNode);

		this.setState({
			error: null,
		});

		const { code } = this.props;
		if (!code) {
			return;
		}

		try {
			const compiledCode = compileCode(this.props.code);

			// 1. Use setter/with to call our callback function when user write `initialState = {...}`
			// 2. Wrap code in JSON.stringify/eval to catch the component and return it
			const exampleComponentCode = `
				var stateWrapper = {
					set initialState(value) {
						__setInitialState(value)
					},
				}
				with (stateWrapper) {
					return eval(${JSON.stringify(compiledCode)})
				}
			`;

			const exampleComponent = this.props.evalInContext(exampleComponentCode);

			// Wrap everything in a React component to leverage the state management of this component
			class PreviewComponent extends Component { // eslint-disable-line react/no-multi-comp
				constructor() {
					super();
					this.state = {};
					this.setState = this.setState.bind(this);
					this.setInitialState = this.setInitialState.bind(this);
				}

				// Synchronously set initial state, so it will be ready before first render
				// Ignore all consequent calls
				setInitialState(initialState) {
					Object.assign(this.state, initialState);
					this.setInitialState = noop;
				}

				render() {
					return exampleComponent(this.state, this.setState, this.setInitialState);
				}
			}

			const wrappedComponent = (
				<Wrapper>
					<PreviewComponent />
				</Wrapper>
			);

			ReactDOM.render(wrappedComponent, this.mountNode);
		}
		catch (err) {
			ReactDOM.unmountComponentAtNode(this.mountNode);
			this.setState({
				error: err.toString(),
			});
		}
	}

	render() {
		const { error } = this.state;
		return (
			<div>
				<div ref={ref => (this.mountNode = ref)}></div>
				{error && <PlaygroundError message={error} />}
			</div>
		);
	}
}
