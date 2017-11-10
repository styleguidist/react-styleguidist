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

describe('createStyleSheet', () => {
	it('should use theme variables', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName);
		const style = styleSheet.getRule(testRuleName).style;

		expect(style['background-color']).toBe(theme.color.baseBackground);
		expect(style['border-radius']).toBe(`${theme.borderRadius}px`);
	});

	it('should override theme variables with config theme', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName);
		const style = styleSheet.getRule(testRuleName).style;

		expect(style.color).toBe(customThemeColor);
		expect(style['max-width']).toBe(`${customThemeMaxWidth}px`);
	});

	it('should override config theme variables with config styles', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName);
		const style = styleSheet.getRule(testRuleName).style;

		expect(style['border-color']).toBe(customStyleBorderColor);
	});
});
