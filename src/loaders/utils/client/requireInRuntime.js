// @flow

type Module = { [name: string]: any } | (() => any);
type RequireMap = { [filepath: string]: Module };

const getModule = (mod: Module): Module => {
	if (!mod.default) {
		return mod;
	}

	// Merge named exports with default export to allow requiring like this:
	// const a, {b} = requireInRuntime('a')
	const merged = mod.default;
	Object.assign(merged, mod);
	return merged;
};

/**
 * Return module from a given map (like {react: require('react')}) or throw.
 * We alllow to require modules only from Markdown examples (won’t work dinamically becasue we need to know all required
 * modules in advance to be able to bundle them with the code).
 */
export default function requireInRuntime(requireMap: RequireMap, filepath: string): Module {
	if (!(filepath in requireMap)) {
		throw new Error(
			`import or require() statements can be added only by editing a Markdown example file: ${filepath}`
		);
	}
	return getModule(requireMap[filepath]);
}
