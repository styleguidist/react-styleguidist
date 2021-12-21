import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ fontFamily, fontSize, color }: Rsg.Theme) => {
    text: {
        fontFamily: string[];
    };
    inheritSize: {
        fontSize: string;
    };
    smallSize: {
        fontSize: number;
    };
    baseSize: {
        fontSize: number;
    };
    textSize: {
        fontSize: number;
    };
    baseColor: {
        color: string;
    };
    lightColor: {
        color: string;
    };
    em: {
        fontStyle: string;
    };
    strong: {
        fontWeight: string;
    };
    isUnderlined: {
        borderBottom: (string | number)[][];
    };
};
export interface TextProps extends JssInjectedProps {
    semantic?: 'em' | 'strong';
    size?: 'inherit' | 'small' | 'base' | 'text';
    color?: 'base' | 'light';
    underlined?: boolean;
    children: React.ReactNode;
    [intrinsicAttribute: string]: any;
}
export declare const TextRenderer: React.FunctionComponent<TextProps>;
declare const _default: React.ComponentType<Pick<TextProps, string | number>>;
export default _default;
