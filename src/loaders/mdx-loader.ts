import mdx from '@mdx-js/mdx';
import { transform } from 'sucrase';
import loaderUtils from 'loader-utils';
import addReact from './rehype/addReact';
import addExampleIndicies from './rehype/addExampleIndicies';
import exportExamples from './rehype/exportExamples';
import exportStories from './rehype/exportStories';
import markStaticExamples from './rehype/markStaticExamples';
import provideCurrentComponent from './rehype/provideCurrentComponent';
import provideDocumentScope from './rehype/provideDocumentScope';
import provideExampleScope from './rehype/provideExampleScope';
import updateExamples from './rehype/updateExamples';
import * as Rsg from '../typings';

const HEADER = `
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
				addReact,
				markStaticExamples,
				addExampleIndicies,
				updateExamples({ updateExample, resourcePath: this.resourcePath }),
				exportExamples,
				// Sections don't have current components
				component && exportStories({ component, resourcePath: this.resourcePath }),
				provideDocumentScope({ context }),
				provideExampleScope,
				component && provideCurrentComponent({ component }),
				// TODO: Use smart (no-duplicates) insert instead of deduplication
				// TODO: Or better insert needed imports in front of each example
				// deduplicateImports,
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

	// console.log('='.repeat(80));
	// console.log('🦜🦜🦜🦜🦜🦜🦜', this.resourcePath, compiledCode);

	return callback(null, compiledCode);
}
