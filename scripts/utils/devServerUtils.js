'use strict';

const chalk = require('chalk');
const logger = require('glogg')('rsg');
const webpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils');

function printInstructions(protocol, host, port) {
	const urls = webpackDevServerUtils.prepareUrls(protocol ? 'https' : 'http', host, port);
	logger.info(`You can now view style guide in the browser.`);

	logger.info(`  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`);
	logger.info(`  ${chalk.bold('On your network:')}  ${urls.lanUrlForTerminal}`);

	logger.info('Note that the development build is not optimized.');
}

module.exports = {
	printInstructions,
};
