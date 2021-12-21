import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
interface ExamplesRendererProps extends JssInjectedProps {
    children?: React.ReactNode;
    name?: string;
}
export declare const ExamplesRenderer: React.FunctionComponent<ExamplesRendererProps>;
declare const _default: React.ComponentType<Pick<ExamplesRendererProps, "children" | "name">>;
export default _default;
