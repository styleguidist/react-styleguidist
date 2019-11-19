import React from 'react';
import { ThemeSwitcherRenderer, styles } from './ThemeSwitcherRenderer';

const themes = [
	{
		id: 'dark',
	},
	{
		id: 'light',
	},
];

const currentTheme = 'light';

const props = {
	classes: classes(styles),
	onThemeChange: () => null,
};

describe('ThemeSwitcher', () => {
	it('should render current theme', () => {
		const actual = shallow(
			<ThemeSwitcherRenderer {...props} themes={themes} currentTheme={currentTheme} />
		);

		expect(actual).toMatchSnapshot();
	});
});
