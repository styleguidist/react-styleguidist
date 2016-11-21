import jss from 'jss';
import isolate from 'jss-isolate';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import compose from 'jss-compose';

jss.setup({
	generateClassName: (str, { name, options }) =>
		(options.sheet.options.meta ? `rsg--${options.sheet.options.meta}--${name}` : `rsg--${name}`),
	plugins: [
		isolate(),
		nested(),
		camelCase(),
		defaultUnit(),
		compose(),
	],
});
