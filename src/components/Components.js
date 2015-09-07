import React, { PropTypes } from 'react';
import Component from './Component';

export default React.createClass({
	displayName: 'Components',
	propTypes: {
		components: PropTypes.array.isRequired
	},

	renderComponents() {
		return this.props.components.map((component) => {
			return (
				<Component component={component} key={component.name}/>
			)
		});
	},

	render() {
		return (
			<div>
				{this.renderComponents()}
			</div>
		);
	}
});
