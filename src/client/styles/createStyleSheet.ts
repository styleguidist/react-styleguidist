import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import { Styles, StyleSheet } from 'jss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import customTheme from 'rsg-customTheme';
// eslint-disable-next-line import/extensions,import/no-unresolved
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

		const customStyles =
			typeof config.styles === 'function' ? config.styles(mergedTheme) : config.styles;
		const mergedStyles: Partial<Styles<string>> = merge(
			{},
			styles(mergedTheme),
			typeof config.styles === 'string'
				? customStylesFile[componentName]
				: customStyles && customStyles[componentName]
		);
		return jss.createStyleSheet(mergedStyles, { meta: componentName, link: true });
	}
);
