function styleguidistLoader(source, map) {
	this.cacheable && this.cacheable();

	return 'module.exports = ' + JSON.stringify(source);
}

module.exports = styleguidistLoader
