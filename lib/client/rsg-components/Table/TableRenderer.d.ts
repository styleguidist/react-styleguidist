import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ space, color, fontFamily, fontSize }: Rsg.Theme) => {
    table: {
        width: string;
        borderCollapse: string;
        marginBottom: number;
    };
    tableHead: {
        borderBottom: (string | number)[][];
    };
    cellHeading: {
        color: string;
        paddingRight: number;
        paddingBottom: number;
        textAlign: string;
        fontFamily: string[];
        fontWeight: string;
        fontSize: number;
        whiteSpace: string;
    };
    cell: {
        color: string;
        paddingRight: number;
        paddingTop: number;
        paddingBottom: number;
        verticalAlign: string;
        fontFamily: string[];
        fontSize: number;
        '&:last-child': {
            isolate: boolean;
            width: string;
            paddingRight: number;
        };
        '& p:last-child': {
            isolate: boolean;
            marginBottom: number;
        };
    };
};
interface TableProps extends JssInjectedProps {
    columns: {
        caption: string;
        render(row: any): React.ReactNode;
    }[];
    rows: any[];
    getRowKey(row: any): string;
}
export declare const TableRenderer: React.FunctionComponent<TableProps>;
declare const _default: React.ComponentType<Pick<TableProps, "columns" | "rows" | "getRowKey">>;
export default _default;
