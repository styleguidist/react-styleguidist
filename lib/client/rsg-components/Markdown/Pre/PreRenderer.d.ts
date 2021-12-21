import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
export interface PreProps {
    className?: string;
    children: React.ReactNode;
}
declare type PrePropsWithClasses = JssInjectedProps & PreProps;
export declare const PreRenderer: React.FunctionComponent<PrePropsWithClasses>;
declare const _default: React.ComponentType<Pick<PrePropsWithClasses, "children" | "className">>;
export default _default;
