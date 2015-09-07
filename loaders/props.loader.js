var reactDocs = require('react-docgen');

module.exports = function (source, map) {
	this.cacheable && this.cacheable();

	var props = reactDocs.parse(source);

	return [
			'if (module.hot) {',
			'	module.hot.accept([]);',
			'}',
			'module.exports = ' + JSON.stringify(props)
		].join('\n');
};
