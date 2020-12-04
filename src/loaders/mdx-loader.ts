import mdx from '@mdx-js/mdx';
import { transform } from 'sucrase';
import loaderUtils from 'loader-utils';
import markStaticExamples from './rehype/markStaticExamples';
import updateExamples from './rehype/updateExamples';
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
	const { file } = loaderUtils.getOptions(this) || {};

	let result;
	try {
		result = await mdx(content, {
			filepath: this.resourcePath,
			rehypePlugins: [
				markStaticExamples,
				updateExamples({ updateExample, resourcePath: this.resourcePath }),
				provideDocumentScope({ context }),
				provideExampleScope,
				provideCurrentComponent({ file }),
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

	// console.log('🦜', compiledCode);

	return callback(null, compiledCode);
}
