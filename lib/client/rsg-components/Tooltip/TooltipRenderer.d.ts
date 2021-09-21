import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ space, color, borderRadius, fontSize }: Rsg.Theme) => {
    tooltip: {
        '&.tippy-box': {
            transitionProperty: string[][];
            '&[data-state="hidden"]': {
                opacity: number;
            };
        };
        '& .tippy-content': {
            padding: number;
            border: string;
            borderRadius: number;
            background: string;
            boxShadow: (string | number)[][];
            fontSize: number;
            color: string;
        };
    };
};
export declare type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';
export interface TooltipProps extends JssInjectedProps {
    children: React.ReactNode;
    content: React.ReactNode;
    placement?: TooltipPlacement;
}
declare const _default: React.ComponentType<Pick<TooltipProps, "content" | "children" | "placement">>;
export default _default;
