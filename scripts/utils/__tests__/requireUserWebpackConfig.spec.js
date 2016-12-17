import requireUserWebpackConfig from '../requireUserWebpackConfig';

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

it('should return an object with create-react-app Webpack config', () => {
	process.chdir('test/apps/cra');
	const result = requireUserWebpackConfig(true);
	expect(result).toBeTruthy();
	expect(result.cra).toBeTruthy();
});
