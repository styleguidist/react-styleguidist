import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import { Styles } from 'jss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import customTheme from 'rsg-customTheme';
// eslint-disable-next-line import/extensions,import/no-unresolved
import customStyles from 'rsg-customStyles';
import jss from './setupjss';
import * as theme from './theme';

export default memoize((styles, config: Rsg.StyleguidistConfig, componentName) => {
	const mergedTheme: Rsg.Theme = merge({}, theme, config.theme, customTheme);
	const mergedStyles: Partial<Styles<string>> = merge(
		{},
		styles(mergedTheme),
		typeof config.styles === 'string'
			? customStyles[componentName]
			: config.styles && config.styles[componentName]
	);
	return jss.createStyleSheet(mergedStyles, { meta: componentName, link: true });
});
