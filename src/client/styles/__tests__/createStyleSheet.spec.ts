import * as theme from '../theme';
import createStyleSheet from '../createStyleSheet';

const customThemeColor = '#123456';
const customThemeBorderColor = '#654321';
const customThemeMaxWidth = 9999;

const customStyleBorderColor = '#ABCDEF';

const customThemeLinkColor = '#CCCAAA';

const testComponentName = 'TestComponentName';
const testRuleName = 'testRule';

const styles = ({ color, borderRadius, maxWidth }: Rsg.Theme) => ({
	[testRuleName]: {
		color: color.base,
		backgroundColor: color.baseBackground,
		borderColor: color.border,
		borderRadius,
		maxWidth,
	},
});

const config = {
	hello: 0,
	theme: {
		color: {
			base: customThemeColor,
			border: customThemeBorderColor,
			link: customThemeLinkColor,
		},
		maxWidth: customThemeMaxWidth,
	},
	styles: {
		[testComponentName]: {
			[testRuleName]: {
				borderColor: customStyleBorderColor,
			},
		},
	},
};

const configWithStylesAsAFunction = {
	hello: 1,
	...config,
	styles: (locTheme: Rsg.Theme) => {
		return {
			[testComponentName]: {
				[testRuleName]: {
					borderColor: locTheme.color.link,
				},
			},
		};
	},
};

describe('createStyleSheet', () => {
	it('should use theme variables', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style['background-color']).toBe(theme.color.baseBackground);
		expect(style['border-radius']).toBe(`${theme.borderRadius}px`);
	});

	it('should override theme variables with config theme', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style.color).toBe(customThemeColor);
		expect(style['max-width']).toBe(`${customThemeMaxWidth}px`);
	});

	it('should override config theme variables with config styles', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style['border-color']).toBe(customStyleBorderColor);
	});

	it('should override config theme variables with config styles as a function', () => {
		// remove cache from memoize since we changed config
		if (createStyleSheet && createStyleSheet.cache && createStyleSheet.cache.clear) {
			createStyleSheet.cache.clear();
		}
		const styleSheet = createStyleSheet(styles, configWithStylesAsAFunction, testComponentName);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style['border-color']).toBe(customThemeLinkColor);
	});
});
