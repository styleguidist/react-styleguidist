import React, { ReactNode } from 'react';
import getComponent from '../../utils/getComponent';
import MdxContext from './MdxContext';
import * as Rsg from '../../../typings';

interface Props extends Rsg.MdxExtras {
	children?: ReactNode;
	componentName?: string;
	exampleMode?: string;
}

export default function MdxWrapper({
	children,
	componentName,
	exampleMode,
	__documentScope: documentScope,
	__exampleScope: exampleScope,
	__storiesScope: storiesScope,
	__currentComponent: currentComponent,
	__namedExamples: namedExamples,
}: Props) {
	const expandedDocumentScope = {
		// Make React available to examples
		React,
		// Make the current component available to examples,
		// non-component sections don't have the current component
		...(currentComponent && componentName
			? {
					[componentName]: getComponent(currentComponent),
			  }
			: {}),
		...documentScope,
	};
	const expandedExampleScope = { ...exampleScope, ...storiesScope };
	return (
		<MdxContext.Provider
			value={{
				componentName,
				exampleMode,
				documentScope: expandedDocumentScope,
				exampleScope: expandedExampleScope,
				namedExamples,
			}}
		>
			{children}
		</MdxContext.Provider>
	);
}
