'use strict';

const fs = require('fs');

module.exports.isDirectoryExists = function(dir) {
	try {
		const stats = fs.lstatSync(dir);
		if (stats.isDirectory()) {
			return true;
		}
	}
	finally {
		/* */
	}
	return false;
};
