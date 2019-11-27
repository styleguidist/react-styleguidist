import remark from 'remark';
import noAutoLink from '../noAutoLinkRemarkPlugin';

const transform = (markdown: string) =>
	remark()
		.use(noAutoLink)
		.processSync(markdown)
		.toString();

it('should convert URLs to auto links', () => {
	const markdown = 'http://example.com';
	const result = transform(markdown);
	expect(result.trim()).toBe('[http://example.com](http://example.com "http&#x3A;//example.com")');
});

it('should keep full links as is', () => {
	const markdown = '[Pizza](http://example.com)';
	const result = transform(markdown);
	expect(result.trim()).toBe(markdown);
});
