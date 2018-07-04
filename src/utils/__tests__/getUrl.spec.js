import getUrl from '../getUrl';

describe('getUrl', () => {
	const loc = {
		origin: 'http://example.com',
		pathname: '/styleguide/',
		hash: '#/Components',
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
		expect(result).toBe('/styleguide/#!/FooBar');
	});

	it('should return an absolute isolated URL', () => {
		const result = getUrl({ name, slug, isolated: true, absolute: true }, loc);
		expect(result).toBe('http://example.com/styleguide/#!/FooBar');
	});

	it('should return an isolated example URL', () => {
		const result = getUrl({ name, slug, example: 3, isolated: true }, loc);
		expect(result).toBe('/styleguide/#!/FooBar/3');
	});

	it('should return an isolated example=0 URL', () => {
		const result = getUrl({ name, slug, example: 0, isolated: true }, loc);
		expect(result).toBe('/styleguide/#!/FooBar/0');
	});

	it('should return an absolute isolated example URL', () => {
		const result = getUrl({ name, slug, example: 3, isolated: true, absolute: true }, loc);
		expect(result).toBe('http://example.com/styleguide/#!/FooBar/3');
	});

	it('should return a nochrome URL', () => {
		const result = getUrl({ name, slug, nochrome: true }, loc);
		expect(result).toBe('/styleguide/?nochrome#!/FooBar');
	});

	it('should return an absolute nochrome URL', () => {
		const result = getUrl({ name, slug, nochrome: true, absolute: true }, loc);
		expect(result).toBe('http://example.com/styleguide/?nochrome#!/FooBar');
	});

	it('should return a route path', () => {
		const result = getUrl({ name, slug, hashPath: ['Documentation'] }, loc);
		expect(result).toBe('/styleguide/#/Documentation/FooBar');
	});

	it('should return a route path with a param id=foobar', () => {
		const result = getUrl({ name, slug, hashPath: ['Documentation'], id: true }, loc);
		expect(result).toBe('/styleguide/#/Documentation?id=foobar');
	});

	it('should return a param id=foobar', () => {
		const result = getUrl({ name, slug, takeHash: true, id: true }, loc);
		expect(result).toBe('/styleguide/#/Components?id=foobar');
	});

	it('should return to param id = foobar even if the hash has parameters', () => {
		const result = getUrl(
			{ name, slug, takeHash: true, id: true },
			{
				...loc,
				hash: '#/Components?foo=foobar',
			}
		);
		expect(result).toBe('/styleguide/#/Components?id=foobar');
	});
});
