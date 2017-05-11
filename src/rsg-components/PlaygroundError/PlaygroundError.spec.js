import React from 'react';
import { PlaygroundErrorRenderer } from './PlaygroundErrorRenderer';

it('renderer should render message', () => {
	const message = 'Hello *world*!';
	const actual = shallow(<PlaygroundErrorRenderer classes={{}} message={message} />);

	expect(actual).toMatchSnapshot();
});
