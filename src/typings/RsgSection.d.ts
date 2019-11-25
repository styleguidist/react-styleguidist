declare namespace Rsg {
	interface BaseSection {
		name?: string;
		ignore?: string | string[];
		description?: string;
		exampleMode?: EXPAND_MODE;
		usageMode?: EXPAND_MODE;
		filepath?: string;
		href?: string;
		external?: string;
	}

	interface Section extends BaseSection {
		slug?: string;
		sectionDepth?: number;
		visibleName?: string;
		components?: Component[];
		sections?: Section[];
		content?: Example[] | string;
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
