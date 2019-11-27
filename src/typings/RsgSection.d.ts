declare namespace Rsg {
	interface BaseSection {
		name?: string;
		ignore?: string | string[];
		description?: string;
		exampleMode?: EXPAND_MODE;
		usageMode?: EXPAND_MODE;
		href?: string;
		external?: string;
	}

	interface Section extends BaseSection {
		slug?: string;
		visibleName?: string;
		filepath?: string;
		components?: Component[];
		sections?: Section[];
		content?: Example[] | string;
		sectionDepth?: number;
	}

	interface ConfigSection extends BaseSection {
		components?: string | string[];
		sections?: ConfigSection[];
		content?: string[] | string;
	}

	interface ExampleSection extends Section {
		content?: Example[];
	}
}
