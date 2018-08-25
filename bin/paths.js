const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// config after eject: we're in ./config/
module.exports = {
	getConfig: resolveApp('src/scripts/config'),
	setupLogger: resolveApp('src/scripts/logger'),
	consts: resolveApp('src/scripts/consts'),
	StyleguidistError: resolveApp('src/scripts/utils/error'),
	ensureWebpack: resolveApp('src/scripts/utils/ensureWebpack'),
	build: resolveApp('src/scripts/build'),
	server: resolveApp('src/scripts/server'),
};
