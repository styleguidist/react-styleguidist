import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
interface TableProps extends JssInjectedProps {
    children: React.ReactNode;
}
export declare const TableRenderer: React.FunctionComponent<TableProps>;
declare const _default: React.ComponentType<Pick<TableProps, "children">>;
export default _default;
