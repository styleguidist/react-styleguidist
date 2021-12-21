import { PropDescriptor as BasePropDescriptor, PropTypeDescriptor } from 'react-docgen';
/**
 * Remove quotes around given string.
 */
export declare function unquote(string?: string): string | undefined;
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
export declare function getType(prop: PropDescriptor): PropTypeDescriptor | TypeDescriptor | undefined;
/**
 * Show starting and ending whitespace around given string.
 */
export declare function showSpaces(string?: string): string | undefined;
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
export declare type TypeDescriptor = TypeEnumDescriptor | TypeLiteralDescriptor | TypeSignatureDescriptor | TypeUnionDescriptor;
export {};
