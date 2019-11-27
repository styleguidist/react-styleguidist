import path from 'path';
import processComponent from '../processComponent';

const config = {
	configDir: __dirname,
	getExampleFilename: (componentpath: string) =>
		path.join(path.dirname(componentpath), 'Readme.md'),
	getComponentPathLine: (componentpath: string) => componentpath,
};

it('processComponent() should return an object for section with content', () => {
	const result = processComponent('pizza.js', config as any);

	expect(result).toMatchSnapshot();
});
