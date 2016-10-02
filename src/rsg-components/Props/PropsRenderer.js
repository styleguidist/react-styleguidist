import React, { Component, PropTypes } from 'react';
import Code from 'rsg-components/Code';
import Markdown from 'rsg-components/Markdown';
import { unquote, getType } from './util';

import s from './Props.css';

export default class PropsRenderer extends Component {
	static propTypes = {
		props: PropTypes.object.isRequired,
	};

	renderRows(props) {
		let rows = [];
		for (let name in props) {
			let prop = props[name];
			rows.push(
				<tr key={name}>
					<td className={s.cell}><Code className={s.name}>{name}</Code></td>
					<td className={s.cell}><Code className={s.type}>{this.renderType(getType(prop))}</Code></td>
					<td className={s.cell}>{this.renderDefault(prop)}</td>
					<td className={s.cell + ' ' + s.cellDesc}>{this.renderDescription(prop)}</td>
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
				<span className={s.required}>Required</span>
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
			<li className={s.listItem} key={value}>
				<Code>{unquote(value)}</Code>
			</li>
		));
		return (
			<span>One of: <ul className={s.list}>{values}</ul></span>
		);
	}

	renderUnion(prop) {
		if (!Array.isArray(getType(prop).value)) {
			return <span>{getType(prop).value}</span>;
		}
		let values = getType(prop).value.map((value, index) => (
			<li className={s.listItem} key={value.name + index}>
				<Code className={s.type}>{this.renderType(value)}</Code>
			</li>
		));

		return (
			<span>One of type: <ul className={s.list}>{values}</ul></span>
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
					<Code className={s.name}>{name}</Code>{': '}
					<Code className={s.type}>{this.renderType(prop)}</Code>
					{defaultValue && ' — '}{defaultValue}
					{description && ' — '}
					{description && <Markdown text={description} inline />}
				</div>
			);
		}
		return rows;
	}

	render() {
		return (
			<table className={s.table}>
				<thead className={s.tableHead}>
					<tr>
						<th className={s.cellHeading}>Name</th>
						<th className={s.cellHeading}>Type</th>
						<th className={s.cellHeading}>Default</th>
						<th className={s.cellHeading + ' ' + s.cellDesc}>Description</th>
					</tr>
				</thead>
				<tbody className={s.tableBody}>
					{this.renderRows(this.props.props.props)}
				</tbody>
			</table>
		);
	}
}
