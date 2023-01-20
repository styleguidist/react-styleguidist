import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import Wrapper from './Wrapper';

it('should render children', () => {
	const children = <span>Hello</span>;
	const renderer = createRenderer();
	renderer.render(<Wrapper onError={() => {}}>{children}</Wrapper>);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should call onError handler when React invokes error handler', () => {
	const onError = jest.fn();
	const renderer = createRenderer();
	renderer.render(<Wrapper onError={onError}>blah</Wrapper>);

	// faux error
	const err = new Error('err');
	const inst = renderer.getMountedInstance() as Wrapper;
	if (inst && inst.componentDidCatch) {
		inst.componentDidCatch(err);
	}

	expect(onError).toHaveBeenCalledTimes(1);
	expect(onError).toHaveBeenCalledWith(err);
});
