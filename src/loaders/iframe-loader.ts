import path from 'path';
import { generate } from 'escodegen';
import toAst from 'to-ast';
import createLogger from 'glogg';
import commonDir from 'common-dir';
import * as fileExistsCaseInsensitive from '../scripts/utils/findFileCaseInsensitive';
import getComponentFilesFromSections from './utils/getComponentFilesFromSections';
import getExamples from './utils/getExamples';
import * as Rsg from '../typings';

type ExamplesMap = {
	[relativePath: string]: Rsg.RequireItResult | null;
};

const logger = createLogger('rsg');

export default function() {}

export function pitch(this: Rsg.StyleguidistLoaderContext) {
	const config = this._styleguidist;

	// Clear cache so it would detect new or renamed files
	fileExistsCaseInsensitive.clearCache();

	const allComponentFiles = getComponentFilesFromSections(
		config.sections,
		config.configDir,
		config.ignore
	);

	console.log('Loading components:\n' + allComponentFiles.join('\n'));

	logger.debug('Loading components:\n' + allComponentFiles.join('\n'));

	// Setup Webpack context dependencies to enable hot reload when adding new files
	if (config.contextDependencies) {
		config.contextDependencies.forEach((dir: string) => this.addContextDependency(dir));
	} else if (allComponentFiles.length > 0) {
		// Use common parent directory of all components as a context
		this.addContextDependency(commonDir(allComponentFiles));
	}

	const allExamples = allComponentFiles.reduce((files, file) => {
		const examplesFile = config.getExampleFilename(file);
		const displayName = path.basename(file, path.extname(file));
		const relativePath = path.relative(config.configDir, file);
		files[relativePath] = getExamples(
			file,
			displayName,
			examplesFile,
			config.defaultExample,
			'iframe'
		);
		return files;
	}, {} as ExamplesMap);

	return `
if (module.hot) {
	module.hot.accept([])
}

module.exports = ${generate(toAst(allExamples))}
`;
}
