import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { transform } from 'buble';
import PlaygroundError from 'rsg-components/PlaygroundError';
import Wrapper from 'rsg-components/Wrapper';

/* eslint-disable no-invalid-this, react/no-multi-comp */

const compileCode = (code, config) => transform(code, config).code;

// Wrap everything in a React component to leverage the state management of this component
class PreviewComponent extends Component {
	static propTypes = {
		component: PropTypes.func.isRequired,
		initialState: PropTypes.object.isRequired,
	};

	state = this.props.initialState;
	setStateBinded = this.setState.bind(this);

	render() {
		return this.props.component(this.state, this.setStateBinded);
	}
}

export default class Preview extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
	};
	static contextTypes = {
		config: PropTypes.object.isRequired,
		codeRevision: PropTypes.number.isRequired,
	};
	state = {
		error: null,
	};

	componentDidMount() {
		// Clear console after hot reload, do not clear on the first load to keep any warnings
		if (this.context.codeRevision > 0) {
			// eslint-disable-next-line no-console
			console.clear();
		}

		this.executeCode();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.error !== nextState.error || this.props.code !== nextProps.code;
	}

	componentDidUpdate(prevProps) {
		if (this.props.code !== prevProps.code) {
			this.executeCode();
		}
	}

	componentWillUnmount() {
		this.unmountPreview();
	}

	getExampleInitialState(compiledCode) {
		// Strip JSX: this is a bit hacky
		const code = compiledCode.replace(/React\.createElement\([\S\s]*$/m, '');

		// Eval the rest of the code to extract the value of the initial state
		return this.props.evalInContext(`
			var state = {};
			var initialState = {};
			try {
				${code};
			} catch (err) {}
			return initialState;
		`)();
	}

	// Wrap code in JSON.stringify/eval to catch the component and return it
	evalInContext(compiledCode) {
		return this.props.evalInContext(`
			var initialState = {};
			return eval(${JSON.stringify(compiledCode)});
		`);
	}

	unmountPreview() {
		if (this.mountNode) {
			ReactDOM.unmountComponentAtNode(this.mountNode);
		}
	}

	executeCode() {
		this.setState({
			error: null,
		});

		const { code } = this.props;
		if (!code) {
			return;
		}

		const compiledCode = this.compileCode(code);
		if (!compiledCode) {
			return;
		}

		const initialState = this.getExampleInitialState(compiledCode);
		const exampleComponent = this.evalInContext(compiledCode);
		const wrappedComponent = (
			<Wrapper onError={this.handleError}>
				<PreviewComponent component={exampleComponent} initialState={initialState} />
			</Wrapper>
		);

		window.requestAnimationFrame(() => {
			this.unmountPreview();
			try {
				ReactDOM.render(wrappedComponent, this.mountNode);
			} catch (err) {
				this.handleError(err);
			}
		});
	}

	compileCode(code) {
		try {
			return compileCode(code, this.context.config.compilerConfig);
		} catch (err) {
			this.handleError(err);
		}
		return false;
	}

	handleError = err => {
		this.unmountPreview();

		this.setState({
			error: err.toString(),
		});

		console.error(err); // eslint-disable-line no-console
	};

	render() {
		const { error } = this.state;
		return (
			<div>
				<div ref={ref => (this.mountNode = ref)} />
				{error && <PlaygroundError message={error} />}
			</div>
		);
	}
}
