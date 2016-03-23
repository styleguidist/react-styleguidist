export function setComponentsNames(components) {
	components.map((component) => {
        // Try to detect component name or fallback to file name or directory name.
		let { module } = component;
		component.name = component.props.displayName || (
            module.default
                ? (module.default.displayName || module.default.name)
                : (module.displayName || module.name)
        ) || component.nameFallbak;
	});
	return components;
}

export function globalizeComponents(components) {
	components.map((component) => {
		global[component.name] = (!component.props.path || component.props.path == 'default') ? 
            (component.module.default || component.module) :
            component.module[component.props.path];
	});
}
