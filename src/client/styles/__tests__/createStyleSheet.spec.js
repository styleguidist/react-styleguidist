import * as theme from '../theme';
import createStyleSheet from '../createStyleSheet';

const customThemeColor = '#123456';
const customThemeBorderColor = '#654321';
const customThemeMaxWidth = 9999;

const customStyleBorderColor = '#ABCDEF';

const testComponentName = 'TestComponentName';
const testRuleName = 'testRule';

const styles = theme => ({
	[testRuleName]: {
		color: theme.color.base,
		backgroundColor: theme.color.baseBackground,
		borderColor: theme.color.border,
		borderRadius: theme.borderRadius,
		maxWidth: theme.maxWidth,
	},
});

describe('createStyleSheet', () => {
	describe('when a no theme is configured', () => {
		const currentTheme = 'no theme';
		const config = {};

		it('should use theme variables', () => {
			const styleSheet = createStyleSheet(currentTheme, testComponentName, styles, config);
			const style = styleSheet.getRule(testRuleName).style;

			expect(style['background-color']).toBe(theme.color.baseBackground);
			expect(style['border-radius']).toBe(`${theme.borderRadius}px`);
		});
	});

	describe('when a single theme is configured', () => {
		const currentTheme = 'single theme';
		const config = {
			theme: {
				color: {
					base: customThemeColor,
					border: customThemeBorderColor,
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

		it('should override theme variables with config theme', () => {
			const styleSheet = createStyleSheet(currentTheme, testComponentName, styles, config);
			const style = styleSheet.getRule(testRuleName).style;

			expect(style.color).toBe(customThemeColor);
			expect(style['max-width']).toBe(`${customThemeMaxWidth}px`);
		});

		it('should override config theme variables with config styles', () => {
			const styleSheet = createStyleSheet(currentTheme, testComponentName, styles, config);
			const style = styleSheet.getRule(testRuleName).style;

			expect(style['border-color']).toBe(customStyleBorderColor);
		});
	});

	describe('when multiple themes are configured', () => {
		const currentTheme = 'dark';
		const config = {
			themes: [
				{
					id: 'dark',
					styles: {
						color: {
							base: customThemeColor,
							border: customThemeBorderColor,
						},
						maxWidth: customThemeMaxWidth,
					},
				},
			],
			styles: {
				[testComponentName]: {
					[testRuleName]: {
						borderColor: customStyleBorderColor,
					},
				},
			},
		};

		it('should override theme variables with config theme', () => {
			const styleSheet = createStyleSheet(currentTheme, testComponentName, styles, config);
			const style = styleSheet.getRule(testRuleName).style;

			expect(style.color).toBe(customThemeColor);
			expect(style['max-width']).toBe(`${customThemeMaxWidth}px`);
		});

		it('should override config theme variables with config styles', () => {
			const styleSheet = createStyleSheet(currentTheme, testComponentName, styles, config);
			const style = styleSheet.getRule(testRuleName).style;

			expect(style['border-color']).toBe(customStyleBorderColor);
		});
	});
});
