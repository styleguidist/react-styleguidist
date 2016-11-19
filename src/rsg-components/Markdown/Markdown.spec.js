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
			<h3 className="h3-1020946680">Header</h3>
			<p className="p-1228578410">
				Text with <em className="em-2315792072">some</em> <strong className="strong-2315792072">
					formatting</strong> and a <a className="a-1274117877" href="/foo">link</a>.
			</p>
			<p className="p-1228578410">
				<img className="img-2315792072" alt="Image" src="/bar.png" />
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
		<span className="base-47030919">
			Hello <em className="em-2315792072">world</em>!
		</span>
	);

	t.is(actual.html(), expected.html());
});
