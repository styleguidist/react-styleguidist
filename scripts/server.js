'use strict';

const createServer = require('./create-server');

module.exports = function server(config, callback) {
	const env = 'development';
	const serverInfo = createServer(config, env);

	serverInfo.app.listen(config.serverPort, config.serverHost, callback);

	return serverInfo.compiler;
};
