import path from 'path';
import fs from 'fs';
import { encode } from 'qss';
import requireIt from './requireIt';
import * as Rsg from '../../typings';

const examplesLoader = path.resolve(__dirname, '../examples-loader.js');
const iframeExamplesLoader = path.resolve(__dirname, '../iframe-examples-loader.js');

/**
 * Get require statement for examples file if it exists, or for default examples if it was defined.
 */
export default function getExamples(
	file: string,
	displayName: string,
	examplesFile?: string | false,
	defaultExample?: string | false,
	loader: 'ui' | 'iframe' = 'ui'
): Rsg.RequireItResult | null {
	const examplesFileToLoad =
		(examplesFile && fs.existsSync(examplesFile) ? examplesFile : false) || defaultExample;
	if (!examplesFileToLoad) {
		return null;
	}

	const relativePath = `./${path.relative(path.dirname(examplesFileToLoad), file)}`;

	const query = {
		displayName,
		file: relativePath,
		shouldShowDefaultExample: !examplesFile && !!defaultExample,
	};
	const loaderPath = loader === 'ui' ? examplesLoader : iframeExamplesLoader;
	return requireIt(`!!${loaderPath}?${encode(query)}!${examplesFileToLoad}`);
}
