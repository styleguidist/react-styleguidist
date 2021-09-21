import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ space, fontFamily, fontSize, color }: Rsg.Theme) => {
    pathline: {
        fontFamily: string[];
        fontSize: number;
        color: string;
        wordBreak: string;
    };
    copyButton: {
        marginLeft: number;
    };
};
export declare const PathlineRenderer: React.FunctionComponent<JssInjectedProps>;
declare const _default: React.ComponentType<Pick<JssInjectedProps, never>>;
export default _default;
