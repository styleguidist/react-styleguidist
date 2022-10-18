import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import copy from 'clipboard-copy';
import { createRenderer } from 'react-test-renderer/shallow';
import { PathlineRenderer, styles } from './PathlineRenderer';

jest.mock('clipboard-copy');

const pathline = 'foo/bar';
const props = {
	classes: classes(styles),
};

it('renderer should a path line', () => {
	const renderer = createRenderer();
	renderer.render(<PathlineRenderer {...props}>{pathline}</PathlineRenderer>);
	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should copy text on click', () => {
	const { getByRole } = render(<PathlineRenderer {...props}>{pathline}</PathlineRenderer>);
	fireEvent.click(getByRole('button'));
	expect(copy).toBeCalledWith(pathline);
});
