/**
 * Given a component module and a name,
 * return the appropriate export.
 *
 * @param  {object} module
 * @param  {string} name
 * @return {function|object}
 */
export default function getComponent(module, name) {
	if (module.default) {
		return module.default;
	}
	if (!module.__esModule && typeof module === 'function') {
		return module;
	}
	const moduleKeys = Object.keys(module);
	if (moduleKeys.length === 1) {
		return module[moduleKeys[0]];
	}
	return module[name] || module;
}
