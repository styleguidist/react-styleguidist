import React, { PropTypes } from 'react';

export default React.createClass({
	displayName: 'Props',
	propTypes: {
		props: PropTypes.object.isRequired
	},

	renderRows() {
		let rows = [];
		let { props } = this.props.props;
		for (var name in props) {
			var prop = props[name];
			rows.push(
				<li key={name}>
					{this.renderName(name, prop)}
					{this.renderType(prop)}
					{this.renderDescription(prop)}
				</li>
			);
		}
		return rows;
	},

	renderName(name, prop) {
		if (prop.required) {
			return name;
		}
		else {
			return (
				<span>[{name}=<code>{prop.defaultValue.value}</code>]</span>
			);
		}
	},

	renderType(prop) {
		// TODO: enums
		return `: ${prop.type.name}`;
	},

	renderDescription(prop) {
		if (prop.description) {
			return ` — ${prop.description}`;
		}
		else {
			return '';
		}
	},

	render() {
		return (
			<ul>
				{this.renderRows()}
			</ul>
		);
	}
});
