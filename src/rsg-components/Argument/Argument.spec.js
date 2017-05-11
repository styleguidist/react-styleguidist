import React from 'react';
import { ArgumentRenderer } from './ArgumentRenderer';

const name = 'Foo';
const type = { name: 'Array' };
const description = 'Converts foo to bar';

it('renderer should render argument', () => {
	const actual = shallow(
		<ArgumentRenderer classes={{}} name={name} type={type} description={description} />
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should render argument without type', () => {
	const actual = shallow(<ArgumentRenderer classes={{}} name={name} description={description} />);

	expect(actual).toMatchSnapshot();
});

it('renderer should render argument without description', () => {
	const actual = shallow(<ArgumentRenderer classes={{}} name={name} type={type} />);

	expect(actual).toMatchSnapshot();
});

it('renderer should render return value', () => {
	const actual = shallow(
		<ArgumentRenderer classes={{}} type={type} description={description} returns />
	);

	expect(actual).toMatchSnapshot();
});
