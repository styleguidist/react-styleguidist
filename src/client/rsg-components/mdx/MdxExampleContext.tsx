import React, { createContext } from 'react';

interface MdxExampleContextContents {
	/** Name of the React component */
	componentName: string;
	/** Number of the example inside the Markdown/Mdx file */
	exampleIndex: number;
	/** How to render an editor: expanded or not */
	exampleMode?: string;
	/** Modules imported inside Mdx file */
	documentScope: Record<string, unknown>;
	/** Modules imported inside examples */
	exampleScope: Record<string, unknown>;
}

const MdxExampleContext = createContext<MdxExampleContextContents>({
	componentName: '',
	exampleIndex: 0,
	documentScope: {},
	exampleScope: {},
});

export default MdxExampleContext;

export function useMdxExampleContext(): MdxExampleContextContents {
	return React.useContext(MdxExampleContext);
}
