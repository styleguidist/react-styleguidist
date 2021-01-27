import fs from 'fs';
import path from 'path';
import {
	Program,
	Declaration,
	VariableDeclaration,
	ExportNamedDeclaration,
	ImportDeclaration,
} from 'estree';
import acornJsx from 'acorn-jsx';
import { Parent, Node } from 'unist';
import { walk } from 'estree-walker';
import { generate } from 'escodegen';
import toAst from 'to-ast';
import { builders as b } from 'ast-types';
import getAst from '../utils/getAst';
import { ModuleMap } from './types';

// TODO: Hot reload

const getLocalName = (index: number) => `__story_import_${index}`;

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
		enter: (node) => {
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

const getImportStatements = (ast: Program, code: string): string[] => {
	const imports: string[] = [];
	walk(ast, {
		enter: (node) => {
			if (node.type === 'ImportDeclaration') {
				const importDeclarationNode = node as ImportDeclaration;
				if (importDeclarationNode.source) {
					// @ts-expect-error: There are no types for location ;-/
					const { start, end } = importDeclarationNode;
					imports.push(code.substring(start, end));
				}
			}
		},
	});
	return imports;
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

// TODO: Add only needed imports for each example
const prependExampleWithImports = (code: string, imports: string[]) => {
	return [imports.join('\n'), code].join('\n\n');
};

const getExports = (ast: Program, code: string) => {
	const imports = getImportStatements(ast, code);

	const exports: Record<string, string> = {};
	walk(ast, {
		enter: (node) => {
			// export const foo = ...
			if (node.type === 'ExportNamedDeclaration') {
				const exportNamedDeclaratioNode = node as ExportNamedDeclaration;
				if (exportNamedDeclaratioNode.declaration) {
					const exportCode = getExportCode(exportNamedDeclaratioNode.declaration, code);
					if (exportCode) {
						exports[exportCode.name] = prependExampleWithImports(exportCode.code, imports);
					}
				}
			}
		},
	});
	return exports;
};

/**
 * 1. Generate export with all strories in Component Story Format (CSF)
 * 2. Generate export with all modules imported into a CSF file, so they are
 *    available in examples when we run them.
 * 3. TODO ...
 *
 * import Container from './Container'
 * export const basic = () => <Container><Button /></Container>
 *
 * ->
 *
 * import Container from './Container'
 * export const __namedExamples = {
 *   basic: '<Container><Button /></Container>'
 * }
 */
export default ({ component, resourcePath }: { component: string; resourcePath: string }) => () => (
	treeRaw: Node
) => {
	const tree = treeRaw as Parent;

	const componentAbsolutePath = path.resolve(path.dirname(resourcePath), component);
	const storiesFile = getStoriesFile(componentAbsolutePath);
	if (!storiesFile) {
		return tree;
	}

	const storiesCode = fs.readFileSync(storiesFile, 'utf8');
	const storiesAst = getAst(storiesCode, [acornJsx()]);
	if (!storiesAst) {
		return tree;
	}

	// Generate export for named examples
	const exports = getExports(storiesAst, storiesCode);
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

	// Generate export for TODO ...
	const modulesMap = getModulePathToModuleMap(imports);
	const scopeExportCode = `export const __storiesScope = ${generate(toAst(modulesMap))}`;
	tree.children.push({
		type: 'export',
		value: scopeExportCode,
	});

	// TODO: Add imports (with different names) so they appear in the scope

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
