import keysToLowerCaseDeep from '../keysToLowerCaseDeep';

it('should convert object keys to lower case', () => {
	const object = { Foo: { pIZZA: 'salami' }, BAZ: 42 };
	const actual = keysToLowerCaseDeep(object);
	expect(actual).toEqual({ foo: { pizza: 'salami' }, baz: 42 });
});
