import mdx from '@mdx-js/mdx';
import { transform } from 'sucrase';
import loaderUtils from 'loader-utils';
import markStaticExamples from './rehype/markStaticExamples';
import addExampleIndicies from './rehype/addExampleIndicies';
import updateExamples from './rehype/updateExamples';
import exportExamples from './rehype/exportExamples';
import provideDocumentScope from './rehype/provideDocumentScope';
import provideExampleScope from './rehype/provideExampleScope';
import provideCurrentComponent from './rehype/provideCurrentComponent';
import * as Rsg from '../typings';

const HEADER = `
import React from 'react';
import { mdx } from '@mdx-js/react';
`;

export default async function mdxLoader(this: Rsg.StyleguidistLoaderContext, content: string) {
	const callback = this.async() || (() => '');
	const { updateExample, context } = this._styleguidist;
	const { component } = loaderUtils.getOptions(this) || {};

	let result;
	try {
		result = await mdx(content, {
			filepath: this.resourcePath,
			rehypePlugins: [
				markStaticExamples,
				addExampleIndicies,
				updateExamples({ updateExample, resourcePath: this.resourcePath }),
				exportExamples,
				provideDocumentScope({ context }),
				provideExampleScope,
				// Sections don't have current components
				component && provideCurrentComponent({ component }),
			],
		});
	} catch (err) {
		return callback(err);
	}

	const code = `${HEADER}\n${result}`;

	// Compile JSX to JavaScript with mdx pragma
	const compiledCode = transform(code, {
		transforms: ['jsx'],
		jsxPragma: 'mdx',
	}).code;

	console.log('🦜', compiledCode);

	return callback(null, compiledCode);
}
