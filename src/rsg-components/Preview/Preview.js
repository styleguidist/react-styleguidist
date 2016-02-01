// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {transform} from 'babel-standalone';
import Wrapper from 'rsg-components/Wrapper';

import s from './Preview.css';

// TODO: instead, simply return an amended object: map default back to type
const getComponent = (component) => {
  //console.log(component)

  if(Array.isArray(component.props.children) && component.props.children.length) {
    //component.props.children = component.props.children.map(getComponent
    return <p>lol</p>
  }

  if(component.type.__esModule) {
    return React.createElement(component.type.default, component.props);
  }

  return component;
}

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

    console.log('component.type.default:', component.type.default)

    let wrappedComponent = (
      <Wrapper>
        {getComponent(component)}
      </Wrapper>
    );

		try {
			ReactDOM.render(wrappedComponent, mountNode);
		}
		catch (err) {
      //console.log(err)
      //console.log('code:', code)
      //console.log('compiledCode:', compiledCode)
      //console.log('component:', component)
      //console.log('wrappedComponent:', wrappedComponent)

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
