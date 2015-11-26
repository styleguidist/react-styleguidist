import { Component, PropTypes } from 'react';
import trim from 'lodash/string/trim';
import Markdown from 'rsg-components/Markdown';

import s from './Props.css';
import sMarkdown from '../Markdown/Markdown.css';

export let Code = ({ children }) => {
	return <code className={sMarkdown.code}>{children}</code>;
};

export function unquote(string) {
	return trim(string, '"\'');
}

export default class Props extends Component {
	static propTypes = {
		props: PropTypes.object.isRequired
	}

	renderRows(props) {
		let rows = [];
		for (let name in props) {
			let prop = props[name];
			rows.push(
				<tr key={name}>
					<td className={s.cell}><Code>{name}</Code></td>
					<td className={s.cell}><Code>{this.renderType(prop.type)}</Code></td>
					<td className={s.cell}>{this.renderDefault(prop)}</td>
					<td className={s.cell + ' ' + s.cellDesc}>{this.renderDescription(prop)}</td>
				</tr>
			);
		}
		return rows;
	}

	renderType(type) {
		let { name } = type;
		switch (name) {
			case 'arrayOf':
				return `${type.value.name}[]`;
			case 'instanceOf':
				return type.value;
		}
		return name;
	}

	renderDefault(prop) {
		if (prop.required) {
			return '';
		}
		else if (prop.defaultValue) {
			return (
				<Code>{unquote(prop.defaultValue.value)}</Code>
			);
		}
		else {
			return (
				<span className={s.optional}>Optional</span>
			);
		}
	}

	renderDescription(prop) {
		let { description } = prop;
		let extra = this.renderExtra(prop);
		return (
			<div>
				{description && <Markdown className={s.inline} text={description}/>}
				{description && extra && ' '}
				{extra}
			</div>
		);
	}

	renderExtra(prop) {
		switch (prop.type.name) {
			case 'enum':
				return this.renderEnum(prop);
			case 'union':
				return this.renderUnion(prop);
			case 'shape':
				return this.renderShape(prop);
		}
		return null;
	}

	renderEnum(prop) {
		if (!Array.isArray(prop.type.value)) {
			return <span>{prop.type.value}</span>;
		}
		let values = prop.type.value.map(({ value }) => (
			<li className={s.listItem} key={value}>
				<Code>{unquote(value)}</Code>
			</li>
		));
		return (
			<span>One of: <ul className={s.list}>{values}</ul></span>
		);
	}

	renderUnion(prop) {
		if (!Array.isArray(prop.type.value)) {
			return <span>{prop.type.value}</span>;
		}
		let values = prop.type.value.map((value) => (
			<li className={s.listItem} key={value.name}>
				<Code>{this.renderType(value)}</Code>
			</li>
		));

		return (
			<span>One of type: <ul className={s.list}>{values}</ul></span>
		);
	}

	renderShape(shape) {
		let props = shape.type.value;
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
					{description && <Markdown className={s.inline} text={description}/>}
				</div>
			);
		}
		return rows;
	}

	renderTable(props) {
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
					{this.renderRows(props)}
				</tbody>
			</table>
		);
	}

	render() {
		return (
			<div className={s.root}>
				<h3 className={s.heading}>Props</h3>
				{this.renderTable(this.props.props.props)}
			</div>
		);
	}
}
