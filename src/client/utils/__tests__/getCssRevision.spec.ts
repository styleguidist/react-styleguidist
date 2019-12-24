import getCssRevision from '../getCssRevision';

describe('getCssRevision', () => {
	it('should return different revisions with different config', () => {
		const config1 = { theme: { color: { link: 'bar' } }, styles: { foo: 'hello' } };
		const config2 = { theme: { color: { link: 'baz' } }, styles: { foo: 'hello' } };
		expect(getCssRevision(config1)).not.toEqual(getCssRevision(config2));
	});
});
