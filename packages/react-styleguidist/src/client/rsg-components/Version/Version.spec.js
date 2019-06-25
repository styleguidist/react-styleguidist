import React from 'react';
import VersionRenderer from './VersionRenderer';

it('renderer should render version', () => {
	const actual = render(<VersionRenderer>1.2.3-a</VersionRenderer>);

	expect(actual).toMatchSnapshot();
});
