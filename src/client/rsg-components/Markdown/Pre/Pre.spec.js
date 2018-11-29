import React from 'react';

import Pre from './index';

describe('Markdown Pre', () => {
	it('should render a pre', () => {
		const actual = render(<Pre>This is pre-formatted text.</Pre>);

		expect(actual).toMatchSnapshot();
	});

	it('should render highlighted code', () => {
		const code = '<button>OK</button>';
		const actual = render(<Pre className="lang-html">{code}</Pre>);

		expect(actual).toMatchSnapshot();
	});
});
