import React, { Component } from 'react';

export default class CustomEndpoint extends Component {

	constructor(props) {
		super(props);

		this.state = { response: 'No Server Response' };
		this.handleInvokeEndpoint = this.handleInvokeEndpoint.bind(this);
	}

	handleInvokeEndpoint() {
		fetch('http://localhost:3000/custom', { method: 'GET' })
			.then(responseObj => responseObj.json())
			.then(({ response } = {}) => this.setState({ response, error: null }))
			.catch(() => this.setState({
				response: null,
				error: 'Ouch, something went wrong!',
			}));
	}

	render() {
		return (
			<div>
				<div>{this.state.response}</div>
				{this.state.error ? <div>{this.state.error}</div> : null}
				<button onClick={this.handleInvokeEndpoint}>Invoke server</button>
			</div>
		);
	}
}
