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

const props = {
	classes: classes(styles),
	onThemeChange: () => null,
};

it('should render a theme switcher', () => {
	const actual = shallow(<ThemeSwitcherRenderer {...props} themes={themes} />);

	expect(actual).toMatchSnapshot();
});
