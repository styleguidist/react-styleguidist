import { uniq } from 'lodash';
import { Parent, Node } from 'unist';

/**
 * Deduplicate import nodes.
 *
 * import React from "react"
 * import Button from './Button';
 * import React from 'react'
 *
 * ->
 *
 * import React from 'react'
 * import Button from './Button'
 *
 * XXX: This is a very naïve approach and will only deduplicate completely
 * identical statements (ignoring quotes and semicolons).
 */
export default () => (treeRaw: Node) => {
	const tree = treeRaw as Parent;

	const importNodes = tree.children.filter((n) => n.type === 'import');

	// `import` Mdx node can contain multiple import statements, so join/split
	// to have each statement separately
	const importStatements = importNodes
		.map((x) => x.value)
		.join('\n')
		.split('\n');

	// Normalize semicolons and quotes
	const normalizedImportStatements = importStatements.map((x) =>
		x.replace(/;\s*$/, '').replace(/"/g, '/')
	);

	// Remove duplicates
	const uniqImportStatements = uniq(normalizedImportStatements);

	// Replace all import nodes with deduplicated ones
	return {
		...tree,
		children: [
			...tree.children.filter((n) => n.type !== 'import'),
			...uniqImportStatements.map((value) => ({
				type: 'import',
				value,
			})),
		],
	};
};
