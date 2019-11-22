import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import { Styles } from 'jss';
import jss from './setupjss';
import * as theme from './theme';

export default memoize((styles, config: StyleguidistConfig, componentName) => {
	const mergedTheme: RsgTheme = merge({}, theme, config.theme);
	const mergedStyles: Partial<Styles<string>> = merge(
		{},
		styles(mergedTheme),
		config.styles && config.styles[componentName]
	);
	return jss.createStyleSheet(mergedStyles, { meta: componentName, link: true });
});
