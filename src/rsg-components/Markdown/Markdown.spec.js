import test from 'ava';
import React from 'react';
import Markdown from './Markdown';

test('should render Markdown with custom CSS classes', t => {
	const markdown = `
# Header

Text with *some* **formatting** and a [link](/foo).

![Image](/bar.png)
	`;
	const actual = render(
		<Markdown text={markdown} />
	);
	const expected = render(
		<span className="Test__root Test__font">
			<h3 className="Test__h3">Header</h3>
			<p className="Test__p">
				Text with <em className="Test__em">some</em> <strong className="Test__strong">
				formatting</strong> and a <a href="/foo" className="Test__a Test__link">link</a>.
			</p>
			<p className="Test__p">
				<img alt="Image" src="/bar.png" className="Test__img" />
			</p>
		</span>
	);

	t.is(actual.html(), expected.html());
});
