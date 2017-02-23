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

test('createServer should return an object containing a production Webpack multi-compiler', () => {
	process.chdir('test/apps/basic');
	const config = getConfig();
	const result = createServer(config, 'production');
	expect(result).toBeTruthy();
	expect(result).toBeTruthy();
	expect(result.compiler).toBeTruthy();
	expect(result.compiler.compilers).toHaveLength(2);
	expect(result.compiler.compilers[0].options.output.filename).toBe('build/[name].js');
	expect(result.compiler.compilers[0].options.cache).toBeFalsy();
	expect(result.compiler.compilers[1].options.output.filename).toBe('build/[name].js');
	expect(result.compiler.compilers[1].options.cache).toBeFalsy();
});

test('createServer should return an object containing a development Webpack multi-compiler', () => {
	process.chdir('test/apps/basic');
	const config = getConfig();
	const result = createServer(config, 'development');
	expect(result).toBeTruthy();
	expect(result.compiler).toBeTruthy();
	expect(result.compiler.compilers).toHaveLength(2);
	expect(result.compiler.compilers[0].options.output.filename).toBe('build/[name].js');
	expect(result.compiler.compilers[0].options.cache).toBeTruthy();
	expect(result.compiler.compilers[1].options.output.filename).toBe('build/[name].js');
	expect(result.compiler.compilers[1].options.cache).toBeTruthy();
});
