import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import { Styles, StyleSheet } from 'jss';
import jss from './setupjss';
import * as theme from './theme';

export default memoize(
	(
		styles: (t: Rsg.Theme) => Styles<string>,
		config: Rsg.ProcessedStyleguidistCSSConfig,
		componentName: string,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		cssRevision: number
	): StyleSheet<string> => {
		const mergedTheme = merge<RecursivePartial<Rsg.Theme>, Rsg.Theme, RecursivePartial<Rsg.Theme>>(
			{},
			theme,
			config.theme
		);

		const customStyles =
			typeof config.styles === 'function' ? config.styles(mergedTheme) : config.styles;

		const mergedStyles: Styles<string> = merge(
			{},
			styles(mergedTheme),
			customStyles && customStyles[componentName]
		);

		return jss.createStyleSheet(mergedStyles, { meta: componentName, link: true });
	},
	(_, __, componentName, cssRevision) => `${componentName}_${cssRevision}`
);
