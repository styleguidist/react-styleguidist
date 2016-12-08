import serialize from '../serialize';

it('serialize() should convert JavaScript object to string', () => {
	const result = serialize({
		baz: 42,
		foo1: 'bar',
		foo2: 'bar',
	}, key => key === 'foo1');
	expect(result).toBe(`
{
  "baz": 42,
  "foo1": bar,
  "foo2": "bar"
}
	`.trim());
});
