const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');
const getNameFromFilePath = require('./getNameFromFilePath');
const requireIt = require('./requireIt');
const slugger = require('./slugger');

const propsLoader = path.resolve(__dirname, '../props-loader.js');

/**
 * Loads the metadata from the markdown file of the Component.
 *
 * @param {string} filepath
 * @returns {object}
 */
function getComponentMetadata(filepath) {
	const componentMarkdownFilePath = filepath
		.substring(0, filepath.length - path.extname(filepath).length)
		.concat('.md');

	const componentReadmeMarkdownFilePath = path.join(path.dirname(filepath), 'Readme.md');

	let markdownFilePath;
	if (fs.existsSync(componentMarkdownFilePath)) {
		markdownFilePath = componentMarkdownFilePath;
	} else if (fs.existsSync(componentReadmeMarkdownFilePath)) {
		markdownFilePath = componentReadmeMarkdownFilePath;
	} else {
		return {};
	}

	const componentMarkdown = fs.readFileSync(markdownFilePath, 'utf8');
	if (!frontMatter.test(componentMarkdown)) {
		return {};
	}
	const componentMetadata = frontMatter(componentMarkdown).attributes;
	return componentMetadata;
}

/**
 * Return an object with all required for style guide information for a given component.
 *
 * @param {string} filepath
 * @param {object} config
 * @returns {object}
 */
module.exports = function processComponent(filepath, config) {
	const componentPath = path.relative(config.configDir, filepath);
	const componentName = getNameFromFilePath(filepath);
	const examplesFile = config.getExampleFilename(filepath);
	return {
		filepath: componentPath,
		slug: slugger.slug(componentName),
		pathLine: config.getComponentPathLine(componentPath),
		module: requireIt(filepath),
		props: requireIt(`!!${propsLoader}!${filepath}`),
		hasExamples: examplesFile && fs.existsSync(examplesFile),
		metadata: getComponentMetadata(filepath),
	};
};
