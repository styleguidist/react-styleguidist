import deabsDeep from 'deabsdeep';
import getExamples from '../getExamples';

const file = '../pizza.js';
const displayName = 'Pizza';
const examplesFile = './Pizza.md';
const defaultExample = './Default.md';

test('require an example file if component has example file', () => {
	const result = getExamples(file, displayName, examplesFile);
	expect(deabsDeep(result).require).toMatchInlineSnapshot(
		`"!!~/src/loaders/examples-loader.js?displayName=Pizza&file=.%2F..%2Fpizza.js&shouldShowDefaultExample=false!./Pizza.md"`
	);
});

test('require default example has no example file', () => {
	const result = getExamples(file, displayName, false, defaultExample);
	expect(deabsDeep(result).require).toMatchInlineSnapshot(
		`"!!~/src/loaders/examples-loader.js?displayName=Pizza&file=.%2F..%2Fpizza.js&shouldShowDefaultExample=true!./Default.md"`
	);
});

test('return null if component has no example file or default example', () => {
	const result = getExamples(file, displayName);
	expect(result).toEqual(null);
});
