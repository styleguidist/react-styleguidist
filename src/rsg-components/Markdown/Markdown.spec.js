import test from 'ava';
import React from 'react';
import Markdown from './Markdown';

test('should render Markdown with custom CSS classes', t => {
	const markdown = `
# Header

Text with *some* **formatting** and a [link](/foo).

![Image](/bar.png)`;
	const actual = render(
		<Markdown text={markdown} />
	);
	const expected = render(
		<div>
			<h3 className="Test__h3 Test__font">Header</h3>
			<p className="Test__p Test__font">
				Text with <em className="Test__em">some</em> <strong className="Test__strong">
				formatting</strong> and a <a className="Test__a Test__link" href="/foo">link</a>.
			</p>
			<p className="Test__p Test__font">
				<img className="Test__img" alt="Image" src="/bar.png" />
			</p>
		</div>
	);

	t.is(actual.html(), expected.html());
});

test('should render Markdown in span in inline mode', t => {
	const markdown = 'Hello *world*!';
	const actual = render(
		<Markdown text={markdown} inline />
	);
	const expected = render(
		<span className="Test__base Test__font">
			Hello <em className="Test__em">world</em>!
		</span>
	);

	t.is(actual.html(), expected.html());
});
