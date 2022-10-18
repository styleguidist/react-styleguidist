import React from 'react';
import renderer from 'react-test-renderer';

import Pre from './index';

describe('Markdown Pre', () => {
	it('should render a pre', () => {
		const actual = renderer.create(<Pre>This is pre-formatted text.</Pre>);

		expect(actual.toJSON()).toMatchSnapshot();
	});

	it('should render highlighted code', () => {
		const code = '<button>OK</button>';
		const actual = renderer.create(<Pre className="lang-html">{code}</Pre>);

		expect(actual.toJSON()).toMatchSnapshot();
	});
});
