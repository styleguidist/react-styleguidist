import React from 'react';
import renderer from 'react-test-renderer';
import VersionRenderer from './VersionRenderer';

it('renderer should render version', () => {
	const actual = renderer.create(<VersionRenderer>1.2.3-a</VersionRenderer>);

	expect(actual.toJSON()).toMatchSnapshot();
});
