import React from 'react';
import { PropTypeDescriptor } from 'react-docgen';
import Type from 'rsg-components/Type';
import Text from 'rsg-components/Text';

import { getType, PropDescriptor, TypeDescriptor } from './util';

interface ExtendedPropTypeDescriptor extends Omit<PropTypeDescriptor, 'name'> {
	name: string;
}

export function renderType(type: ExtendedPropTypeDescriptor): string {
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

function renderComplexType(name: string, title: string): React.ReactNode {
	return (
		<Text size="small" underlined title={title}>
			{name}
		</Text>
	);
}

function renderAdvancedType(type: TypeDescriptor): React.ReactNode {
	if (!type) {
		return 'unknown';
	}

	switch (type.name) {
		case 'enum':
			return type.name;
		case 'literal':
			return type.value;
		case 'signature':
			return renderComplexType(type.type, type.raw);
		case 'union':
		case 'tuple':
			return renderComplexType(type.name, type.raw);
		default:
			return (type as any).raw || (type as any).name;
	}
}

export default function renderTypeColumn(prop: PropDescriptor): React.ReactNode {
	const type = getType(prop);
	if (!type) {
		return null;
	}
	if (prop.flowType || prop.tsType) {
		return <Type>{renderAdvancedType(type as any)}</Type>;
	}
	return <Type>{renderType(type)}</Type>;
}
