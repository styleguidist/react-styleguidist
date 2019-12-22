import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import { Styles, StyleSheet } from 'jss';
import customTheme from 'rsg-customTheme';
import customStylesFile from 'rsg-customStyles';
import jss from './setupjss';
import * as theme from './theme';

export default memoize(
	(
		styles: (t: Rsg.Theme) => Styles<string>,
		config: Rsg.ProcessedStyleguidistConfig,
		componentName: string
	): StyleSheet<string> => {
		const mergedTheme = merge<
			RecursivePartial<Rsg.Theme>,
			Rsg.Theme,
			RecursivePartial<Rsg.Theme>,
			RecursivePartial<Rsg.Theme>
		>({}, theme, typeof config.theme === 'object' ? config.theme : {}, customTheme);

		const customStylesToken = typeof config.styles === 'string' ? customStylesFile : config.styles;
		const customStyles =
			typeof customStylesToken === 'function' ? customStylesToken(mergedTheme) : customStylesToken;
		const mergedStyles: Partial<Styles<string>> = merge(
			{},
			styles(mergedTheme),
			customStyles && customStyles[componentName]
		);
		return jss.createStyleSheet(mergedStyles, { meta: componentName, link: true });
	}
);
