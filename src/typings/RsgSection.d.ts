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

	interface Section extends ProcessedSection {
		content?: Example[] | string;
		components?: Component[];
		sections?: Section[];
	}

	interface TOCItem extends ProcessedSection {
		heading?: boolean;
		shouldOpenInNewTab?: boolean;
		selected?: boolean;
		open?: boolean;
		content?: React.ReactNode;
		components?: TOCItem[];
		sections?: TOCItem[];
	}

	interface ConfigSection extends BaseSection {
		components?: string | string[] | (() => string[] | string);
		sections?: ConfigSection[];
		content?: string;
	}

	interface LoaderSection extends ProcessedSection {
		slug?: string;
		content?: RequireItResult | MarkdownExample;
		components: LoaderComponent[];
		sections: LoaderSection[];
	}

	interface ExampleSection extends Section {
		content?: Example[];
	}
}
