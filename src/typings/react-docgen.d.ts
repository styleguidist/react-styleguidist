declare module 'react-docgen' {
	import { ASTNode } from 'ast-types';
	import { NodePath } from 'ast-types/lib/node-path';

	type Handler = (documentation: Documentation, path: NodePath) => void;

	interface Documentation {
		addComposes(moduleName: string): void;
		set(key: string, value: any): void;
		get(key: string): any;
		getPropDescriptor(propName: string): PropDescriptor;
		getContextDescriptor(propName: string): PropDescriptor;
		getChildContextDescriptor(propName: string): PropDescriptor;
		toObject(): DocumentationObject;
	}

	interface PropTypeDescriptor {
		name:
			| 'arrayOf'
			| 'custom'
			| 'enum'
			| 'array'
			| 'bool'
			| 'func'
			| 'number'
			| 'object'
			| 'string'
			| 'any'
			| 'element'
			| 'node'
			| 'symbol'
			| 'objectOf'
			| 'shape'
			| 'exact'
			| 'union'
			| 'elementType';
		value?: any;
		raw?: string;
		computed?: boolean;
		// These are only needed for shape/exact types.
		// Consider consolidating PropTypeDescriptor and PropDescriptor
		description?: string;
		required?: boolean;
	}

	interface PropDescriptor {
		type?: PropTypeDescriptor;
		required?: boolean;
		defaultValue?: any;
		description?: string;
	}

	interface DocumentationObject {
		props?: { [propName: string]: PropDescriptor };
		context?: { [constextName: string]: PropDescriptor };
		childContext?: { [chilCOntextName: string]: PropDescriptor };
		composes?: string[];
	}

	interface Options {
		filename: string;
		cwd: string;
		babelrc: string;
		babelrcRoots: boolean | string | string[];
		root: string;
		rootMode: 'root' | 'upward' | 'upward-optional';
		configFile: string;
		envName: string;
	}

	const docgen: {
		defaultHandlers: Handler[];
		/**
		 * Parse the components at filePath and return props, public methods, events and slots
		 * @param filePath absolute path of the parsed file
		 * @param opts
		 */
		parse(
			source: string | Buffer,
			resolver?: (
				ast: ASTNode,
				parser: { parse: (code: string) => ASTNode }
			) => NodePath<any, any> | NodePath[],
			handlers?: Handler[],
			options?: Options
		): DocumentationObject | DocumentationObject[];
		resolver: {
			findAllComponentDefinitions(ast: ASTNode): NodePath[];
			findAllExportedComponentDefinitions(ast: ASTNode): NodePath[];
			findExportedComponentDefinition(ast: ASTNode): NodePath | undefined;
		};
	};

	export = docgen;
}

declare module 'react-docgen-displayname-handler' {
	import { NodePath } from 'ast-types/lib/node-path';

	type Handler = (documentation: any, path: NodePath) => void;
	export function createDisplayNameHandler(componentPath: string): Handler;
}

declare module 'react-docgen-annotation-resolver' {
	import { ASTNode } from 'ast-types';
	import { NodePath } from 'ast-types/lib/node-path';

	function annotationResolver(
		ast: ASTNode,
		recast: {
			visit: (
				node: ASTNode,
				handlers: { [handlerName: string]: () => boolean | undefined }
			) => void;
		}
	): NodePath[]; // TODO: check that ASTNode is the right type (could be NodePath)
	export = annotationResolver;
}
