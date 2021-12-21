import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
interface LinkProps extends JssInjectedProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    target?: string;
    onClick?: () => void;
}
export declare const LinkRenderer: React.FunctionComponent<LinkProps>;
declare const _default: React.ComponentType<Pick<LinkProps, "children" | "className" | "onClick" | "href" | "target">>;
export default _default;
