import identity from 'lodash/identity';
import getComponents from '../getComponents';

it('getComponents() should return an object for components', () => {
	const result = getComponents(['Foo.js', 'Bar.js'], {
		configDir: TEST_FOLDER_PATH,
		getExampleFilename: identity,
		getComponentPathLine: identity,
	});

	expect(result).toMatchSnapshot();
});
