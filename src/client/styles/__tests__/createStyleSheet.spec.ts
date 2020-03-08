import * as theme from '../theme';
import createStyleSheet from '../createStyleSheet';
import * as Rsg from '../../../typings';

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
		const styleSheet = createStyleSheet(styles, config, testComponentName, '1');
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style['background-color']).toBe(theme.color.baseBackground);
		expect(style['border-radius']).toBe(`${theme.borderRadius}px`);
	});

	it('should override theme variables with config theme', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName, '2');
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style.color).toBe(customThemeColor);
		expect(style['max-width']).toBe(`${customThemeMaxWidth}px`);
	});

	it('should override config theme variables with config styles', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName, '3');
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style['border-color']).toBe(customStyleBorderColor);
	});

	it('should override config theme variables with config styles as a function', () => {
		const styleSheet = createStyleSheet(
			styles,
			configWithStylesAsAFunction,
			testComponentName,
			'4'
		);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style['border-color']).toBe(customThemeLinkColor);
	});
});
