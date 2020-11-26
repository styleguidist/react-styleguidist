export interface Modifiers {
	/** Render static highlighted code instead of a dynamic preview with a code editor */
	static?: boolean;
	/** Renders an example code but hides the code editor */
	noeditor?: boolean;
	/** Adds padding between example child elements */
	padded?: boolean;
	[key: string]: unknown;
}

export interface CodeExample {
	content: string;
	lang?: string;
	settings?: Modifiers;
}
