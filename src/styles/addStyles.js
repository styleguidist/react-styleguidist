import jss from 'jss';
import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import * as theme from './theme';
import sheets from './sheetsRegistry';

export default memoize((styles, config, componentName) => {
	const mergedTheme = merge(theme, config.theme);
	const mergedStyles = merge(
		styles(mergedTheme),
		config.styles && config.styles[componentName]
	);
	const sheet = jss.createStyleSheet(mergedStyles, { meta: componentName }).attach();
	sheets.add(sheet);
	return sheet.classes;
});
