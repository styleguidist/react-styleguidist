import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import { ArgumentProps } from 'rsg-components/Argument';
import * as Rsg from '../../../typings';
export declare const styles: ({ space }: Rsg.Theme) => {
    root: {
        marginBottom: number;
        fontSize: string;
    };
    headingWrapper: {
        marginBottom: number;
    };
};
interface ArgumentsProps extends JssInjectedProps {
    heading?: boolean;
    args: ArgumentProps[];
}
export declare const ArgumentsRenderer: React.FunctionComponent<ArgumentsProps>;
declare const _default: React.ComponentType<Pick<ArgumentsProps, "args" | "heading">>;
export default _default;
