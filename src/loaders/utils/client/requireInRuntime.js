/**
 * Return module from a given map (like {react: require('react')}) or throw.
 * We alllow to require modules only from Markdown examples (won’t work dinamically becasue we need to know all required
 * modules in advance to be able to bundle them with the code).
 *
 * @param {object} requireMap
 * @param {string} filepath
 * @return {object}
 */
export default function requireInRuntime(requireMap, filepath) {
	if (!(filepath in requireMap)) {
		throw new Error(
			`import or require() statements can be added only by editing a Markdown example file: ${filepath}`
		);
	}
	const mod = requireMap[filepath];
	return mod.default || mod;
}
