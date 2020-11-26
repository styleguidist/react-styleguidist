import React, { ReactNode } from 'react';
import Playground from 'rsg-components/Playground';
import { useMdxExampleContext } from './MdxExampleContext';

type Props = {
	children: ReactNode;
	static: boolean;
};

export default function MdxCode({ children, static: staticMode }: Props) {
	const {
		componentName,
		exampleIndex,
		exampleMode,
		documentScope,
		exampleScope,
	} = useMdxExampleContext();

	if (staticMode) {
		return <div>{children}</div>;
	}

	// TODO: Settings
	return (
		<Playground
			code={String(children)}
			componentName={componentName}
			exampleIndex={exampleIndex}
			exampleMode={exampleMode}
			documentScope={documentScope}
			exampleScope={exampleScope}
		/>
	);
}
