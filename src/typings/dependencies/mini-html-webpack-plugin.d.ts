declare module 'mini-html-webpack-plugin' {
	import { Plugin, loader } from 'webpack';

	class HtmlPlugin extends Plugin {
		constructor(options: any);
	}

	export = HtmlPlugin;
}
