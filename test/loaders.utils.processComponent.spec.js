import vm from 'vm';
import path from 'path';
import processComponent from '../loaders/utils/processComponent';

const config = {
	configDir: __dirname,
	getExampleFilename: componentpath => path.join(path.dirname(componentpath), 'Readme.md'),
	getComponentPathLine: componentpath => componentpath,
};

it('processComponent() should return valid JS for section with content', () => {
	const result = processComponent('pizza.js', config);

	expect(new vm.Script(`a=${result}`)).not.toThrowError(SyntaxError);
	expect(result).toMatchSnapshot();
});
