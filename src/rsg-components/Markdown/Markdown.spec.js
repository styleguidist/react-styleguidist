import React from 'react';
import Markdown from './Markdown';

it('should render Markdown with custom CSS classes', () => {
	const markdown = `
# Header

Text with *some* **formatting** and a [link](/foo).

![Image](/bar.png)`;
	const actual = render(
		<Markdown text={markdown} />
	);

	expect(actual.html()).toMatchSnapshot();
});

it('should render Markdown in span in inline mode', () => {
	const markdown = 'Hello *world*!';
	const actual = render(
		<Markdown text={markdown} inline />
	);

	expect(actual.html()).toMatchSnapshot();
});
