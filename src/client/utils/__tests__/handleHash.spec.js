import { hasInHash, getHash, getHashAsArray, getParameterByName } from '../handleHash';

describe('handleHash', () => {
	const isolateHash = '#!/';
	const routeHash = '#/';

	it('hasInHash should return true if has #!/', () => {
		const result = hasInHash('#!/FooBar', isolateHash);
		expect(result).toBe(true);
	});

	it('hasInHash should return false if does not have #!/', () => {
		const result = hasInHash('#/FooBar', isolateHash);
		expect(result).toBe(false);
	});

	it('hasInHash should return true if has #/', () => {
		const result = hasInHash('#/FooBar', routeHash);
		expect(result).toBe(true);
	});

	it('hasInHash should return false if does not have #/', () => {
		const result = hasInHash('#!/FooBar', routeHash);
		expect(result).toBe(false);
	});

	it('getHash should return FooBar', () => {
		const result = getHash('#/FooBar', routeHash);
		expect(result).toBe('FooBar');
	});

	it('getHash should return FooBar without params', () => {
		const result = getHash('#/FooBar?id=Example/Perfect', routeHash);
		expect(result).toBe('FooBar');
	});

	it('getHash should return decode value', () => {
		const result = getHash('#!/Api%20%E7%BB%84%E4%BB%B6', isolateHash);
		expect(result).toBe('Api 组件');
	});

	it('getHashAsArray should return array', () => {
		const result = getHashAsArray('#!/FooBar/Component', isolateHash);
		expect(result).toEqual(['FooBar', 'Component']);
	});

	it('getHashAsArray should return array with an encoded component name', () => {
		const result = getHashAsArray('#/Documentation/Files/%40foo%2Fcomponents', routeHash);
		expect(result).toEqual(['Documentation', 'Files', '@foo/components']);
	});

	it('getHashAsArray should return array without params', () => {
		const result = getHashAsArray('#/FooBar/Component?id=Example/Perfect', routeHash);
		expect(result).toEqual(['FooBar', 'Component']);
	});

	it('getParameterByName should return Example when has id param', () => {
		const result = getParameterByName('#/FooBar/Component?id=Example', 'id');
		expect(result).toBe('Example');
	});

	it('getParameterByName should return null when do not has params', () => {
		const result = getParameterByName('#/FooBar/Component', 'id');
		expect(result).toEqual(null);
	});

	it('getParameterByName should return null when do not has id params', () => {
		const result = getParameterByName('#/FooBar/Component?foobar=3', 'id');
		expect(result).toEqual(null);
	});
});
