/**
 * Expose component as global variables.
 *
 * @param {Object} component
 */
export default function globalizeComponent(component) {
	if (!component.name) {
		return;
	}

	global[component.name] =
		!component.props.path || component.props.path === 'default'
			? component.module.default || component.module
			: component.module[component.props.path];
}
