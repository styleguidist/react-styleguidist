import React from 'react';
import { TabButtonRenderer, styles } from './TabButtonRenderer';

const props = {
	classes: classes(styles),
	onClick: () => {},
};

it('should render a button', () => {
	const actual = shallow(<TabButtonRenderer {...props}>pizza</TabButtonRenderer>);

	expect(actual).toMatchSnapshot();
});

it('should render active styles', () => {
	const actual = shallow(
		<TabButtonRenderer {...props} active>
			pizza
		</TabButtonRenderer>
	);

	expect(actual).toMatchSnapshot();
});

it('should pass a class name to a button', () => {
	const actual = shallow(
		<TabButtonRenderer {...props} onClick={() => {}} className="foo-class">
			pizza
		</TabButtonRenderer>
	);

	expect(actual).toMatchSnapshot();
});
