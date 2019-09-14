import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import get from 'lodash/get';
import find from 'lodash/find';
import jss from './setupjss';
import * as theme from './theme';

const getTheme = (currentTheme, config) => {
	const theme = find(config.themes, { id: currentTheme });
	return theme ? theme.styles : config.theme;
};

export default memoize(
	(currentTheme, componentName, styles, config) => {
		const mergedTheme = merge({}, theme, getTheme(currentTheme, config));
		const mergedStyles = merge({}, styles(mergedTheme), get(config.styles, componentName));
		return jss.createStyleSheet(mergedStyles, { meta: componentName, link: true });
	},
	(currentTheme, componentName) => `${currentTheme}:${componentName}`
);
