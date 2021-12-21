import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
interface TableHeadProps extends JssInjectedProps {
    children: React.ReactNode;
}
export declare const TableHeadRenderer: React.FunctionComponent<TableHeadProps>;
declare const _default: React.ComponentType<Pick<TableHeadProps, "children">>;
export default _default;
