type EXPAND_MODE = 'expand' | 'collapse' | 'hide';

interface ProcessedStyleguidistConfig {
	compilerConfig: object;
	showCode: EXPAND_MODE;
	showUsage: EXPAND_MODE;
	components: string;
	theme: RsgTheme;
	styles: RsgStyles;
	pagePerSection: boolean;
	ribbon?: {
		text?: string;
		url: string;
	};
}

type StyleguidistConfig = RecursivePartial<ProcessedStyleguidistConfig>;
