import getExamples from '../getExamples';

it('getExamples() should return require with examples-loader is component ha example file', () => {
	const examplesFile = __filename;
	const result = getExamples(examplesFile);

	expect(result.includes(examplesFile)).toBe(true);
	expect(result.includes('componentName=')).toBe(false);
});

it('getExamples() should return require with examples-loader is component has examples', () => {
	const examplesFile = 'foo';
	const fallbackName = 'Baz';
	const defaultExample = 'foo.js';
	const result = getExamples(examplesFile, fallbackName, defaultExample);

	expect(result.includes(__filename)).toBe(false);
	expect(result.includes(fallbackName)).toBe(true);
	expect(result.includes(defaultExample)).toBe(true);
	expect(result.includes('componentName=')).toBe(true);
});

it('getExamples() should return null if component has no example file', () => {
	const examplesFile = 'foo';
	const result = getExamples(examplesFile);

	expect(result).toBeNull();
});
