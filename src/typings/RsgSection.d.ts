declare namespace Rsg {
	interface Section {
		name?: string;
		slug?: string;
		visibleName?: string;
		components?: Component[];
		sections?: Section[];
		ignore?: string | string[];
		content?: string | Rsg.Example[];
		sectionDepth?: number;
		description?: string;
		exampleMode?: EXPAND_MODE;
		usageMode?: EXPAND_MODE;
		filepath?: string;
		href?: string;
		external?: string;
	}
}
