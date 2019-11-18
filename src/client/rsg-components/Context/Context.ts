import React from 'react';
import { EXPAND_MODE, ProcessedStyleguidistConfig } from '../../../scripts/schemas/config';

const StyleGuideContext = React.createContext<StyleGuideContextContents>({
	codeRevision: 0,
	config: {} as ProcessedStyleguidistConfig,
	slots: [],
	displayMode: 'collapse',
});

export default StyleGuideContext;

export interface StyleGuideContextContents {
	codeRevision: number;
	config: ProcessedStyleguidistConfig;
	slots: any[];
	displayMode: EXPAND_MODE;
}

export function useStyleGuideContext(): StyleGuideContextContents {
	return React.useContext(StyleGuideContext);
}
