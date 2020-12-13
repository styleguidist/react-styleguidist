import { ComponentType } from 'react';

export interface Modifiers {
	/** Render static highlighted code instead of a dynamic preview with a code editor */
	static?: boolean;
	/** Renders an example code but hides the code editor */
	noeditor?: boolean;
	/** Opens the code editor, even if hidden by default in style guide settings */
	showcode?: boolean;
	/** Adds padding between example child elements */
	padded?: boolean;
	/** Adds custom class name to an example preview wrapper */
	'preview-class'?: string;
}

export interface CodeExample {
	content: string;
	lang?: string;
	settings?: Modifiers;
}

export interface ExampleModule {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	__esModule: true;
	default: ComponentType;
}
