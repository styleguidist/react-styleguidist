import React, { ReactNode } from 'react';
import getComponent from '../../utils/getComponent';
import MdxContext from './MdxContext';
import * as Rsg from '../../../typings';

interface Props extends Rsg.MdxExtras {
	children?: ReactNode;
	componentName: string;
	exampleMode?: string;
}

export default function MdxWrapper({
	children,
	componentName,
	exampleMode,
	__documentScope: documentScope,
	__exampleScope: exampleScope,
	__currentComponent: currentComponent,
}: Props) {
	return (
		<MdxContext.Provider
			value={{
				componentName,
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
		</MdxContext.Provider>
	);
}
