import React from 'react';
import PropTypes from 'prop-types';
import Group from 'react-group';
import Arguments from 'rsg-components/Arguments';
import Code from 'rsg-components/Code';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Type from 'rsg-components/Type';
import Text from 'rsg-components/Text';
import Para from 'rsg-components/Para';
import Table from 'rsg-components/Table';
import map from 'lodash/map';
import { unquote, getType, showSpaces } from './util';

function renderType(type) {
	if (!type) {
		return 'unknown';
	}

	const { name } = type;

	switch (name) {
		case 'arrayOf':
			return `${type.value.name}[]`;
		case 'objectOf':
			return `{${renderType(type.value)}}`;
		case 'instanceOf':
			return type.value;
		default:
			return name;
	}
}

function renderEnum(prop) {
	if (!Array.isArray(getType(prop).value)) {
		return (
			<span>
				{getType(prop).value}
			</span>
		);
	}

	const values = getType(prop).value.map(({ value }) =>
		<Code key={value}>
			{showSpaces(unquote(value))}
		</Code>
	);
	return (
		<span>
			One of:{' '}
			<Group separator=", " inline>
				{values}
			</Group>
		</span>
	);
}

function renderShape(props) {
	const rows = [];
	for (const name in props) {
		const prop = props[name];
		const defaultValue = renderDefault(prop);
		const description = prop.description;
		rows.push(
			<div key={name}>
				<Name>
					{name}
				</Name>
				{': '}
				<Type>
					{renderType(prop)}
				</Type>
				{defaultValue && ' — '}
				{defaultValue}
				{description && ' — '}
				{description && <Markdown text={description} inline />}
			</div>
		);
	}
	return rows;
}

function renderDefault(prop) {
	if (prop.required) {
		return <Text>Required</Text>;
	} else if (prop.defaultValue) {
		if (prop.type && prop.type.name === 'func') {
			return (
				<Text underlined title={showSpaces(unquote(prop.defaultValue.value))}>
					Function
				</Text>
			);
		}

		return (
			<Code>
				{showSpaces(unquote(prop.defaultValue.value))}
			</Code>
		);
	}
	return '';
}

function renderDescription(prop) {
	const { description, tags = {} } = prop;
	const extra = renderExtra(prop);
	const args = [...(tags.arg || []), ...(tags.argument || []), ...(tags.param || [])];
	return (
		<div>
			{description && <Markdown text={description} />}
			{extra &&
				<Para>
					{extra}
				</Para>}
			<JsDoc {...tags} />
			{args.length > 0 && <Arguments args={args} heading />}
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
		case 'objectOf':
			if (type.value.name === 'shape') {
				return renderShape(prop.type.value.value);
			}
			return null;
		default:
			return null;
	}
}

function renderUnion(prop) {
	if (!Array.isArray(getType(prop).value)) {
		return (
			<span>
				{getType(prop).value}
			</span>
		);
	}

	const values = getType(prop).value.map((value, index) =>
		<Type key={`${value.name}-${index}`}>
			{renderType(value)}
		</Type>
	);
	return (
		<span>
			One of type:{' '}
			<Group separator=", " inline>
				{values}
			</Group>
		</span>
	);
}

function renderName(prop) {
	const { name, tags = {} } = prop;
	return (
		<Name deprecated={!!tags.deprecated}>
			{name}
		</Name>
	);
}

function renderTypeColumn(prop) {
	return (
		<Type>
			{renderType(getType(prop))}
		</Type>
	);
}

export function getRowKey(row) {
	return row.name;
}

export function propsToArray(props) {
	return map(props, (prop, name) => ({ ...prop, name }));
}

export const columns = [
	{
		caption: 'Prop name',
		render: renderName,
	},
	{
		caption: 'Type',
		render: renderTypeColumn,
	},
	{
		caption: 'Default',
		render: renderDefault,
	},
	{
		caption: 'Description',
		render: renderDescription,
	},
];

export default function PropsRenderer({ props }) {
	return <Table columns={columns} rows={propsToArray(props)} getRowKey={getRowKey} />;
}

PropsRenderer.propTypes = {
	props: PropTypes.object.isRequired,
};
