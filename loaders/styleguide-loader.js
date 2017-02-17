'use strict';

const commonDir = require('common-dir');
const generate = require('escodegen').generate;
const toAst = require('to-ast');
const getStyleguide = require('./utils/getStyleguide');

module.exports = function() {};
module.exports.pitch = function() {
	/* istanbul ignore if */
	if (this.cacheable) {
		this.cacheable();
	}

	const config = this._styleguidist;
	const styleguide = getStyleguide(config);

	/* eslint-disable no-console */
	/* istanbul ignore if */
	if (config.verbose) {
		console.log();
		console.log('Loading components:');
		console.log(styleguide.allComponentFiles.join('\n'));
		console.log();
	}
	/* eslint-enable */

	// Setup Webpack context dependencies to enable hot reload when adding new files
	if (config.contextDependencies) {
		config.contextDependencies.forEach(dir => this.addContextDependency(dir));
	}
	else if (styleguide.allComponentFiles.length > 0) {
		// Use common parent directory of all components as a context
		this.addContextDependency(commonDir(styleguide.allComponentFiles));
	}

	return `
if (module.hot) {
	module.hot.accept([])
}

module.exports = ${generate(toAst(styleguide))}
`;
};
