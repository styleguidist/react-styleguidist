import getComponent from './getComponent';

/**
 * Expose component as global variables.
 *
 * @param {Object} component
 */
export default function globalizeComponent(component) {
	if (!component.name) {
		return;
	}

	global[component.name] = getComponent(component.module, component.name);
}
