import jss from 'jss';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import isolate from 'jss-isolate';
import compose from 'jss-compose';

import 'highlight.js/styles/tomorrow.css';
import './styles.css';

// Setup JSS
jss.setup({
	plugins: [
		nested(),
		camelCase(),
		defaultUnit(),
		isolate(),
		compose(),
	],
});
