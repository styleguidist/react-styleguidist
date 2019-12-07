import { Styles } from 'jss';
import * as theme from '../theme';
import createStyleSheet from '../createStyleSheet';

const customThemeColor = '#123456';
const customThemeBorderColor = '#654321';
const customThemeMaxWidth = 9999;

const customStyleBorderColor = '#ABCDEF';

const testComponentName = 'TestComponentName';
const testRuleName = 'testRule';

// eslint-disable-next-line no-var
var mockCustomTheme: RecursivePartial<Rsg.Theme> = {};
jest.mock('rsg-customTheme', () => ({ default: mockCustomTheme }));

// eslint-disable-next-line no-var
var mockCustomStyles: Styles = {};
jest.mock('rsg-customStyles', () => ({ default: mockCustomStyles }));

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

	it('should override theme variables with config theme when when config theme is a file', () => {
		mockCustomTheme.color = config.theme.color;
		const styleSheet = createStyleSheet(styles, {}, testComponentName);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style.color).toBe(customThemeColor);
		expect(style['max-width']).toBe(`${customThemeMaxWidth}px`);
	});

	it('should override config theme variables with config styles', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style['border-color']).toBe(customStyleBorderColor);
	});

	it('should override normal styles with customized styles object in a file', () => {
		mockCustomStyles[testComponentName] = {
			[testRuleName]: {
				borderColor: customStyleBorderColor,
			},
		};
		const styleSheet = createStyleSheet(styles, {}, testComponentName);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style['border-color']).toBe(customStyleBorderColor);
	});
});
