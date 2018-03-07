import React from 'react';
import Ribbon from './Ribbon';
import { RibbonRenderer, styles } from './RibbonRenderer';

const props = {
	classes: classes(styles),
};

describe('Ribbon', () => {
	it('should render ribbon if the ribbon is present in the config', () => {
		const actual = shallow(<Ribbon />, { context: { config: { ribbon: { url: 'foo.bar' } } } });

		expect(actual).toMatchSnapshot();
	});

	it('should return null if the ribbon is not present in the config', () => {
		const actual = shallow(<Ribbon />, { context: { config: {} } });

		expect(actual.type()).toBeNull();
	});
});
describe('RibbonRenderer', () => {
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
});
