declare module 'acorn-loose' {
	import { Options, Node } from 'acorn';

	const acornLoose: {
		parse(input: string, options: Options): Node;
	};
	export = acornLoose;
}
