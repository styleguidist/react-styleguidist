export default function(items, groupsConfig) {
	if (groupsConfig) {
		items = items.filter((item) => {

			if (item.static && groupsConfig.includeStatic) {
				return true;
			}

			if (item.static && !groupsConfig.includeStatic) {
				return false;
			}

			if (!item.static && groupsConfig.includeStatic) {
				return false;
			}

			if (!item.pathLine) {
				return true;
			}

			return groupsConfig.pathRegExp.test(item.pathLine);
		});
	}

	return items;
}
