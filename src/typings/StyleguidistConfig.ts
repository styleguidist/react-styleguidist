import { TransformOptions } from 'buble';
import { Theme } from './Theme';
import { Styles } from './Styles';
import { RecursivePartial } from './RecursivePartial';

export type EXPAND_MODE = 'expand' | 'collapse' | 'hide';

export interface ProcessedStyleguidistConfig {
	compilerConfig: TransformOptions;
	showCode: EXPAND_MODE;
	showUsage: EXPAND_MODE;
	components: string;
	theme: Theme;
	styles: Styles;
	pagePerSection: boolean;
	ribbon?: {
		text?: string;
		url: string;
	};
}

export type StyleguidistConfig = RecursivePartial<ProcessedStyleguidistConfig>;
