import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ space, color, fontFamily, fontSize, buttonTextTransform }: Rsg.Theme) => {
    button: {
        padding: number[][];
        fontFamily: string[];
        fontSize: number;
        color: string;
        background: string;
        textTransform: string;
        transition: string;
        border: string;
        cursor: string;
        '&:hover, &:focus': {
            isolate: boolean;
            outline: number;
            color: string;
            transition: string;
        };
        '&:focus:not($isActive)': {
            isolate: boolean;
            outline: (string | number)[][];
        };
        '& + &': {
            isolate: boolean;
            marginLeft: number;
        };
    };
    isActive: {
        borderBottom: (string | number)[][];
    };
};
interface TabButtonProps extends JssInjectedProps {
    className?: string;
    name: string;
    onClick: (e: React.MouseEvent) => void;
    active?: boolean;
    children: React.ReactNode;
}
export declare const TabButtonRenderer: React.FunctionComponent<TabButtonProps>;
declare const _default: React.ComponentType<Pick<TabButtonProps, "active" | "children" | "name" | "className" | "onClick">>;
export default _default;
