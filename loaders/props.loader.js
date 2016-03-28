var path = require('path');
var reactDocs = require('react-docgen');
var _ = require('lodash');

var requirePlaceholder = '<%{#require#}%>';

module.exports = function (source) {
	this.cacheable && this.cacheable();

	var jsonProps;
	try {
		var props = reactDocs.parse(source);

		if (props.description) {
			props.doclets = reactDocs.utils.docblock.getDoclets(props.description);
			props.description = props.description.replace(/^@(\w+)(?:$|\s((?:[^](?!^@\w))*))/gmi, '');
		} else {
			props.doclets = {};
		}

		if (props.doclets.example) {
			props.example = requirePlaceholder;
		}

		jsonProps = JSON.stringify(props).replace(
			'"' + requirePlaceholder + '"', 
			props.doclets.example && 'require(' + JSON.stringify('examples!' + props.doclets.example) + ')'
		);
	}
	catch (e) {
		console.log('Error when parsing', path.basename(this.request));
		console.log(e.toString());
		console.log();
		jsonProps = null;
	}

	return [
		'if (module.hot) {',
		'	module.hot.accept([]);',
		'}',
		'module.exports = ' + jsonProps + ';'
	].join('\n');
};
