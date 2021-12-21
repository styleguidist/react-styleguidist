import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ color, space, fontSize, fontFamily }: Rsg.Theme) => {
    root: {
        position: string;
        top: number;
        right: number;
        width: number;
        height: number;
        zIndex: number;
    };
    link: {
        fontFamily: string[];
        position: string;
        right: number;
        top: number;
        display: string;
        width: number;
        padding: number[][];
        textAlign: string;
        color: string;
        fontSize: number;
        background: string;
        textDecoration: string;
        textShadow: (string | number)[][];
        transformOrigin: number[][];
        transform: string;
        cursor: string;
    };
};
interface RibbonProps extends JssInjectedProps {
    url: string;
    text?: string;
}
export declare const RibbonRenderer: React.FunctionComponent<RibbonProps>;
declare const _default: React.ComponentType<Pick<RibbonProps, "text" | "url">>;
export default _default;
