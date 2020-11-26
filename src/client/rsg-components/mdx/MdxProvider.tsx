import React, { ReactNode } from 'react';
import { MDXProvider as MDXProviderBase } from '@mdx-js/react';
import MdxCode from './MdxCode';
import MdxPre from './MdxPre';
import MdxWrapper from './MdxWrapper';

// TODO: Allow components customization via style guide config

const DEFAULT_COMPONENTS = {
	code: MdxCode,
	pre: MdxPre,
	wrapper: MdxWrapper,
};

type Props = {
	children: ReactNode;
};

export default function MdxProvider({ children }: Props) {
	return <MDXProviderBase components={DEFAULT_COMPONENTS}>{children}</MDXProviderBase>;
}
