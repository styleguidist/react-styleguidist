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

it('should unmount Wrapper when Preview unmounts', () => {
	const actual = mount(<Preview code={code} evalInContext={() => noop} />, options);
	const ReactDOM = require('react-dom');
	const unmountComponentAtNodeMock = jest.fn();
	ReactDOM.unmountComponentAtNode = unmountComponentAtNodeMock;

	actual.unmount();

	expect(unmountComponentAtNodeMock).toBeCalled();
});

it('should render component renderer', () => {
	const actual = shallow(<Preview code={code} evalInContext={noop} />, options);

	expect(actual).toMatchSnapshot();
});
