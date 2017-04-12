import createServer from '../create-server';
import getConfig from '../config';

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

test('createServer should return an object containing a server instance', () => {
	process.chdir('test/apps/basic');
	const config = getConfig();
	const result = createServer(config, 'production');
	expect(result).toBeTruthy();
	expect(result.app).toBeTruthy();
});

test('createServer should return an object containing a production Webpack compiler', () => {
	process.chdir('test/apps/basic');
	const config = getConfig();
	const result = createServer(config, 'production');
	expect(result).toBeTruthy();
	expect(result.compiler).toBeTruthy();
	expect(result.compiler.options.output.filename).toBe('build/bundle.[chunkhash:8].js');
	expect(result.compiler.options.output.chunkFilename).toBe('build/[name].[chunkhash:8].js');
});

test('createServer should return an object containing a development Webpack compiler', () => {
	process.chdir('test/apps/basic');
	const config = getConfig();
	const result = createServer(config, 'development');
	expect(result).toBeTruthy();
	expect(result.compiler).toBeTruthy();
	expect(result.compiler.options.output.filename).toBe('build/[name].bundle.js');
	expect(result.compiler.options.output.chunkFilename).toBe('build/[name].js');
});
