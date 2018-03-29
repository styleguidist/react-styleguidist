const path = require('path');
const isArray = require('lodash/isArray');
const reactDocs = require('react-docgen');
const generate = require('escodegen').generate;
const toAst = require('to-ast');
const logger = require('glogg')('rsg');
const getExamples = require('./utils/getExamples');
const getProps = require('./utils/getProps');
const defaultSortProps = require('./utils/sortProps');
const consts = require('../scripts/consts');

const ERROR_MISSING_DEFINITION = 'No suitable component definition found.';

module.exports = function(source) {
	const file = this.request.split('!').pop();
	const config = this._styleguidist;

	// Setup Webpack context dependencies to enable hot reload when adding new files or updating any of component dependencies
	if (config.contextDependencies) {
		config.contextDependencies.forEach(dir => this.addContextDependency(dir));
	}

	const defaultParser = (filePath, source, resolver, handlers) =>
		reactDocs.parse(source, resolver, handlers);
	const propsParser = config.propsParser || defaultParser;

	let docs = {};
	try {
		docs = propsParser(file, source, config.resolver, config.handlers(file));

		// Support only one component
		if (isArray(docs)) {
			if (docs.length === 0) {
				throw new Error(ERROR_MISSING_DEFINITION);
			}
			docs = docs[0];
		}
	} catch (err) {
		const errorMessage = err.toString();
		const componentPath = path.relative(process.cwd(), file);
		const message =
			errorMessage === `Error: ${ERROR_MISSING_DEFINITION}`
				? `${componentPath} matches a pattern defined in “components” or “sections” options in your ` +
				  'style guide config but doesn’t export a component.\n\n' +
				  'It usually happens when using third-party libraries, see possible solutions here:\n' +
				  `${consts.DOCS_THIRDPARTIES}`
				: `Cannot parse ${componentPath}: ${err}\n\n` +
				  'It usually means that react-docgen does not understand your source code, try to file an issue here:\n' +
				  'https://github.com/reactjs/react-docgen/issues';
		logger.warn(message);
	}

	docs = getProps(docs, file);

	const componentProps = docs.props;
	if (componentProps) {
		// Transform the properties to an array. This will allow sorting
		// TODO: Extract to a module
		const propsAsArray = Object.keys(componentProps).reduce((acc, name) => {
			componentProps[name].name = name;
			acc.push(componentProps[name]);
			return acc;
		}, []);

		const sortProps = config.sortProps || defaultSortProps;
		docs.props = sortProps(propsAsArray);
	}

	// Examples from Markdown file
	const examplesFile = config.getExampleFilename(file);
	docs.examples = getExamples(examplesFile, docs.displayName, config.defaultExample);

	if (config.updateDocs) {
		docs = config.updateDocs(docs, file);
	}

	return `
if (module.hot) {
	module.hot.accept([])
}

module.exports = ${generate(toAst(docs))}
	`;
};
