declare namespace Rsg {
	interface BaseSection {
		name?: string;
		ignore?: string | string[];
		description?: string;
		exampleMode?: EXPAND_MODE;
		usageMode?: EXPAND_MODE;
		href?: string;
		external?: string;
		sectionDepth?: number;
	}

	interface Section extends BaseSection {
		slug?: string;
		visibleName?: string;
		filepath?: string;
		components?: Component[];
		sections?: Section[];
		content?: Example[] | string;
	}

	interface ConfigSection extends BaseSection {
		components?: string | string[] | (() => string[]);
		sections?: ConfigSection[];
		content?: string;
	}

	interface LoaderSection extends BaseSection {
		slug?: string;
		content?: RequireItResult | MarkdownExample;
		components: LoaderComponent[];
		sections?: LoaderSection[];
	}

	interface ExampleSection extends Section {
		content?: Example[];
	}
}
