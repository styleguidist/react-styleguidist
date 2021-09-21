import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ space }: Rsg.Theme) => {
    complexType: {
        alignItems: string;
        display: string;
    };
    name: {
        flexShrink: number;
    };
    icon: {
        marginLeft: number;
        flexShrink: number;
    };
};
export interface ComplexTypeProps extends JssInjectedProps {
    name: string;
    raw: string;
}
declare const _default: React.ComponentType<Pick<ComplexTypeProps, "raw" | "name">>;
export default _default;
