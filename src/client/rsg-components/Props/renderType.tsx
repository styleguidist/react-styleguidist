import React from 'react';
import { PropTypeDescriptor } from 'react-docgen';
import Type from 'rsg-components/Type';
import ComplexType from 'rsg-components/ComplexType';

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

function renderAdvancedType(type: PropTypeDescriptor | TypeDescriptor): React.ReactNode {
	switch (type.name) {
		case 'enum':
			return <Type>{type.name}</Type>;
		case 'literal':
			return <Type>{type.value}</Type>;
		case 'signature':
			return <ComplexType name={type.type} raw={type.raw} />;
		case 'union':
		case 'tuple':
			return <ComplexType name={type.name} raw={type.raw} />;
		default:
			return <Type>{(type as any).raw || (type as any).name}</Type>;
	}
}

export default function renderTypeColumn(prop: PropDescriptor): React.ReactNode {
	const type = getType(prop);
	if (!type) {
		return null;
	}
	if (prop.flowType || prop.tsType) {
		return renderAdvancedType(type);
	}
	return <Type>{renderType(type)}</Type>;
}
