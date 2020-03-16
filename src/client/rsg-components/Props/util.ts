import { PropDescriptor as BasePropDescriptor, PropTypeDescriptor } from 'react-docgen';

/**
 * Remove quotes around given string.
 */
export function unquote(string?: string): string | undefined {
	return string && string.replace(/^['"]|['"]$/g, '');
}

export interface PropDescriptor extends BasePropDescriptor {
	flowType?: TypeDescriptor;
	tsType?: TypeDescriptor;
}

/**
 * Return prop type object.
 *
 * @param {object} prop
 * @returns {object}
 */
export function getType(prop: PropDescriptor): PropTypeDescriptor | TypeDescriptor | undefined {
	if (prop.flowType) {
		if (
			prop.flowType.name === 'union' &&
			prop.flowType.elements.every((elem: { name: string }) => elem.name === 'literal')
		) {
			return {
				...prop.flowType,
				name: 'enum',
				value: prop.flowType.elements,
			};
		}
		return prop.flowType;
	}
	if (prop.tsType) {
		return prop.tsType;
	}
	return prop.type;
}

/**
 * Show starting and ending whitespace around given string.
 */
export function showSpaces(string?: string): string | undefined {
	return string && string.replace(/^\s|\s$/g, '␣');
}

export interface TypeEnumDescriptor {
	name: 'enum';
	type: string;
	value: TypeDescriptor[];
}

interface TypeLiteralDescriptor {
	name: 'literal';
	type: string;
	value: string;
}

interface TypeSignatureDescriptor {
	name: 'signature';
	type: string;
	raw: string;
	value: string;
}

interface TypeUnionDescriptor {
	name: 'union' | 'tuple';
	elements: TypeDescriptor[];
	type: string;
	raw: string;
	value?: string;
}

export type TypeDescriptor =
	| TypeEnumDescriptor
	| TypeLiteralDescriptor
	| TypeSignatureDescriptor
	| TypeUnionDescriptor;
