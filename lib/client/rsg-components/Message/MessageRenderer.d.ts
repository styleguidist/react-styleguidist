import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
interface MessageProps extends JssInjectedProps {
    children: React.ReactNode;
}
export declare const MessageRenderer: React.FunctionComponent<MessageProps>;
declare const _default: React.ComponentType<Pick<MessageProps, "children">>;
export default _default;
