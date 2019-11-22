import { RsgComponent } from './RsgComponent';
import { EXPAND_MODE } from './StyleguidistConfig';
import { Example } from './Example';

export interface RsgSection {
	name?: string;
	slug?: string;
	visibleName?: string;
	components?: RsgComponent[];
	sections?: RsgSection[];
	ignore?: string | string[];
	content?: string | Example[];
	sectionDepth?: number;
	description?: string;
	exampleMode?: EXPAND_MODE;
	usageMode?: EXPAND_MODE;
	filepath?: string;
	href?: string;
	external?: string;
}
