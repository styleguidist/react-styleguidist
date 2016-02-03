// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {transform} from 'babel-standalone';
import {merge} from 'lodash';
import Wrapper from 'rsg-components/Wrapper';

import s from './Preview.css';

const modifyProps = (props) => {
	if (Array.isArray(props.children) && props.children.length) {
		props = merge({}, props, {children: props.children.map(getComponentTypes)});
	}

	return props;
};

const getComponentTypes = (component, key = 0) => {
	// Determine whether this is a mismatch between ES6 and CommonJS export structures
	// (Babel 5 used to lack the differentiation)
	// Context: http://www.2ality.com/2014/09/es6-modules-final.html
	const type = component.type.__esModule ? component.type.default : component.type;

	return React.createElement(type, modifyProps(merge({key}, component.props)));
};

class Preview extends Component {
	constructor() {
		super();
		this.state = {
			error: null
		};
		this.componentState = {};
	}

	componentDidMount() {
		this.executeCode();
	}

	componentDidUpdate(prevProps) {
		if (this.props.code !== prevProps.code) {
			this.executeCode();
		}
	}

	setComponentState(newState) {
		this.componentState = {...this.componentState, ...newState};
		setTimeout(this.executeCode.bind(this), 0);
	}

	compileCode(code) {
		return transform(code, {
			presets: ['es2015', 'react', 'stage-0'],
			ignore: [/node_modules/]
		}).code;
	}

	executeCode() {
		let mountNode = this.refs.mount;

		ReactDOM.unmountComponentAtNode(mountNode);

		this.setState({
			error: null
		});

		let { code } = this.props;
		if (!code) {
			return;
		}

		code = `
      const state = Object.freeze(${JSON.stringify(this.componentState)});
      ${code}
    `;

		let compiledCode = this.compileCode(code);
		let component = this.props.evalInContext(compiledCode, this.setComponentState.bind(this));
		let parsedComponent = getComponentTypes(component);

		let wrappedComponent = (
			<Wrapper>
				{parsedComponent}
			</Wrapper>
		);

		try {
			ReactDOM.render(wrappedComponent, mountNode);
		}
		catch (err) {
			ReactDOM.unmountComponentAtNode(mountNode);
			this.setState({
				error: err.toString()
			});
		}
	}

	renderError() {
		let { error } = this.state;
		if (error) {
			return (
				<pre className={s.playgroundError}>{error}</pre>
			);
		}
		else {
			return null;
		}
	}

	render() {
		return (
			<div>
				<div ref="mount"></div>
				{this.renderError()}
			</div>
		);
	}
}

Preview.propTypes = {
	code: PropTypes.string.isRequired,
	evalInContext: PropTypes.func.isRequired
};

export default Preview;
