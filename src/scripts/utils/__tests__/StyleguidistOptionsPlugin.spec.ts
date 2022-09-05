import StyleguidistOptionsPlugin from '../StyleguidistOptionsPlugin';
import * as Rsg from '../../../typings';

const options: any = {
	foo: 42,
};
const mockContext: { _styleguidist?: Rsg.StyleguidistConfig } = {};

let mockedModule: Record<string, unknown>;

jest.mock('webpack', () => {
	return {
		NormalModule: {
			getCompilationHooks: () => {
				return {
					loader: {
						tap: (moduleName: string, compilationCallback: (context: any, opt: any) => void) => {
							compilationCallback(mockContext, mockedModule);
						},
					},
				};
			},
		},
	};
});

it('should do nothing when module.resource is not present', () => {
	mockedModule = {};
	const compiler = {
		hooks: {
			compilation: {
				tap: (name: string, callback: (opt: any) => void) => {
					callback({});
				},
			},
		},
	};
	const plugin = new StyleguidistOptionsPlugin(options);
	plugin.apply(compiler as any);
	expect(mockContext._styleguidist).toBeFalsy();
});

it('should attach Styleguidist config options', () => {
	mockedModule = { resource: 'test' };
	const compiler = {
		hooks: {
			compilation: {
				tap: (name: string, callback: (opt: any) => void) => {
					callback({});
				},
			},
		},
	};
	const plugin = new StyleguidistOptionsPlugin(options);
	plugin.apply(compiler as any);
	expect(mockContext._styleguidist).toEqual(options);
});
