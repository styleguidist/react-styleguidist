import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import { Styles } from 'jss';
import jss from './setupjss';
import * as theme from './theme';

export default memoize((styles, config: Rsg.StyleguidistConfig, componentName) => {
	const mergedTheme: Rsg.Theme = merge({}, theme, config.theme);
	const customStyles =
		typeof config.styles === 'function' ? config.styles(mergedTheme) : config.styles;
	const mergedStyles: Partial<Styles<string>> = merge(
		{},
		styles(mergedTheme),
		customStyles && customStyles[componentName]
	);
	return jss.createStyleSheet(mergedStyles, { meta: componentName, link: true });
});
