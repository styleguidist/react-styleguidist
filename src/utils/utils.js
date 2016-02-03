export function setComponentsNames(components) {
	components.map((component) => {
		let {module} = component;
		component.name = module.displayName || module.name || module.default.name;
		if (!component.name) {
			throw Error(`Cannot detect component name for ${component.filepath}`);
		}
	});
	return components;
}

export function globalizeComponents(components) {
	components.map((component) => {
		global[component.name] = component.module;
	});
}
