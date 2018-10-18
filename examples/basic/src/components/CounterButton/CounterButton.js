import React, { Component } from 'react';

/**
 * Button that counts how many times it was pressed and exposes a `@public` method to reset itself.
 */
export default class CounterButton extends Component {
	constructor() {
		super();
		this.state = {
			value: 0,
		};
	}

	/**
	 * Sets the counter to a particular value.
	 *
	 * @public
	 * @version 1.0.5
	 * @param {Number} [newValue=0] New value for the counter
	 * @returns {string} Test
	 */
	set(newValue = 0) {
		this.setState({
			value: parseInt(newValue, 10),
		});
	}

	/**
	 * Increments the counter. This method is not marked @public and is not visible in the styleguide.
	 */
	increment() {
		this.setState({
			value: this.state.value + 1,
		});
	}

	render() {
		return (
			<button className="button" onClick={this.increment.bind(this)}>
				{this.state.value}
			</button>
		);
	}
}
