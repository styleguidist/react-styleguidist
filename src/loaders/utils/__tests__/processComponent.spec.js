import path from 'path';
import processComponent from '../processComponent';

const config = {
	configDir: __dirname,
	getExampleFilename: componentpath => path.join(path.dirname(componentpath), 'Readme.md'),
	getComponentPathLine: componentpath => componentpath,
};

it('processComponent() should return an object for section with content', () => {
	const result = processComponent('pizza.js', config);

	expect(result).toMatchSnapshot();
});

it('processComponent() should return an object for section with content', () => {
	const result = processComponent('test/components/Button/Button.js', config);

	expect(result).toMatchSnapshot();
});

it('processComponent() should return an object with for section with content and metadata in markdown', () => {
	const result = processComponent('test/components/Placeholder/Placeholder.js', config);

	expect(result).toMatchSnapshot();
});
