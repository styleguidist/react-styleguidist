import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
interface MarkdownHeadingProps extends JssInjectedProps {
    children: React.ReactNode;
    level: number;
    id?: string;
}
declare const _default: React.ComponentType<Pick<MarkdownHeadingProps, "children" | "id" | "level">>;
export default _default;
