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
import getAst from '../utils/getAst';

// TODO: Hot reload

const getStoriesFile = (componentPath: string) => {
	const componentExtension = path.extname(componentPath);
	const storiesExtension = `.stories${componentExtension}`;
	const files = [
		// ComponentName.stories.ext
		componentPath.replace(componentExtension, storiesExtension),
		// FolderName.stories.ext when component definition file is index.js
		path.join(
			path.dirname(componentPath),
			`${path.basename(path.dirname(componentPath))}${storiesExtension}`
		),
	];
	for (const file of files) {
		const existingFile = fs.existsSync(file);
		if (existingFile) {
			return file;
		}
	}
	return false;
};

const getImports = (ast: Program, code: string): string[] => {
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

const getExports = (ast: Program, code: string) => {
	const exports: Record<string, string> = {};
	walk(ast, {
		enter: (node) => {
			// export const foo = ...
			if (node.type === 'ExportNamedDeclaration') {
				const exportNamedDeclaratioNode = node as ExportNamedDeclaration;
				if (exportNamedDeclaratioNode.declaration) {
					const exportCode = getExportCode(exportNamedDeclaratioNode.declaration, code);
					if (exportCode) {
						exports[exportCode.name] = exportCode.code;
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

	// Generate imports for imported into stories file modules
	const imports = getImports(storiesAst, storiesCode);
	imports.forEach((statement) => {
		tree.children.push({
			type: 'import',
			value: statement,
		});
	});

	// TODO: Make hot reload of CSF file work (this doesn't help)
	// TODO: It shouldn't generate an absolute path anyway
	const importCode = `import '${storiesFile}'`;
	tree.children.push({
		type: 'import',
		value: importCode,
	});

	return tree;
};
