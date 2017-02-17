import vm from 'vm';
import path from 'path';
import styleguideLoader from '../styleguide-loader';

/* eslint-disable quotes */

const configDir = path.resolve(__dirname, '../../test');

it('should return valid, parsable JS', () => {
	const result = styleguideLoader.pitch.call({
		_styleguidist: {
			sections: [{ components: 'components/**/*.js' }],
			configDir,
			getExampleFilename: () => 'Readme.md',
			getComponentPathLine: filepath => filepath,
		},
		addContextDependency: () => {},
	});
	expect(result).toBeTruthy();
	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
	expect(result).toMatch(`'filepath': 'components/Button/Button.js'`);
	expect(result).toMatch(`'filepath': 'components/Placeholder/Placeholder.js'`);
});

it('should add context dependencies to webpack from contextDependencies config option', () => {
	const contextDependencies = ['foo', 'bar'];
	const addContextDependency = jest.fn();
	styleguideLoader.pitch.call({
		_styleguidist: {
			sections: [],
			configDir,
			contextDependencies,
		},
		addContextDependency,
	});
	expect(addContextDependency).toHaveBeenCalledTimes(2);
	expect(addContextDependency).toBeCalledWith(contextDependencies[0]);
	expect(addContextDependency).toBeCalledWith(contextDependencies[1]);
});

it('should add common parent folder of all components to context dependencies', () => {
	const addContextDependency = jest.fn();
	styleguideLoader.pitch.call({
		_styleguidist: {
			sections: [{ components: 'components/**/*.js' }],
			configDir,
			getExampleFilename: () => 'Readme.md',
			getComponentPathLine: filepath => filepath,
		},
		addContextDependency,
	});
	expect(addContextDependency).toHaveBeenCalledTimes(1);
	expect(addContextDependency).toBeCalledWith(expect.stringMatching(/test\/components\/$/));
});
