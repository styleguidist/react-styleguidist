import remark from 'remark';
import noAutoLink from '../noAutoLinkRemarkPlugin';

const transform = (markdown: string) => remark().use(noAutoLink).processSync(markdown).toString();

it('should not convert URLs to auto links', () => {
	const markdown = 'http://example.com';
	const result = transform(markdown);
	expect(result.trim()).toBe('http://example.com');
});

it('should keep full links as is', () => {
	const markdown = '[Pizza](http://example.com)';
	const result = transform(markdown);
	expect(result.trim()).toBe(markdown);
});
