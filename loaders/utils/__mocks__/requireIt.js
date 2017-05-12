'use strict';

const path = require('path');

class RequireStatement {
	constructor(filepath) {
		this.filepath = filepath.replace(
			new RegExp(path.resolve(__dirname, '../../..'), 'g'),
			'<rootDir>'
		);
	}
}

module.exports = function requireIt(filepath) {
	return new RequireStatement(filepath);
};
