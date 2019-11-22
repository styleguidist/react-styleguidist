import React from 'react';

const StyleGuideContext = React.createContext<StyleGuideContextContents>({
	codeRevision: 0,
	config: {} as ProcessedStyleguidistConfig,
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
	config: ProcessedStyleguidistConfig;
	slots: Record<string, (SlotObject | React.FunctionComponent<any>)[]>;
	displayMode: string;
}

export function useStyleGuideContext(): StyleGuideContextContents {
	return React.useContext(StyleGuideContext);
}
