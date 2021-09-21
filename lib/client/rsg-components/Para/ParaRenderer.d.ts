import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ space, color, fontFamily, fontSize }: Rsg.Theme) => {
    para: {
        marginTop: number;
        marginBottom: number;
        color: string;
        fontFamily: string[];
        fontSize: number;
        lineHeight: number;
    };
};
interface ParaProps extends JssInjectedProps {
    semantic?: 'p';
    children: React.ReactNode;
}
export declare const ParaRenderer: React.FunctionComponent<ParaProps>;
declare const _default: React.ComponentType<Pick<ParaProps, "children" | "semantic">>;
export default _default;
