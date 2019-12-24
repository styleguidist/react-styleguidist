import splitExampleCode from '../splitExampleCode';

describe('splitExampleCode', () => {
	test('basic example', () => {
		const result = splitExampleCode(`var a = 1;
React.createElement('i', null, a);`);
		expect(result).toEqual({
			head: 'var a = 1',
			example: `var a = 1;
return (React.createElement('i', null, a));`,
		});
	});

	test('JSX not only in the last expression', () => {
		const result = splitExampleCode(`function Wrapper(ref) {
	var children = ref.children;
	return React.createElement('div', {id: 'foo'}, children);
}

;React.createElement(Wrapper, null,
	React.createElement(Wrapper, null, React.createElement(Icon, {name: "plus"})),
	React.createElement(Wrapper, null, React.createElement(Icon, {name: "clip"}))
)`);
		expect(result).toEqual({
			example: `function Wrapper(ref) {
	var children = ref.children;
	return React.createElement('div', {id: 'foo'}, children);
}

;
return (React.createElement(Wrapper, null,
	React.createElement(Wrapper, null, React.createElement(Icon, {name: "plus"})),
	React.createElement(Wrapper, null, React.createElement(Icon, {name: "clip"}))
));`,
			head: `function Wrapper(ref) {
	var children = ref.children;
	return React.createElement('div', {id: 'foo'}, children);
}

`,
		});
	});

	test('single expression', () => {
		const result = splitExampleCode('pizza');
		expect(result).toEqual({
			head: '',
			example: `;
return (pizza);`,
		});
	});

	test('empty string', () => {
		const result = splitExampleCode('');
		expect(result).toEqual({
			head: '',
			example: '',
		});
	});

	test('comment', () => {
		const result = splitExampleCode('/* ~ */');
		expect(result).toEqual({
			head: '',
			example: '/* ~ */',
		});
	});

	test('error', () => {
		const result = splitExampleCode('?');
		expect(result).toEqual({
			head: '',
			example: '?',
		});
	});
});
