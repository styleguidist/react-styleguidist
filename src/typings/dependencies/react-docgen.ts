declare module 'react-docgen' {
	import { Tag, Type } from 'doctrine';
	import { ASTNode } from 'ast-types';
	import { NodePath } from 'ast-types/lib/node-path';

	export type Handler = (documentation: Documentation, path: NodePath) => void;

	interface Documentation {
		addComposes(moduleName: string): void;
		set(key: string, value: any): void;
		get(key: string): any;
		getPropDescriptor(propName: string): PropDescriptor;
		getContextDescriptor(propName: string): PropDescriptor;
		getChildContextDescriptor(propName: string): PropDescriptor;
		toObject(): DocumentationObject;
	}

	export interface TagObject extends Omit<Tag, 'description'> {
		description?: string;
	}

	export interface TagParamObject extends TagObject {
		name: string;
		type?: Type | null;
		default?: string;
	}

	export interface TagProps {
		deprecated?: TagObject[];
		see?: TagObject[];
		link?: TagObject[];
		author?: TagObject[];
		version?: TagObject[];
		since?: TagObject[];
		returns?: TagParamObject[];
		return?: TagParamObject[];
		arg?: TagParamObject[];
		argument?: TagParamObject[];
		param?: TagParamObject[];
		[title: string]: TagObject[] | undefined;
	}

	export interface PropTypeDescriptor {
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
			| 'instanceOf'
			| 'elementType';
		value?: any;
		raw?: string;
		computed?: boolean;
		// These are only needed for shape/exact types.
		// Consider consolidating PropTypeDescriptor and PropDescriptor
		description?: string;
		required?: boolean;
	}

	export interface PropDescriptor {
		name: string;
		type?: PropTypeDescriptor;
		required?: boolean;
		defaultValue?: any;
		description?: string;
		tags?: TagProps;
	}

	export interface MethodDescriptor {
		name: string;
		description?: string;
		docblock?: string;
		returns?: { name: string; [key: string]: any } | null;
		params?: any[];
		modifiers?: string[];
		tags?: TagProps;
	}

	export interface DocumentationObject {
		displayName?: string;
		description?: string;
		tags?: TagProps;
		props?: { [propName: string]: PropDescriptor };
		methods?: MethodDescriptor[];
		context?: { [constextName: string]: PropDescriptor };
		childContext?: { [chilCOntextName: string]: PropDescriptor };
		composes?: string[];
	}

	interface Options {
		filename?: string;
		cwd?: string;
		babelrc?: string;
		babelrcRoots?: boolean | string | string[];
		root?: string;
		rootMode?: 'root' | 'upward' | 'upward-optional';
		configFile?: string;
		envName?: string;
	}

	export const defaultHandlers: Handler[];

	/**
	 * Parse the components at filePath and return props, public methods, events and slots
	 * @param filePath absolute path of the parsed file
	 * @param opts
	 */
	export function parse(
		source: string | Buffer,
		resolver?: (
			ast: ASTNode,
			parser: { parse: (code: string) => ASTNode }
		) => NodePath<any, any> | NodePath[],
		handlers?: Handler[],
		options?: Options
	): DocumentationObject | DocumentationObject[];

	export const utils: {
		docblock: {
			getDoclets: (str?: string) => Record<string, any>;
		};
	};

	export const resolver: {
		findAllComponentDefinitions(ast: ASTNode): NodePath[];
		findAllExportedComponentDefinitions(
			ast: ASTNode,
			recast: {
				visit: (
					path: NodePath,
					handlers: { [handlerName: string]: () => boolean | undefined }
				) => void;
			}
		): NodePath[];
		findExportedComponentDefinition(ast: ASTNode): NodePath | undefined;
	};
}

declare module 'react-docgen-displayname-handler' {
	import { NodePath as DisplaNameHandlerNodePath } from 'ast-types/lib/node-path';
	import { Documentation } from 'react-docgen';

	type Handler = (documentation: Documentation, path: DisplaNameHandlerNodePath) => void;
	export function createDisplayNameHandler(componentPath: string): Handler;
}

declare module 'react-docgen-annotation-resolver' {
	import { ASTNode as AnnoASTNode } from 'ast-types';
	import { NodePath as AnnoNodePath } from 'ast-types/lib/node-path';

	function annotationResolver(
		ast: AnnoASTNode,
		recast: {
			visit: (
				node: AnnoNodePath,
				handlers: { [handlerName: string]: () => boolean | undefined }
			) => void;
		}
	): AnnoNodePath[];
	export = annotationResolver;
}
