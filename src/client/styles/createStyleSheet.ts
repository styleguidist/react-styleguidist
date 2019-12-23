import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import { Styles, StyleSheet } from 'jss';
import jss from './setupjss';
import * as theme from './theme';

export default memoize(
	(
		styles: (t: Rsg.Theme) => Styles<string>,
		config: Rsg.ProcessedStyleguidistConfig,
		componentName: string,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		codeRevision: number
	): StyleSheet<string> => {
		const themeResolved: RecursivePartial<Rsg.Theme> = config.theme
			? (config.theme as any).default || config.theme
			: {};
		const stylesResolved: (th: Rsg.Theme) => Styles | Styles = config.styles
			? (config.styles as any).default || config.styles
			: {};
		const mergedTheme = merge<RecursivePartial<Rsg.Theme>, Rsg.Theme, RecursivePartial<Rsg.Theme>>(
			{},
			theme,
			themeResolved
		);

		const customStyles =
			typeof stylesResolved === 'function' ? stylesResolved(mergedTheme) : stylesResolved;
		const mergedStyles: Styles<string> = merge(
			{},
			styles(mergedTheme),
			customStyles && customStyles[componentName]
		);

		return jss.createStyleSheet(mergedStyles, { meta: componentName, link: true });
	},
	(_, __, componentName, codeRevision) => `${componentName}_${codeRevision}`
);
