import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
interface PlaygroundErrorProps extends JssInjectedProps {
    message: string;
}
export declare const PlaygroundErrorRenderer: React.FunctionComponent<PlaygroundErrorProps>;
declare const _default: React.ComponentType<Pick<PlaygroundErrorProps, "message">>;
export default _default;
