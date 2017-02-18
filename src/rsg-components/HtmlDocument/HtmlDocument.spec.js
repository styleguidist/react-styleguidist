import React from 'react';
import Document from './HtmlDocumentRenderer';

it('should render children', () => {
	const actual = render(
		<Document title="Test document">
			<span>Hello</span>
		</Document>
	);

	expect(actual).toMatchSnapshot();
});

it('should include assets in head', () => {
	const actual = shallow(
		<Document
			title="Test document"
			assets={{ main: '/main.js' }}
		>
			<span>Hello</span>
		</Document>
	);

	expect(actual.prop('scripts')).toContain('/main.js');
});

it('should not include server assets', () => {
	const actual = shallow(
		<Document
			title="Test document"
			assets={{ main: 'build/main.js', server: 'build/server.js' }}
		>
			<span>Hello</span>
		</Document>
	);

	expect(actual.prop('scripts')).not.toContain('server');
});
