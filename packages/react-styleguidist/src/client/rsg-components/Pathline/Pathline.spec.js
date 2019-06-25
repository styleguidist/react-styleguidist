import React from 'react';
import copy from 'clipboard-copy';
import { PathlineRenderer, styles } from './PathlineRenderer';

jest.mock('clipboard-copy');

const pathline = 'foo/bar';
const props = {
	classes: classes(styles),
};

it('renderer should a path line', () => {
	const actual = shallow(<PathlineRenderer {...props}>{pathline}</PathlineRenderer>);
	expect(actual).toMatchSnapshot();
});

test('should copy text on click', () => {
	const actual = mount(<PathlineRenderer {...props}>{pathline}</PathlineRenderer>);
	actual.find('button').simulate('click');
	expect(copy).toBeCalledWith(pathline);
});
