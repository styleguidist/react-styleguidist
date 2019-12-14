declare namespace Rsg {
	interface BaseSection {
		name?: string;
		slug?: string;
		ignore?: string | string[];
		description?: string;
		exampleMode?: EXPAND_MODE;
		usageMode?: EXPAND_MODE;
		href?: string;
		sectionDepth?: number;
		external?: boolean;
	}

	interface ProcessedSection extends BaseSection {
		visibleName?: string;
		filepath?: string;
	}

	/**
	 * Section used on the client in javascript
	 * It is the output of the function `client/utils/processSection`
	 */
	interface Section extends ProcessedSection {
		content?: Example[] | string;
		components?: Component[];
		sections?: Section[];
	}

	/**
	 * Item of the Table Of Contents used in
	 * ComponenetsList
	 * TableOfContent
	 * filterSectionByName
	 */
	interface TOCItem extends ProcessedSection {
		heading?: boolean;
		shouldOpenInNewTab?: boolean;
		selected?: boolean;
		open?: boolean;
		content?: React.ReactNode;
		components?: TOCItem[];
		sections?: TOCItem[];
	}

	/**
	 * Used in the config file and at the early stages of processing
	 * in `schema/config.ts` this is the type that is used
	 */
	interface ConfigSection extends BaseSection {
		components?: string | string[] | (() => string[]);
		sections?: ConfigSection[];
		content?: string;
	}

	/**
	 * Type returned when sections are transformed to their webpack
	 * loadable equivalents
	 */
	interface LoaderSection extends BaseSection {
		slug?: string;
		content?: RequireItResult | MarkdownExample;
		components: LoaderComponent[];
		sections: LoaderSection[];
	}
}
