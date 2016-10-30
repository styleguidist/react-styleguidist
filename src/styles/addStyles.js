import jss from 'jss';
import merge from 'lodash/merge';
import * as theme from './theme';

export default function addStyles(styles, config, componentName) {
	const mergedTheme = merge(theme, config.theme);
	const mergedStyles = merge(
		styles(mergedTheme),
		config.styles[componentName] || {}
	);
	return jss.createStyleSheet(mergedStyles).attach().classes;
}
