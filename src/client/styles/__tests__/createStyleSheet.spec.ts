import { Styles } from 'jss';
import * as theme from '../theme';
import createStyleSheet from '../createStyleSheet';

// eslint-disable-next-line no-var
var mockCustomTheme: RecursivePartial<Rsg.Theme>;
jest.mock('rsg-customTheme', () => {
	mockCustomTheme = {};
	return mockCustomTheme;
});

// eslint-disable-next-line no-var
var mockCustomStyles: Styles;
jest.mock('rsg-customStyles', () => {
	mockCustomStyles = {};
	return mockCustomStyles;
});

const customThemeColor = '#123456';
const customThemeColorFromFile = '#111111';
const customThemeBorderColor = '#654321';
const customThemeMaxWidth = 9999;

const customStyleBorderColor = '#ABCDEF';
const customStyleBorderColorInFile = '#FEDCBA';

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

const config = ({
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
} as any) as Rsg.ProcessedStyleguidistConfig;

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
	beforeEach(() => {
		(createStyleSheet as any).cache.clear();
		mockCustomTheme.color = undefined;
		mockCustomStyles[testComponentName] = undefined;
	});

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
		mockCustomTheme.color = { base: customThemeColorFromFile };
		const styleSheet = createStyleSheet(
			styles,
			{ theme: 'path/to/theme' } as any,
			testComponentName
		);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style.color).toBe(customThemeColorFromFile);
	});

	it('should override config theme variables with config styles', () => {
		const styleSheet = createStyleSheet(styles, config, testComponentName);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style['border-color']).toBe(customStyleBorderColor);
	});

	it('should override normal styles with customized styles object in a file', () => {
		mockCustomStyles[testComponentName] = {
			[testRuleName]: {
				borderColor: customStyleBorderColorInFile,
			},
		};
		const styleSheet = createStyleSheet(
			styles,
			{ styles: 'path/to/styles' } as any,
			testComponentName
		);
		const style = (styleSheet.getRule(testRuleName) as any).style;

		expect(style['border-color']).toBe(customStyleBorderColorInFile);
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
