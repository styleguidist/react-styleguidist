import StyleguidistOptionsPlugin from '../StyleguidistOptionsPlugin';
import * as Rsg from '../../../typings';

const options: any = {
	foo: 42,
};
const mockContext: { _styleguidist?: Rsg.StyleguidistConfig } = {};

jest.mock('webpack', () => {
	const resource = {};
	return {
		NormalModule: {
			getCompilationHooks: () => {
				return {
					loader: {
						tap: (moduleName: string, compilationCallback: (context: any, opt: any) => void) => {
							compilationCallback(mockContext, resource);
						},
					},
				};
			},
		},
	};
});

it('should do nothing when resource is empty', () => {
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
