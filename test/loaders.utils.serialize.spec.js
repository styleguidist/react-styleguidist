import test from 'ava';
import serialize from '../loaders/utils/serialize';

test('serialize() should convert JavaScript array to string', t => {
	const result = serialize({
		baz: 42,
		foo1: 'bar',
		foo2: 'bar',
	}, key => key === 'foo1');
	t.is(result, `
{
  "baz": 42,
  "foo1": bar,
  "foo2": "bar"
}
	`.trim());
});
