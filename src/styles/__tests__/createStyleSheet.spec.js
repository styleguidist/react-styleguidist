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

		expect(style.backgroundColor).toBe(theme.color.baseBackground);
		expect(style.borderRadius).toBe(theme.borderRadius);
	});

	it('should override theme variables with config theme', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName);
		const style = styleSheet.getRule(testRuleName).style;

		expect(style.color).toBe(customThemeColor);
		expect(style.maxWidth).toBe(customThemeMaxWidth);
	});

	it('should override config theme variables with config styles', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName);
		const style = styleSheet.getRule(testRuleName).style;

		expect(style.borderColor).toBe(customStyleBorderColor);
	});
});
