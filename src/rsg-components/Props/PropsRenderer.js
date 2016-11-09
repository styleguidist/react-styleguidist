import React, { PropTypes } from 'react';
import Code from 'rsg-components/Code';
import Markdown from 'rsg-components/Markdown';
import { unquote, getType } from './util';

import s from './Props.css';

function renderRows(props) {
	let rows = [];
	for (let name in props) {
		let prop = props[name];
		rows.push(
			<tr className="rsg-code-props-table-row" key={name}>
				<td><Code>{name}</Code></td>
				<td><Code>{renderType(getType(prop))}</Code></td>
				<td>{renderDefault(prop)}</td>
				<td>{renderDescription(prop)}</td>
			</tr>
		);
	}
	return rows;
}

function renderType(type) {
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

function renderDefault(prop) {
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

function renderDescription(prop) {
	let { description } = prop;
	let extra = renderExtra(prop);
	return (
		<div>
			{description && <Markdown text={description} inline />}
			{description && extra && ' '}
			{extra}
		</div>
	);
}

function renderExtra(prop) {
	const type = getType(prop);

	if (!type) {
		return null;
	}

	switch (type.name) {
		case 'enum':
			return renderEnum(prop);
		case 'union':
			return renderUnion(prop);
		case 'shape':
			return renderShape(prop.type.value);
		case 'arrayOf':
			if (type.value.name === 'shape') {
				return renderShape(prop.type.value.value);
			}
			return null;
		default:
			return null;
	}
}

function renderEnum(prop) {
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

function renderUnion(prop) {
	if (!Array.isArray(getType(prop).value)) {
		return <span>{getType(prop).value}</span>;
	}
	let values = getType(prop).value.map((value, index) => (
		<li key={value.name + index}>
			<Code>{renderType(value)}</Code>
		</li>
	));

	return (
		<span>One of type: <ul>{values}</ul></span>
	);
}

function renderShape(props) {
	let rows = [];
	for (let name in props) {
		let prop = props[name];
		let defaultValue = renderDefault(prop);
		let description = prop.description;
		rows.push(
			<div key={name}>
				<Code>{name}</Code>{': '}
				<Code>{renderType(prop)}</Code>
				{defaultValue && ' — '}{defaultValue}
				{description && ' — '}
				{description && <Markdown text={description} inline />}
			</div>
		);
	}
	return rows;
}

export default function PropsRenderer({ props }) {
	return (
		<table className={s.root}>
			<thead>
				<tr className="rsg-code-props-table-heading-row">
					<th>Name</th>
					<th>Type</th>
					<th>Default</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{renderRows(props)}
			</tbody>
		</table>
	);
}

PropsRenderer.propTypes = {
	props: PropTypes.object.isRequired,
};
