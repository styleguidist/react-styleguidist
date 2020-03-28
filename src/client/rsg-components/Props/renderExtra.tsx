import React from 'react';
import Group from 'react-group';
import Type from 'rsg-components/Type';
import Code from 'rsg-components/Code';
import Name from 'rsg-components/Name';
import Markdown from 'rsg-components/Markdown';
import { PropTypeDescriptor } from 'react-docgen';

import { unquote, getType, showSpaces, PropDescriptor, TypeDescriptor } from './util';
import renderDefault from './renderDefault';
import { renderType } from './renderType';

function renderEnum(type: PropTypeDescriptor | TypeDescriptor): React.ReactNode {
	if (!Array.isArray(type.value)) {
		return <span>{type.value}</span>;
	}

	const values = type.value.map(({ value }) => (
		<Code key={value}>{showSpaces(unquote(value))}</Code>
	));
	return (
		<span>
			One of: <Group separator=", ">{values}</Group>
		</span>
	);
}

function renderUnion(type: PropTypeDescriptor | TypeDescriptor): React.ReactNode {
	if (!Array.isArray(type.value)) {
		return <span>{type.value}</span>;
	}

	const values = type.value.map((value, index) => (
		<Type key={`${value.name}-${index}`}>{renderType(value)}</Type>
	));
	return (
		<span>
			One of type: <Group separator=", ">{values}</Group>
		</span>
	);
}

function renderShape(props: Record<string, PropDescriptor>) {
	return Object.keys(props).map(name => {
		const prop = props[name];
		const defaultValue = renderDefault(prop);
		const description = prop.description;
		return (
			<div key={name}>
				<Name>{name}</Name>
				{': '}
				<Type>{renderType(prop)}</Type>
				{defaultValue && ' — '}
				{defaultValue}
				{description && ' — '}
				{description && <Markdown text={description} inline />}
			</div>
		);
	});
}

export default function renderExtra(prop: PropDescriptor): React.ReactNode {
	const type = getType(prop);
	if (!type) {
		return null;
	}
	switch (type.name) {
		case 'enum':
			return renderEnum(type);
		case 'union':
			return renderUnion(type);
		case 'shape':
			return prop.type && renderShape(prop.type.value);
		case 'arrayOf':
			if (type.value.name === 'shape') {
				return prop.type && renderShape(prop.type.value.value);
			}
			return null;
		case 'objectOf':
			if (type.value.name === 'shape') {
				return prop.type && renderShape(prop.type.value.value);
			}
			return null;
		default:
			return null;
	}
}
