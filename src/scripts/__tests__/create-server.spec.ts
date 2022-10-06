import { WebpackOptionsNormalized } from 'webpack';
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

test('createServer should support an array-valued assetsDir', (done) => {
	process.chdir('test/apps/basic');
	const config = getConfig({
		assetsDir: ['src/components', 'src/components2'],
	});
	const result = createServer(config, 'production');
	expect(result).toBeTruthy();
	expect(result.app).toBeTruthy();
	done();
});

test('createServer should return an object containing a production Webpack compiler', (done) => {
	process.chdir('test/apps/basic');
	const config = getConfig();
	const result = createServer(config, 'production');
	expect(result).toBeTruthy();
	expect(result.compiler).toBeTruthy();
	let output: WebpackOptionsNormalized['output'];
	if (result.compiler && result.compiler.options && result.compiler.options.output) {
		output = result.compiler.options.output;
	} else {
		done.fail('no output');
		return;
	}
	expect(output.filename).toBe('build/bundle.[chunkhash:8].js');
	expect(output.chunkFilename).toBe('build/[name].[chunkhash:8].js');
	done();
});

test('createServer should return an object containing a development Webpack compiler', (done) => {
	process.chdir('test/apps/basic');
	const config = getConfig();
	const result = createServer(config, 'development');
	expect(result).toBeTruthy();
	expect(result.compiler).toBeTruthy();
	let output: WebpackOptionsNormalized['output'];
	if (result.compiler && result.compiler.options && result.compiler.options.output) {
		output = result.compiler.options.output;
	} else {
		done.fail('no output');
		return;
	}
	expect(output.filename).toBe('build/[name].bundle.js');
	expect(output.chunkFilename).toBe('build/[name].js');
	done();
});

test('createServer should apply some base config options', () => {
	process.chdir('test/apps/basic');
	const config = {
		...getConfig(),
		serverHost: 'localhost',
		serverPort: 6000,
	};
	const result = createServer(config, 'development');
	expect(result).toBeTruthy();
	expect(result.compiler).toBeTruthy();
	expect(result.compiler.options.devServer).toMatchObject({
		host: 'localhost',
		port: 6000,
		compress: true,
		hot: true,
		client: { logging: 'none' },
		webSocketServer: 'ws',
	});
});

test('createServer should allow overriding default devServer options', () => {
	process.chdir('test/apps/basic');
	const config = {
		...getConfig(),
		webpackConfig: {
			devServer: {
				client: {
					overlay: false,
					progress: true,
				},
			},
		},
	};
	const result = createServer(config, 'development');
	expect(result).toBeTruthy();
	expect(result.compiler).toBeTruthy();
	expect(result.compiler.options.devServer).toMatchObject({
		client: {
			overlay: false,
			progress: true,
		},
	});
});
