import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
interface ComponentsListRendererProps extends JssInjectedProps {
    items: Rsg.TOCItem[];
}
export declare const ComponentsListRenderer: React.FunctionComponent<ComponentsListRendererProps>;
declare const _default: React.ComponentType<Pick<ComponentsListRendererProps, "items">>;
export default _default;
