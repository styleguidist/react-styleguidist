import React, { Component, PropTypes } from 'react';
import trim from 'lodash/trim';
import Markdown from 'rsg-components/Markdown';

import s from './Props.css';

/* eslint-disable react/prop-types */

export let Code = ({ className = '', children }) => {
	return <code>{children}</code>;
};

export function unquote(string) {
	return trim(string, '"\'');
}

export default class Props extends Component {
	static propTypes = {
		props: PropTypes.object.isRequired,
	};

	renderRows(props) {
		let rows = [];
		for (let name in props) {
			let prop = props[name];
			rows.push(
				<tr className="rsg-code-props-table-row" key={name}>
					<td><Code>{name}</Code></td>
					<td><Code>{this.renderType(getType(prop))}</Code></td>
					<td>{this.renderDefault(prop)}</td>
					<td>{this.renderDescription(prop)}</td>
				</tr>
			);
		}
		return rows;
	}

	renderType(type) {
		if (!type) {
			return 'unknown';
		}

		let { name } = type;

		switch (name) {
			case 'arrayOf':
				return `${type.value.name}[]`;
			case 'instanceOf':
				return type.value;
			default:
				return name;
		}
	}

	renderDefault(prop) {
		if (prop.required) {
			return (
				<span>Required</span>
			);
		}
		else if (prop.defaultValue) {
			return (
				<Code>{unquote(prop.defaultValue.value)}</Code>
			);
		}
		return '';
	}

	renderDescription(prop) {
		let { description } = prop;
		let extra = this.renderExtra(prop);
		return (
			<div>
				{description && <Markdown text={description} inline />}
				{description && extra && ' '}
				{extra}
			</div>
		);
	}

	renderExtra(prop) {
		const type = getType(prop);

		if (!type) {
			return null;
		}

		switch (type.name) {
			case 'enum':
				return this.renderEnum(prop);
			case 'union':
				return this.renderUnion(prop);
			case 'shape':
				return this.renderShape(prop.type.value);
			case 'arrayOf':
				if (type.value.name === 'shape') {
					return this.renderShape(prop.type.value.value);
				}
				return null;
			default:
				return null;
		}
	}

	renderEnum(prop) {
		if (!Array.isArray(getType(prop).value)) {
			return <span>{getType(prop).value}</span>;
		}
		let values = getType(prop).value.map(({ value }) => (
			<li key={value}>
				<Code>{unquote(value)}</Code>
			</li>
		));
		return (
			<span>One of: <ul>{values}</ul></span>
		);
	}

	renderUnion(prop) {
		if (!Array.isArray(getType(prop).value)) {
			return <span>{getType(prop).value}</span>;
		}
		let values = getType(prop).value.map((value, index) => (
			<li key={value.name + index}>
				<Code>{this.renderType(value)}</Code>
			</li>
		));

		return (
			<span>One of type: <ul>{values}</ul></span>
		);
	}

	renderShape(props) {
		let rows = [];
		for (let name in props) {
			let prop = props[name];
			let defaultValue = this.renderDefault(prop);
			let description = prop.description;
			rows.push(
				<div key={name}>
					<Code>{name}</Code>{': '}
					<Code>{this.renderType(prop)}</Code>
					{defaultValue && ' — '}{defaultValue}
					{description && ' — '}
					{description && <Markdown text={description} inline />}
				</div>
			);
		}
		return rows;
	}

	renderTable(props) {
		return (
			<table>
				<thead>
					<tr class="rsg-code-props-table-heading-row">
						<th>Name</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{this.renderRows(props)}
				</tbody>
			</table>
		);
	}

	render() {
		return (
			<div className="rsg-props">
				<h3>Props</h3>
				{this.renderTable(this.props.props.props)}
			</div>
		);
	}
}

function getType(prop) {
	return prop.flowType || prop.type;
}
