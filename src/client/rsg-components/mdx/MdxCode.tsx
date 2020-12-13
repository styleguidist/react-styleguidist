import React from 'react';
import Playground from 'rsg-components/Playground';
import { useMdxExampleContext } from './MdxExampleContext';
import MdxHighlight from './MdxHighlight';
import MdxCodeStatic from './MdxCodeStatic';
import * as Rsg from '../../../typings';

interface Props extends Rsg.Modifiers {
	children: string;
	className: string;
}

export default function MdxCode({ className, children, ...modifiers }: Props) {
	const {
		componentName,
		exampleIndex,
		exampleMode,
		documentScope,
		exampleScope,
	} = useMdxExampleContext();

	if (modifiers.static) {
		return (
			<MdxCodeStatic>
				<MdxHighlight className={className}>{children}</MdxHighlight>
			</MdxCodeStatic>
		);
	}

	return (
		<Playground
			code={String(children)}
			componentName={componentName}
			exampleIndex={exampleIndex}
			exampleMode={exampleMode}
			documentScope={documentScope}
			exampleScope={exampleScope}
			settings={modifiers}
		/>
	);
}
