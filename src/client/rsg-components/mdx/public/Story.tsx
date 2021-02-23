import React from 'react';
import camelCase from 'lodash/camelCase';
import Para from 'rsg-components/Para';
import PlaygroundError from 'rsg-components/PlaygroundError';
import Playground from 'rsg-components/Playground';
import { useMdxContext } from '../MdxContext';
import MdxHighlight from '../MdxHighlight';
import MdxCodeStatic from '../MdxCodeStatic';
import * as Rsg from '../../../../typings';

interface Props extends Rsg.Modifiers {
	id: string;
}

// TODO: Extract to its own file?
// XXX: We're assuming that all imported stories are located in a .story.js file
// next to the Mdx file with the same name, so we're ignoring all but the very
// last part of the story ID, which is the name of the exported from the CSF file
// function
export const getLocalExampleNameById = (id: string) => camelCase(id.replace(/^.*?--/, ''));

export default function Story({ id, ...modifiers }: Props) {
	const {
		componentName,
		exampleMode,
		documentScope,
		exampleScope,
		namedExamples,
	} = useMdxContext();

	const code = namedExamples[getLocalExampleNameById(id)];
	if (!code) {
		return (
			<Para>
				<PlaygroundError message={`Named example \`${id}\` not found in a story file`} />
			</Para>
		);
	}

	if (modifiers.static) {
		return (
			<MdxCodeStatic>
				<MdxHighlight>{code}</MdxHighlight>
			</MdxCodeStatic>
		);
	}

	return (
		<Playground
			code={code}
			componentName={componentName || ''} // TODO
			exampleMode={exampleMode}
			documentScope={documentScope}
			exampleScope={exampleScope}
			modifiers={modifiers}
		/>
	);
}
