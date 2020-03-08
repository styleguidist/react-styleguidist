import StyleguidistOptionsPlugin from '../StyleguidistOptionsPlugin';
import * as Rsg from '../../../typings';

const options: any = {
	foo: 42,
};

it('should attach Styleguidist config when webpack 4 is used', () => {
	const context: { _styleguidist?: Rsg.StyleguidistConfig } = {};
	const compiler = {
		hooks: {
			compilation: {
				tap: (name: string, callback: (opt: any) => void) => {
					callback({
						hooks: {
							normalModuleLoader: {
								tap: (
									moduleName: string,
									compilationCallback: (context: any, opt: any) => void
								) => {
									compilationCallback(context, { resource: 'pizza' });
								},
							},
						},
					});
				},
			},
		},
	};
	const plugin = new StyleguidistOptionsPlugin(options);
	plugin.apply(compiler as any);
	expect(context._styleguidist).toEqual(options);
});

it('should do nothing when resource is empty', () => {
	const context: { _styleguidist?: Rsg.StyleguidistConfig } = {};
	const compiler = {
		hooks: {
			compilation: {
				tap: (name: string, callback: (opt: any) => void) => {
					callback({
						hooks: {
							normalModuleLoader: {
								tap: (
									moduleName: string,
									compilationCallback: (context: any, opt: any) => void
								) => {
									compilationCallback(context, {});
								},
							},
						},
					});
				},
			},
		},
	};
	const plugin = new StyleguidistOptionsPlugin(options);
	plugin.apply(compiler as any);

	expect(context._styleguidist).toBeFalsy();
});
