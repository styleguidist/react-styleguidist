import getUrl from '../getUrl';

describe('getUrl', () => {
	const loc = {
		origin: 'http://example.com',
		pathname: '/styleguide/',
		hash: '#/Components',
	};
	const locHashedURL = {
		origin: 'http://example.com',
		pathname: '/styleguide/',
		hash: '#button',
	};
	const name = 'FooBar';
	const slug = 'foobar';

	it('should return a home URL', () => {
		const result = getUrl({}, loc);
		expect(result).toBe('/styleguide/');
	});

	it('should return an absolute home URL', () => {
		const result = getUrl({ absolute: true }, loc);
		expect(result).toBe('http://example.com/styleguide/');
	});

	it('should return an anchor URL', () => {
		const result = getUrl({ name, slug, anchor: true }, loc);
		expect(result).toBe('/styleguide/#foobar');
	});

	it('should return an absolute anchor URL', () => {
		const result = getUrl({ name, slug, anchor: true, absolute: true }, loc);
		expect(result).toBe('http://example.com/styleguide/#foobar');
	});

	it('should return an isolated URL', () => {
		const result = getUrl({ name, slug, isolated: true }, loc);
		expect(result).toBe('/styleguide/#!/Components/FooBar');
	});

	it('should return an absolute isolated URL', () => {
		const result = getUrl({ name, slug, isolated: true, absolute: true }, loc);
		expect(result).toBe('http://example.com/styleguide/#!/Components/FooBar');
	});

	it('should return an isolated example URL', () => {
		const result = getUrl({ name, slug, example: 3, isolated: true }, loc);
		expect(result).toBe('/styleguide/#!/Components/FooBar/3');
	});

	it('should return an isolated example for a HashedURL', () => {
		const result = getUrl({ name, slug, example: 0, isolated: true }, locHashedURL);
		expect(result).toBe('/styleguide/#!/FooBar/0');
	});

	it('should return an isolated example=0 URL', () => {
		const result = getUrl({ name, slug, example: 0, isolated: true }, loc);
		expect(result).toBe('/styleguide/#!/Components/FooBar/0');
	});

	it('should return an absolute isolated example URL', () => {
		const result = getUrl({ name, slug, example: 3, isolated: true, absolute: true }, loc);
		expect(result).toBe('http://example.com/styleguide/#!/Components/FooBar/3');
	});

	it('should return a nochrome URL', () => {
		const result = getUrl({ name, slug, nochrome: true }, loc);
		expect(result).toBe('/styleguide/?nochrome#!/Components/FooBar');
	});

	it('should return an absolute nochrome URL', () => {
		const result = getUrl({ name, slug, nochrome: true, absolute: true }, loc);
		expect(result).toBe('http://example.com/styleguide/?nochrome#!/Components/FooBar');
	});

	it('should return a route path', () => {
		const result = getUrl({ name, slug, hashPath: ['Documentation'] }, loc);
		expect(result).toBe('/styleguide/#/Documentation/FooBar');
	});

	it('should return a route path with encoded name if name has inappropriate symbols', () => {
		const result = getUrl({ name: '@foo/components', slug, hashPath: ['Documentation'] }, loc);
		expect(result).toBe('/styleguide/#/Documentation/%40foo%2Fcomponents');
	});

	it('should return a route path with encoded name if sections (hashPath) has inappropriate symbols', () => {
		expect(
			getUrl({ name: '@foo/components', slug, hashPath: ['@foo/bar-documentation'] }, loc)
		).toBe('/styleguide/#/%40foo%2Fbar-documentation/%40foo%2Fcomponents');

		expect(
			getUrl(
				{
					name: '@foo/components',
					slug,
					hashPath: ['@foo/bar-documentation', '@foo/bar-activations-section'],
				},
				loc
			)
		).toBe(
			'/styleguide/#/%40foo%2Fbar-documentation/%40foo%2Fbar-activations-section/%40foo%2Fcomponents'
		);
	});

	it('should return a route path with a param id=foobar', () => {
		const result = getUrl({ name, slug, hashPath: ['Documentation'], useSlugAsIdParam: true }, loc);
		expect(result).toBe('/styleguide/#/Documentation?id=foobar');
	});

	it('should return a param id=foobar', () => {
		const result = getUrl({ name, slug, takeHash: true, useSlugAsIdParam: true }, loc);
		expect(result).toBe('/styleguide/#/Components?id=foobar');
	});

	it('should return to param id = foobar even if the hash has parameters', () => {
		const result = getUrl(
			{ name, slug, takeHash: true, useSlugAsIdParam: true },
			{
				...loc,
				hash: '#/Components?foo=foobar',
			}
		);
		expect(result).toBe('/styleguide/#/Components?id=foobar');
	});
});
