'use strict';

module.exports = function server(config, callback) {
	callback(null, { stats: true });
	return {};
};
