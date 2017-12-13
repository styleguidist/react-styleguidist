import React from 'react';
import { html } from 'cheerio';
import Markdown from './Markdown';

describe('Markdown', () => {
	it('should render links', () => {
		const markdown = 'a [link](http://test.com)';

		const actual = render(<Markdown text={markdown} />);

		expect(html(actual)).toMatchSnapshot();
	});

	it('should render Markdown with custom CSS classes', () => {
		const markdown = `
# Header

Text with *some* **formatting** and a [link](/foo).

![Image](/bar.png)`;
		const actual = render(<Markdown text={markdown} />);

		expect(html(actual)).toMatchSnapshot();
	});

	it('should render Markdown in a p tag even for one paragraph', () => {
		const actual = render(<Markdown text="pizza" />);

		expect(html(actual)).toMatchSnapshot();
	});

	it('should render Markdown in span in inline mode', () => {
		const markdown = 'Hello *world*!';
		const actual = render(<Markdown text={markdown} inline />);

		expect(html(actual)).toMatchSnapshot();
	});

	it('should render headings correctly', () => {
		const markdown = `
# one
## two
### three
#### four
##### five
###### six
`;
		const actual = render(<Markdown text={markdown} />);

		expect(html(actual)).toMatchSnapshot();
	});

	it('should render unordered lists correctly', () => {
		const markdown = `
* list
* item
* three
`;
		const actual = render(<Markdown text={markdown} />);

		expect(html(actual)).toMatchSnapshot();
	});

	it('should render ordered lists correctly', () => {
		const markdown = `
1. list
1. item
1. three
`;
		const actual = render(<Markdown text={markdown} />);

		expect(html(actual)).toMatchSnapshot();
	});

	it('should render check-lists correctly', () => {
		const markdown = `
* [ ] list 1
* [ ] list 2
* [x] list 3
`;
		const actual = render(<Markdown text={markdown} />);

		expect(html(actual)).toMatchSnapshot();
	});

	it('should render mixed nested lists correctly', () => {
		const markdown = `
* list 1
* list 2
  1. Sub-list
  1. Sub-list
  1. Sub-list
* list 3
`;
		const actual = render(<Markdown text={markdown} />);

		expect(html(actual)).toMatchSnapshot();
	});

	it('should render code blocks without escaping', () => {
		const markdown = `
\`\`\`html
<foo></foo>
\`\`\`
`;
		const actual = render(<Markdown text={markdown} />);

		expect(html(actual)).toMatchSnapshot();
	});

	it('should render inline code with escaping', () => {
		const markdown = 'Foo `<bar>` baz';

		const actual = render(<Markdown text={markdown} />);

		expect(html(actual)).toMatchSnapshot();
	});
});
