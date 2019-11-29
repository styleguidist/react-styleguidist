import pick from 'lodash/pick';
import commonDir from 'common-dir';
import { generate } from 'escodegen';
import toAst from 'to-ast';
import createLogger from 'glogg';
import * as fileExistsCaseInsensitive from '../scripts/utils/findFileCaseInsensitive';
import getAllContentPages from './utils/getAllContentPages';
import getComponentFilesFromSections from './utils/getComponentFilesFromSections';
import getComponentPatternsFromSections from './utils/getComponentPatternsFromSections';
import getSections from './utils/getSections';
import filterComponentsWithExample from './utils/filterComponentsWithExample';
import slugger from './utils/slugger';

const logger = createLogger('rsg');

// Config options that should be passed to the client
const CLIENT_CONFIG_OPTIONS = [
	'compilerConfig',
	'mountPointId',
	'pagePerSection',
	'previewDelay',
	'ribbon',
	'showSidebar',
	'styles',
	'theme',
	'title',
	'version',
];

export default function() {}
export function pitch(this: Rsg.StyleguidistLoaderContext) {
	// Clear cache so it would detect new or renamed files
	fileExistsCaseInsensitive.clearCache();

	// Reset slugger for each code reload to be deterministic
	slugger.reset();

	const config = this._styleguidist;

	let sections = getSections(config.sections, config);
	if (config.skipComponentsWithoutExample) {
		sections = filterComponentsWithExample(sections);
	}

	const allComponentFiles = getComponentFilesFromSections(
		config.sections,
		config.configDir,
		config.ignore
	);
	const allContentPages = getAllContentPages(sections);

	// Nothing to show in the style guide
	const welcomeScreen = allContentPages.length === 0 && allComponentFiles.length === 0;
	const patterns = welcomeScreen ? getComponentPatternsFromSections(config.sections) : undefined;

	logger.debug('Loading components:\n' + allComponentFiles.join('\n'));

	// Setup Webpack context dependencies to enable hot reload when adding new files
	if (config.contextDependencies) {
		config.contextDependencies.forEach((dir: string) => this.addContextDependency(dir));
	} else if (allComponentFiles.length > 0) {
		// Use common parent directory of all components as a context
		this.addContextDependency(commonDir(allComponentFiles));
	}

	const styleguide = {
		config: pick(config, CLIENT_CONFIG_OPTIONS),
		welcomeScreen,
		patterns,
		sections,
	};

	return `
if (module.hot) {
	module.hot.accept([])
}

module.exports = ${generate(toAst(styleguide))}
	`;
}
