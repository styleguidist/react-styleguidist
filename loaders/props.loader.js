const path = require('path');
const reactDocs = require('react-docgen');
const removeDoclets = require('./utils/removeDoclets');

/* eslint-disable no-console */

const config = require('../src/utils/config');

const defaultPropsParser = (filePath, source) => reactDocs.parse(source, config.resolver, config.handlers);

const REQUIRE_PLACEHOLDER = '<%{#require#}%>';

module.exports = function(source) {
	if (this.cacheable) {
		this.cacheable();
	}

	const file = this.request.split('!').pop();

	let jsonProps;
	try {
		const propsParser = config.propsParser || defaultPropsParser;
		let props = propsParser(file, source);
		if (!Array.isArray(props)) {
			props = [props];
		}
		jsonProps = props.map(doc => {
			if (doc.description) {
				// Read doclets from the description and remove them
				doc.doclets = reactDocs.utils.docblock.getDoclets(doc.description);
				doc.description = removeDoclets(doc.description);
			}
			else {
				doc.doclets = {};
			}

			if (doc.doclets.example) {
				doc.example = REQUIRE_PLACEHOLDER;
			}

			return JSON.stringify(doc).replace(
				JSON.stringify(REQUIRE_PLACEHOLDER),
				doc.doclets.example && 'require(' + JSON.stringify('examples!' + doc.doclets.example) + ')'
			);
		});
	}
	catch (exception) {
		console.log('Error when parsing', path.relative(process.cwd(), file));
		console.log(exception.toString());
		console.log();
		jsonProps = [];
	}

	return `
		if (module.hot) {
			module.hot.accept([]);
		}
		module.exports = [${jsonProps.join(',')}];
	`;
};
