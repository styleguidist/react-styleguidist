import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ fontFamily, fontSize, color }: Rsg.Theme) => {
    name: {
        fontFamily: string[];
        fontSize: number;
        color: string;
    };
    isDeprecated: {
        color: string;
        textDecoration: string;
    };
};
interface NameProps extends JssInjectedProps {
    children: React.ReactNode;
    deprecated?: boolean;
}
export declare const NameRenderer: React.FunctionComponent<NameProps>;
declare const _default: React.ComponentType<Pick<NameProps, "children" | "deprecated">>;
export default _default;
