import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
// eslint-disable-next-line import/extensions,import/no-unresolved
import * as customTheme from 'rsg-customTheme';
// eslint-disable-next-line import/extensions,import/no-unresolved
import customStylesFile from 'rsg-customStyles';
import { Styles } from 'jss';
import jss from './setupjss';
import * as theme from './theme';

const customStyles = customStylesFile as Rsg.Styles;

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
