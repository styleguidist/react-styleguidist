import requireIt from '../loaders/utils/requireIt';

it('requireIt() should return a require statement', () => {
	const result = requireIt('foo');
	expect(result).toBe('require("foo")');
});
