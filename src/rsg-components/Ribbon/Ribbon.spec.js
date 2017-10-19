import React from 'react';
import { RibbonRenderer, styles } from './RibbonRenderer';

const props = {
	classes: classes(styles),
};

it('should render ribbon with url', () => {
	const actual = shallow(<RibbonRenderer {...props} url="http://example.com" />);

	expect(actual).toMatchSnapshot();
});

it('should render ribbon with a text', () => {
	const actual = shallow(
		<RibbonRenderer {...props} url="http://example.com" text="Share the repo" />
	);

	expect(actual).toMatchSnapshot();
});

it('should render ribbon with custom background and color', () => {
	const actual = shallow(
		<RibbonRenderer
			{...props}
			url="http://example.com"
			text="Share the repo"
			background="#cdcdcd"
			color="#aa00bb"
		/>
	);

	expect(actual).toMatchSnapshot();
});
