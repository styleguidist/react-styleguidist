import fs from 'fs';
import path from 'path';
import { flatMap } from 'lodash';
import {
	BaseNode,
	Program,
	Declaration,
	VariableDeclaration,
	ExportNamedDeclaration,
	ImportDeclaration,
	VariableDeclarator,
	ImportSpecifier,
	ImportDefaultSpecifier,
	ImportNamespaceSpecifier,
} from 'estree';
import acornJsx from 'acorn-jsx';
import { Parent, Node as MdxNode } from 'unist';
import { walk } from 'estree-walker';
import { generate } from 'escodegen';
import toAst from 'to-ast';
import { builders as b } from 'ast-types';
import getAst from '../utils/getAst';
import { ModuleMap } from './types';
import getNameFromFilePath from '../utils/getNameFromFilePath';

// TODO: Hot reload
// TODO: Unindenting

interface Dependency {
	names: string[];
	code: string;
}

const getLocalName = (index: number) => `__story_import_${index}`;

// Ensure that we have a semicolon (;) at the end: we must put a semicolon
// in front of JSX (`import 'foo'; <Button/>`), otherwise it won't compile
const ensureSemicolon = (s: string): string => s.replace(/(?:;\s*)?$/, ';');

// TODO: Deduplicate?
const getModulePathToModuleMap = (modules: string[]) => {
	const moduleMap: ModuleMap = {};
	modules.forEach((module, index) => {
		moduleMap[module] = { toAST: () => b.identifier(getLocalName(index)) };
	});
	return moduleMap;
};

// TODO: Use readdir() instead?
const getStoriesFile = (componentPath: string) => {
	const componentExtension = path.extname(componentPath);
	const extensions = [
		'.stories.js',
		'.stories.tsx',
		'.stories.ts',
		'.stories.jsx',
		'.story.js',
		'.story.tsx',
		'.story.ts',
		'.story.jsx',
	];
	const names = [
		// `ComponentName.stories`
		componentPath.replace(componentExtension, ''),
		// `FolderName.stories` when component definition file is `index`
		path.join(path.dirname(componentPath), path.basename(path.dirname(componentPath))),
	];
	for (const name of names) {
		for (const extension of extensions) {
			const filePath = `${name}${extension}`;
			const exists = fs.existsSync(filePath);
			if (exists) {
				return filePath;
			}
		}
	}
	return false;
};

const getImports = (ast: Program): string[] => {
	const imports: string[] = [];
	walk(ast, {
		enter: (node: BaseNode) => {
			if (node.type === 'ImportDeclaration') {
				const importDeclarationNode = node as ImportDeclaration;
				if (typeof importDeclarationNode?.source?.value === 'string') {
					imports.push(importDeclarationNode.source.value);
				}
			}
		},
	});
	return imports;
};

const getImportDeclarationName = (
	specifier: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
): string => {
	switch (specifier.type) {
		case 'ImportSpecifier':
		case 'ImportDefaultSpecifier':
		case 'ImportNamespaceSpecifier':
			return specifier.local.name;
		default:
			return '';
	}
};

const getImportStatements = (ast: Program, code: string): Dependency[] => {
	const imports: Dependency[] = [];
	walk(ast, {
		enter: (node: BaseNode) => {
			if (node.type === 'ImportDeclaration') {
				const importDeclarationNode = node as ImportDeclaration;
				if (importDeclarationNode.source) {
					// @ts-expect-error: There are no types for location ;-/
					const { start, end } = importDeclarationNode;
					imports.push({
						names: importDeclarationNode.specifiers.map(getImportDeclarationName),
						code: code.substring(start, end),
					});
				}
			}
		},
	});
	return imports;
};

const getVariableDeclarationNames = ({ id }: VariableDeclarator): string[] => {
	switch (id.type) {
		case 'Identifier':
			return [id.name];
		case 'ObjectPattern':
			return id.properties
				.map((property) => {
					switch (property.type) {
						case 'Property':
							switch (property.value.type) {
								case 'Identifier':
									return property.value.name;
							}
							return '';
						case 'RestElement':
							switch (property.argument.type) {
								case 'Identifier':
									return property.argument.name;
							}
							return '';
					}

					return '';
				})
				.filter(Boolean);
		default:
			return [];
	}
};

const getVariableStatements = (ast: Program, code: string): Dependency[] => {
	const nodes = ast.body.filter((node) => node.type === 'VariableDeclaration');
	return nodes.map((node) => {
		const variableDeclarationNode = node as VariableDeclaration;
		// @ts-expect-error: There are no types for location ;-/
		const { start, end } = variableDeclarationNode;
		return {
			names: flatMap(variableDeclarationNode.declarations, getVariableDeclarationNames),
			code: code.substring(start, end),
		};
	});
};

const getExportCode = (node: Declaration, code: string) => {
	switch (node.type) {
		case 'VariableDeclaration': {
			const variableDeclarationNode = node as VariableDeclaration;

			const [declaration] = variableDeclarationNode.declarations;

			if (!declaration || declaration.type !== 'VariableDeclarator') {
				break;
			}

			const { id, init } = declaration;
			if (id.type !== 'Identifier' || !init) {
				break;
			}

			switch (init.type) {
				case 'ArrowFunctionExpression': {
					// @ts-expect-error 2339: There are no types for location ;-/
					const { start, end } = init.body;
					return {
						name: id.name,
						// TODO: Unindent doesn't work because the first line is not indented,
						// we need to add the existing whitespace before calling unindent()
						code: /* unindent( */ code.substring(start, end) /* ) */,
					};
				}
			}
			break;
		}
	}

	return undefined;
};

// This is a very simplified approach: it will add unnecessary dependencies
// because we only check whether the dependency local name is present in the
// example code. However, it won't break the code by not including all the used
// dependencies
const prependExampleWithDependencies = (
	code: string,
	dependencies: Dependency[],
	componentName: string
) => {
	const usedDependencies = dependencies.filter(
		(dependency) =>
			// Ignore the current component import it it's the only import
			!(dependency.names.length === 1 && dependency.names[0] === componentName) &&
			// Include imports when any of the names are present in the code
			dependency.names.some((name) => code.match(new RegExp(`\\b${name}\\b`)))
	);
	return [
		usedDependencies
			.map((dependency) => ensureSemicolon(dependency.code))
			.filter(Boolean)
			.join('\n'),
		code,
	]
		.filter(Boolean)
		.join('\n\n');
};

const getExports = (ast: Program, code: string, componentName: string) => {
	const imports = getImportStatements(ast, code);
	const variables = getVariableStatements(ast, code);

	const exports: Record<string, string> = {};
	walk(ast, {
		enter: (node: BaseNode) => {
			// export const foo = ...
			if (node.type === 'ExportNamedDeclaration') {
				const exportNamedDeclaratioNode = node as ExportNamedDeclaration;
				if (exportNamedDeclaratioNode.declaration) {
					const exportCode = getExportCode(exportNamedDeclaratioNode.declaration, code);
					if (exportCode) {
						exports[exportCode.name] = prependExampleWithDependencies(
							exportCode.code,
							[...imports, ...variables],
							componentName
						);
					}
				}
			}
		},
	});
	return exports;
};

/**
 * 1. Generate export with all modules imported into a Component Story Format
 *    (CSF) file, so they are available in examples when we run them.
 * 2. Generate export with all strories in a CSF files.
 * 3. Prepend each story example with necessary imports and local variables.
 *
 * import Button from './Button'
 * import Container from './Container'
 * export const basic = () => <Container><Button /></Container>
 *
 * ->
 *
 * import * as __story_import_0 from './Button'
 * export const __namedExamples = {
 *   basic: 'import Button from './Button'\n\n<Container><Button /></Container>'
 * }
 * export const __storiesScope = {
 *   './Button': __story_import_0
 * }
 */
export default ({
	componentPath,
	mdxDocumentPath,
}: {
	componentPath: string;
	mdxDocumentPath: string;
}) => () => (treeRaw: MdxNode) => {
	const tree = treeRaw as Parent;

	const componentAbsolutePath = path.resolve(path.dirname(mdxDocumentPath), componentPath);
	const storiesFile = getStoriesFile(componentAbsolutePath);
	if (!storiesFile) {
		return tree;
	}

	const storiesCode = fs.readFileSync(storiesFile, 'utf8');
	const storiesAst = getAst(storiesCode, [acornJsx()]);
	if (!storiesAst) {
		return tree;
	}

	const componentName = getNameFromFilePath(componentAbsolutePath);

	// Generate export for named examples
	const exports = getExports(storiesAst, storiesCode, componentName);
	const examplesExportCode = `export const __namedExamples = ${generate(toAst(exports))}`;
	tree.children.push({
		type: 'export',
		value: examplesExportCode,
	});

	const imports = getImports(storiesAst);

	// Generate imports so weback bundles the modules
	imports.forEach((module, index) => {
		tree.children.push({
			type: 'import',
			value: `import * as ${getLocalName(index)} from '${module}'`,
		});
	});

	// Generate export for the mapping of imported modules
	const modulesMap = getModulePathToModuleMap(imports);
	const scopeExportCode = `export const __storiesScope = ${generate(toAst(modulesMap))}`;
	tree.children.push({
		type: 'export',
		value: scopeExportCode,
	});

	// TODO: Make hot reload of CSF file work (this doesn't help)
	// TODO: It shouldn't generate an absolute path anyway
	// TODO: Looks like we'll have to wrap exports from this plugin in a loader
	// const importCode = `import '${storiesFile}'`;
	// tree.children.push({
	// 	type: 'import',
	// 	value: importCode,
	// });

	return tree;
};
