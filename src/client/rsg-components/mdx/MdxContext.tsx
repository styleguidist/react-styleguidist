import React, { createContext } from 'react';

interface MdxContextContents {
	/** Name of the React component */
	componentName: string;
	/** How to render an editor: expanded or not */
	exampleMode?: string;
	/** Modules imported inside Mdx file */
	documentScope: Record<string, unknown>;
	/** Modules imported inside examples */
	exampleScope: Record<string, unknown>;
}

const MdxContext = createContext<MdxContextContents>({
	componentName: '',
	documentScope: {},
	exampleScope: {},
});

export default MdxContext;

export function useMdxContext(): MdxContextContents {
	return React.useContext(MdxContext);
}
