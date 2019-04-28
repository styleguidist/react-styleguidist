import { transparentize, modularScale } from 'polished';

const scale = (value: number) => modularScale(value, '1rem', 'majorThird');

const fontSizes = {
	xxxl: scale(5),
	xxl: scale(4),
	xl: scale(3),
	l: scale(1),
	m: scale(0),
	s: scale(-0.5),
	xs: scale(-0.75),
};

const theme = {
	fonts: {
		base: 'Helvetica Neue, Helvetica, Arial, sans-serif',
		heading: 'Helvetica Neue, Helvetica, Arial, sans-serif',
	},
	fontSizes: {
		base: fontSizes.m,
		...fontSizes,
	},
	fontWeights: {
		normal: 400,
		bold: 700,
	},
	headingFontWeights: {
		xxxl: 400,
		xxl: 400,
		xl: 400,
		l: 400,
		m: 700,
	},
	lineHeights: {
		base: 1.5,
		heading: 1.1,
	},
	colors: {
		bg: '#fff',
		base: '#333',
		primary: '#8667a8',
		secondary: '#767676',
		light: '#ccc',
		lighter: '#efefef',
		hover: '#ed9dc5',
		focus: transparentize(0.4, '#ed9dc5'),
		error: '#d0453e',
		rating: '#f8c124',
	},
	borders: {
		none: 'none',
		thin: '1px solid',
	},
	radii: {
		base: '0.15em',
	},
	space: [
		0,
		'0.125rem', // 2px
		'0.25rem', // 4px
		'0.5rem', // 8px
		'1rem', // 16px
		'2rem', // 32px
		'4rem', // 64px
		'8rem', // 128px
		'16rem', // 256px
		'32rem', // 512px
	],
};

export default theme;

export const inverted = {
	...theme,
	colors: {
		...theme.colors,
		bg: theme.colors.base,
		base: theme.colors.bg,
		primary: theme.colors.bg,
		focus: transparentize(0.1, theme.colors.hover),
		secondary: '#ccc',
	},
};
