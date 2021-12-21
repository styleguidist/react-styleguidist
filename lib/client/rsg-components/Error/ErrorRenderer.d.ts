import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
interface ErrorProps extends JssInjectedProps {
    error: any;
    info: React.ErrorInfo;
}
export declare const ErrorRenderer: React.FunctionComponent<ErrorProps>;
declare const _default: React.ComponentType<Pick<ErrorProps, "error" | "info">>;
export default _default;
