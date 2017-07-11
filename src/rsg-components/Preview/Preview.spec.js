import React from 'react';
import noop from 'lodash/noop';
import Preview from '../Preview';

const code = '<button>OK</button>';
const options = {
	context: {
		config: {
			compilerConfig: {},
		},
	},
};

it('should unmount Wrapper when Preview unmounts and mountNodeMock is not null', () => {
	const actual = mount(<Preview code={code} evalInContext={() => noop} />, options);
	actual.instance().mountNode = { hi: 1 };
	const ReactDOM = require('react-dom');
	const unmountComponentAtNodeMock = jest.fn();
	ReactDOM.unmountComponentAtNode = unmountComponentAtNodeMock;

	actual.unmount();

	expect(unmountComponentAtNodeMock).toBeCalled();
});

it('should not unmount Wrapper when Preview unmounts and mountNodeMock is null', () => {
	const actual = mount(<Preview code={code} evalInContext={() => noop} />, options);
	actual.instance().mountNode = null;
	const ReactDOM = require('react-dom');
	const unmountComponentAtNodeMock = jest.fn();
	ReactDOM.unmountComponentAtNode = unmountComponentAtNodeMock;

	actual.unmount();

	expect(unmountComponentAtNodeMock).not.toBeCalled();
});

it('should render component renderer', () => {
	const actual = shallow(<Preview code={code} evalInContext={noop} />, options);

	expect(actual).toMatchSnapshot();
});
