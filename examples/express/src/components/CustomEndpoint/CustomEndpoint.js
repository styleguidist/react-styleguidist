import React, { Component } from 'react';

/* eslint-disable compat/compat */

export default class CustomEndpoint extends Component {
	state = { response: 'No Server Response' };

	handleInvokeEndpoint = () => {
		fetch('http://localhost:6060/custom', { method: 'GET' })
			.then((responseObj) => responseObj.json())
			.then(({ response } = {}) => this.setState({ response, error: null }))
			.catch(() =>
				this.setState({
					response: null,
					error: 'Ouch, something went wrong!',
				})
			);
	};

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
