import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/debounce';
import isFinite from 'lodash/isFinite';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';

export default class Playground extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	};
	static contextTypes = {
		config: PropTypes.object.isRequired,
		singleExample: PropTypes.bool,
	};

	constructor(props, context) {
		super(props, context);
		const { code } = props;
		const { previewDelay, showCode } = context.config;

		// `previewDelay` may not be defined or have an invalid value, by defayult is disabled.
		this.previewDelay = isFinite(previewDelay) && previewDelay > 0 ? previewDelay : 0;

		this.state = {
			code,
			showCode,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { code } = nextProps;
		this.setState({
			code,
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextState.code !== this.state.code ||
			nextState.showCode !== this.state.showCode
		);
	}

	componentWillUnmount() {
		// clear pending changes before unmount
		if (this.queuedChange) {
			this.queuedChange.cancel();
		}
	}

	handleChange(code) {
		// clear pending changes before proceed
		if (this.queuedChange) {
			this.queuedChange.cancel();
		}

		// stored update action
		const queuedChange = () => this.setState({
			code,
		});

		if (this.previewDelay) {
			// if previewDelay is enabled debounce the code
			this.queuedChange = debounce(queuedChange, 1000);
			this.queuedChange();
		}
		else {
			// otherwise execute it
			queuedChange();
		}
	}

	handleCodeToggle() {
		this.setState({
			showCode: !this.state.showCode,
		});
	}

	render() {
		const { code, showCode } = this.state;
		const { evalInContext, index, name } = this.props;
		const { singleExample } = this.context;
		return (
			<PlaygroundRenderer
				code={code}
				showCode={showCode}
				index={index}
				name={name}
				singleExample={singleExample}
				evalInContext={evalInContext}
				onChange={code => this.handleChange(code)}
				onCodeToggle={() => this.handleCodeToggle()}
			/>
		);
	}
}
