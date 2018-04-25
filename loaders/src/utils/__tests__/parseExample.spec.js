import parseExample from '../parseExample';

const content = '<h1>Hello Markdown!</h1>';

it('should parse modifiers as JSON', () => {
	const actual = parseExample(content, 'js { "showcode": true }', a => a);
	expect(actual).toEqual({
		lang: 'js',
		settings: { showcode: true },
		content,
	});
});

it('should lowercase JSON keys', () => {
	const actual = parseExample(content, 'js { "showCode": true }', a => a);
	expect(actual).toEqual({
		lang: 'js',
		settings: { showcode: true },
		content,
	});
});

it('should parse modifiers as a space-separated string', () => {
	const actual = parseExample(content, 'jsx showcode static', a => a);
	expect(actual).toEqual({
		lang: 'jsx',
		settings: { showcode: true, static: true },
		content,
	});
});

it('should lowercase modifiers', () => {
	const actual = parseExample(content, 'jsx showCode Static', a => a);
	expect(actual).toEqual({
		lang: 'jsx',
		settings: { showcode: true, static: true },
		content,
	});
});

it('should return settings as an empty object', () => {
	const actual = parseExample(content, 'js', a => a);
	expect(actual).toEqual({
		lang: 'js',
		settings: {},
		content,
	});
});
it('should accept language as null', () => {
	const actual = parseExample(content, null);
	expect(actual).toEqual({
		lang: '',
		settings: {},
		content,
	});
});

it('should apply an update function', () => {
	const actual = parseExample(content, 'js coffee', a => ({ ...a, lang: 'pizza' }));
	expect(actual).toEqual({
		lang: 'pizza',
		settings: { coffee: true },
		content,
	});
});

it('should return an error when JSON is invalid', () => {
	const actual = parseExample(content, 'js { nope }', a => a);
	expect(actual).toEqual({
		error: expect.stringMatching('Cannot parse modifiers'),
	});
});
