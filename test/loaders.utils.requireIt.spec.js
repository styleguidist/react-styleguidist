import test from 'ava';
import requireIt from '../loaders/utils/requireIt';

test('requireIt() should return a require statement', t => {
	const result = requireIt('foo');
	t.is(result, 'require("foo")');
});
