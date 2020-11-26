import React, { ReactNode } from 'react';
import getComponent from '../../utils/getComponent';
import MdxExampleContext from './MdxExampleContext';

type Props = {
	children: ReactNode;
	componentName: string;
	exampleIndex: number;
	exampleMode?: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	__documentScope: Record<string, unknown>;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	__exampleScope: Record<string, unknown>;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	__currentComponent: unknown;
};

export default function MdxWrapper({
	children,
	componentName,
	exampleIndex,
	exampleMode,
	__documentScope: documentScope,
	__exampleScope: exampleScope,
	__currentComponent: currentComponent,
}: Props) {
	return (
		<MdxExampleContext.Provider
			value={{
				componentName,
				exampleIndex,
				exampleMode,
				documentScope: {
					React,
					[componentName]: getComponent(currentComponent),
					...documentScope,
				},
				exampleScope,
			}}
		>
			{children}
		</MdxExampleContext.Provider>
	);
}
