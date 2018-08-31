import identity from 'lodash/identity';
import getComponents from '../getComponents';

it('getComponents() should return an object for components', () => {
	const result = getComponents(['Foo.js', 'Bar.js'], {
		configDir: require.resolve('_test'),
		getExampleFilename: identity,
		getComponentPathLine: identity,
	});

	expect(result).toMatchSnapshot();
});
