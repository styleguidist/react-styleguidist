import React from 'react';
import Playground from 'rsg-components/Playground';
import { useMdxExampleContext } from './MdxExampleContext';
import MdxHighlight from './MdxHighlight';
import MdxCodeStatic from './MdxCodeStatic';

type Props = {
	children: string;
	className: string;
	static: boolean;
};

export default function MdxCode({ children, static: staticMode, ...rest }: Props) {
	const {
		componentName,
		exampleIndex,
		exampleMode,
		documentScope,
		exampleScope,
	} = useMdxExampleContext();

	if (staticMode) {
		return (
			<MdxCodeStatic>
				<MdxHighlight {...rest}>{children}</MdxHighlight>
			</MdxCodeStatic>
		);
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
