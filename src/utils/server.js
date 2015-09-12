var fs = require('fs');

module.exports.isDirectoryExists = function (dir) {
	try {
		var stats = fs.lstatSync(dir);
		if (stats.isDirectory()) {
			return true;
		}
	}
	catch (e) {
	}
	return false;
};
