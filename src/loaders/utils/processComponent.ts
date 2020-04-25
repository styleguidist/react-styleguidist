import fs from 'fs';
import path from 'path';
import getNameFromFilePath from './getNameFromFilePath';
import requireIt from './requireIt';
import slugger from './slugger';
import * as Rsg from '../../typings';

const propsLoader = path.resolve(__dirname, '../props-loader.js');

/**
 * References the filepath of the metadata file.
 *
 * @param {string} filepath
 * @returns {string}
 */
function getComponentMetadataPath(filepath: string): string {
	const extname = path.extname(filepath);
	return filepath.substring(0, filepath.length - extname.length) + '.json';
}

/**
 * Return an object with all required for style guide information for a given component.
 *
 * @param {string} filepath
 * @param {object} config
 * @returns {object}
 */
export default function processComponent(
	filepath: string,
	config: Rsg.SanitizedStyleguidistConfig
): Rsg.LoaderComponent {
	const componentPath = path.relative(config.configDir, filepath);
	const componentName = getNameFromFilePath(filepath);
	const examplesFile = config.getExampleFilename(filepath);
	const componentMetadataPath = getComponentMetadataPath(filepath);
	return {
		filepath: componentPath,
		slug: slugger.slug(componentName),
		pathLine: config.getComponentPathLine(componentPath),
		module: requireIt(filepath),
		props: requireIt(`!!${propsLoader}!${filepath}`),
		hasExamples: !!(examplesFile && fs.existsSync(examplesFile)),
		metadata: fs.existsSync(componentMetadataPath) ? requireIt(componentMetadataPath) : {},
	};
}
