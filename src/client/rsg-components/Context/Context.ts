import React from 'react';
import * as Rsg from '../../../typings';

const StyleGuideContext = React.createContext<StyleGuideContextContents>({
	codeRevision: 0,
	cssRevision: '0',
	config: {} as Rsg.ProcessedStyleguidistConfig,
	slots: {},
	displayMode: 'collapse',
});

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

export function useStyleGuideContext(): StyleGuideContextContents {
	return React.useContext(StyleGuideContext);
}
