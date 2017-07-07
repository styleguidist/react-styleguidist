import path from 'path';
import identity from 'lodash/identity';
import getComponents from '../getComponents';

jest.mock('../requireIt');

it('getComponents() should return an object for components', () => {
	const result = getComponents(['Foo.js', 'Bar.js'], {
		configDir: path.resolve(__dirname, '../../../test'),
		getExampleFilename: identity,
		getComponentPathLine: identity,
	});

	expect(result).toMatchSnapshot();
});
