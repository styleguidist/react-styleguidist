var path = require('path');
var reactDocs = require('react-docgen');

module.exports = function (source) {
	this.cacheable && this.cacheable();

    var props;
    try {
	   props = reactDocs.parse(source);
    }
    catch (e) {
        console.log('Error when parsing', path.basename(this.request));
        console.log(e.toString());
        console.log();
        props = {};
    }

	return [
			'if (module.hot) {',
			'	module.hot.accept([]);',
			'}',
			'module.exports = ' + JSON.stringify(props)
		].join('\n');
};
