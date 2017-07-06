import React from 'react';
import { LogoRenderer } from './LogoRenderer';

it('renderer should render header', () => {
	const children = '<button>OK</button>';
	const actual = shallow(
		<LogoRenderer classes={{}}>
			{children}
		</LogoRenderer>
	);

	expect(actual).toMatchSnapshot();
});
