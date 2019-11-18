import { PropDescriptor, PropTypeDescriptor } from 'react-docgen';

/**
 * Remove quotes around given string.
 */
export function unquote(string?: string): string | undefined {
	return string && string.replace(/^['"]|['"]$/g, '');
}

export interface PropDescriptorWithFlow extends PropDescriptor {
	flowType?: FlowTypeDescriptor;
}

/**
 * Return prop type object.
 *
 * @param {object} prop
 * @returns {object}
 */
export function getType(
	prop: PropDescriptorWithFlow
): PropTypeDescriptor | FlowTypeDescriptor | undefined {
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
	return prop.type;
}

/**
 * Show starting and ending whitespace around given string.
 */
export function showSpaces(string?: string): string | undefined {
	return string && string.replace(/^\s|\s$/g, '␣');
}

export interface FlowTypeEnumDescriptor {
	name: 'enum';
	type: string;
	value: FlowTypeDescriptor[];
}

interface FlowTypeLiteralDescriptor {
	name: 'literal';
	type: string;
	value: string;
}

interface FlowTypeSignatureDescriptor {
	name: 'signature';
	type: string;
	raw: string;
	value: string;
}

interface FlowTypeUnionDescriptor {
	name: 'union' | 'tuple';
	elements: FlowTypeDescriptor[];
	type: string;
	raw: string;
	value?: string;
}

export type FlowTypeDescriptor =
	| FlowTypeEnumDescriptor
	| FlowTypeLiteralDescriptor
	| FlowTypeSignatureDescriptor
	| FlowTypeUnionDescriptor;
