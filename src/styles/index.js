import jss from 'jss';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import vendorPrefixer from 'jss-vendor-prefixer';
import isolate from 'jss-isolate';

import 'highlight.js/styles/tomorrow.css';
import './styles.css';

// Setup JSS
jss.setup({
	plugins: [
		nested(),
		camelCase(),
		defaultUnit(),
		vendorPrefixer(),
		isolate(),
	],
});
