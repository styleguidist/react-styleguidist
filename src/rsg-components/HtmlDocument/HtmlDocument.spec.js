import React from 'react';
import HtmlDocument from './HtmlDocument';
import Renderer from './HtmlDocumentRenderer';

describe('HtmlDocument', () => {
	it('should include assets', () => {
		const actual = shallow(
			<HtmlDocument
				title="Test document"
				assets={{ main: '/main.js' }}
			>
				<span>Hello</span>
			</HtmlDocument>
		);

		expect(actual.prop('scripts')).toContain('/main.js');
	});

	it('should not include server assets', () => {
		const actual = shallow(
			<HtmlDocument
				title="Test document"
				assets={{ main: 'build/main.js', server: 'build/server.js' }}
			>
				<span>Hello</span>
			</HtmlDocument>
		);

		expect(actual.prop('scripts')).not.toContain('server');
	});
});

describe('HtmlDocumentRenderer', () => {
	it('should render children', () => {
		const actual = render(
			<Renderer title="Test document">
				<span>Hello</span>
			</Renderer>
		);

		expect(actual).toMatchSnapshot();
	});
});
