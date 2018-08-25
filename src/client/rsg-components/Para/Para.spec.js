import React from 'react';
import { ParaRenderer, styles } from './ParaRenderer';

const props = {
	classes: classes(styles),
};

it('should render paragraph as a <div>', () => {
	const actual = shallow(<ParaRenderer {...props}>Pizza</ParaRenderer>);

	expect(actual).toMatchSnapshot();
});

it('should render paragraph as a <p>', () => {
	const actual = shallow(
		<ParaRenderer {...props} semantic="p">
			Pizza
		</ParaRenderer>
	);

	expect(actual).toMatchSnapshot();
});
