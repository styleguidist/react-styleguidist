import vm from 'vm';
import path from 'path';
import getSectionsCode, { processSection } from '../getSectionsCode';

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
	configDir: __dirname,
	getExampleFilename: componentpath => path.join(path.dirname(componentpath), 'Readme.md'),
	getComponentPathLine: componentpath => componentpath,
};

const removeDirname = string => string.replace(new RegExp(__dirname, 'g'), '.');

it('processSection() should return valid JS for section with content', () => {
	const result = processSection(sections[0], config);

	expect(new vm.Script(`a=${result}`)).not.toThrowError(SyntaxError);
	expect(removeDirname(result)).toMatchSnapshot();
});

it('processSection() should return valid JS for section with components', () => {
	const result = processSection(sections[1], config);

	expect(new vm.Script(`a=${result}`)).not.toThrowError(SyntaxError);
	expect(removeDirname(result)).toMatchSnapshot();
});

it('getSectionsCode() should return null if there is no sections', () => {
	const result = getSectionsCode();

	expect(result).toBeNull();
});

it('getSectionsCode() should return valid JS', () => {
	const result = getSectionsCode(sections, config);

	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
	expect(removeDirname(result)).toMatchSnapshot();
});
