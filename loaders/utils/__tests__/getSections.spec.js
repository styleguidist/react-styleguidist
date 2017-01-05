import path from 'path';
import getSections, { processSection } from '../getSections';

jest.mock('../requireIt');

const configDir = path.resolve(__dirname, '../../../test');
const sections = [
	{
		name: 'Readme',
		content: 'Readme.md',
	},
	{
		name: 'Components',
		components: 'components/**/[A-Z]*.js',
	},
];
const config = {
	configDir,
	getExampleFilename: a => a,
	getComponentPathLine: a => a,
};

it('processSection() should return an object for section with content', () => {
	const result = processSection(sections[0], config);

	expect(result).toMatchSnapshot();
});

it('processSection() should return an object for section with components', () => {
	const result = processSection(sections[1], config);

	expect(result).toMatchSnapshot();
});

it('getSections() should return null if there is no sections', () => {
	const result = getSections();

	expect(result).toBeNull();
});

it('getSections() should return an object', () => {
	const result = getSections(sections, config);

	expect(result).toMatchSnapshot();
});
