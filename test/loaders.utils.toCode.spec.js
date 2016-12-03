import toCode from '../loaders/utils/toCode';

it('toCode() should convert JavaScript object to string', () => {
	const result = toCode({
		num: 42,
		drink: JSON.stringify('coffee'),
		js(n) {
			return n * n;
		},
	});
	expect(result).toMatchSnapshot();
});

it('toCode() should convert JavaScript array to string', () => {
	const result = toCode([
		42,
		JSON.stringify('coffee'),
		function(n) {
			return n * n;
		},
	]);
	expect(result).toMatchSnapshot();
});
