/**
 * Given a component module and a name,
 * return the appropriate export.
 * See /docs/Components.md
 *
 * @param  {object} module
 * @return {function|object}
 */
export default function getComponent(module) {
	// Previously, the logic was to
	// 1: return module.default if existed
	// 2: return module if __esModule is not set (assuming cjs)
	// 3: return module[x] where x is the only named export if there is only one name export
	// 4: return module[component.name] if the component exported a named export that matched the component name, use that
	// 5: return module
	//
	// This has been changed now that we support name-spacing components better

	return module.default || module;
}
