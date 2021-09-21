import React from 'react';
import { PropTypeDescriptor } from 'react-docgen';
import { PropDescriptor } from './util';
interface ExtendedPropTypeDescriptor extends Omit<PropTypeDescriptor, 'name'> {
    name: string;
}
export declare function renderType(type: ExtendedPropTypeDescriptor): string;
export default function renderTypeColumn(prop: PropDescriptor): React.ReactNode;
export {};
