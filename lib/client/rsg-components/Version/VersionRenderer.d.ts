import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
interface VersionProps extends JssInjectedProps {
    children?: React.ReactNode;
}
export declare const VersionRenderer: React.FunctionComponent<VersionProps>;
declare const _default: React.ComponentType<Pick<VersionProps, "children">>;
export default _default;
