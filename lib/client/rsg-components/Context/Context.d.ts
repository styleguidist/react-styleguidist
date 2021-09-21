import React from 'react';
import * as Rsg from '../../../typings';
declare const StyleGuideContext: React.Context<StyleGuideContextContents>;
export default StyleGuideContext;
export interface SlotObject {
    id: string;
    render: React.FunctionComponent<any>;
}
export interface StyleGuideContextContents {
    codeRevision: number;
    cssRevision: string;
    config: Rsg.ProcessedStyleguidistConfig;
    slots: Record<string, (SlotObject | React.FunctionComponent<any>)[]>;
    displayMode: string;
}
export declare function useStyleGuideContext(): StyleGuideContextContents;
