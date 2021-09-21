import React from 'react';
import renderTypeColumn from './renderType';
import { PropDescriptor } from './util';
export declare function getRowKey(row: {
    name: string;
}): string;
export declare const columns: {
    caption: string;
    render: typeof renderTypeColumn;
}[];
interface PropsProps {
    props: PropDescriptor[];
}
declare const PropsRenderer: React.FunctionComponent<PropsProps>;
export default PropsRenderer;
