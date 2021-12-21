import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ space, color }: Rsg.Theme) => {
    button: {
        padding: number;
        color: string;
        background: string;
        transition: string;
        cursor: string;
        '&:hover, &:focus': {
            isolate: boolean;
            color: string;
            transition: string;
        };
        '&:focus': {
            isolate: boolean;
            outline: (string | number)[][];
        };
        '& + &': {
            isolate: boolean;
            marginLeft: number;
        };
        '& svg': {
            width: number;
            height: number;
            color: string;
            cursor: string;
        };
    };
    isSmall: {
        '& svg': {
            width: number;
            height: number;
        };
    };
};
interface ToolbarButtonProps extends JssInjectedProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    title?: string;
    small?: boolean;
    testId?: string;
}
export declare const ToolbarButtonRenderer: React.FunctionComponent<ToolbarButtonProps>;
declare const _default: React.ComponentType<Pick<ToolbarButtonProps, "small" | "title" | "children" | "className" | "onClick" | "href" | "testId">>;
export default _default;
