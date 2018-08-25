import React from 'react';
import { ArgumentRenderer, styles } from './ArgumentRenderer';

const name = 'Foo';
const type = { name: 'Array' };
const description = 'Converts foo to bar';
const props = {
	classes: classes(styles),
};

it('should render argument', () => {
	const actual = shallow(
		<ArgumentRenderer {...props} name={name} type={type} description={description} />
	);

	expect(actual).toMatchSnapshot();
});

it('should render argument without type', () => {
	const actual = shallow(<ArgumentRenderer {...props} name={name} description={description} />);

	expect(actual).toMatchSnapshot();
});

it('should render argument without description', () => {
	const actual = shallow(<ArgumentRenderer {...props} name={name} type={type} />);

	expect(actual).toMatchSnapshot();
});

it('should render return value', () => {
	const actual = shallow(
		<ArgumentRenderer {...props} type={type} description={description} returns />
	);

	expect(actual).toMatchSnapshot();
});

it('should render with block styles', () => {
	const actual = shallow(<ArgumentRenderer {...props} block />);

	expect(actual).toMatchSnapshot();
});
