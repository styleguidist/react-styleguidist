'use strict';

class RequireStatement {
	constructor(filepath) {
		this.filepath = filepath.replace(process.cwd(), '<rootDir>');
	}
}

module.exports = function requireIt(filepath) {
	return new RequireStatement(filepath);
};
