'use strict';
/* eslint-disable no-console */

const _ = require('lodash/fp');
const chalk = require('chalk');
const logger = require('glogg')('rsg');

const format = message => message.trim() + '\n';

const printers = {
	info: message => console.log(format(message)),
	warn: message => console.warn(chalk.yellow(`Warning: ${format(message)}`)),
	debug: message => console.log(format(message)),
};

/**
 * Setup up logger:
 * const logger = require('glogg')('rsg')
 * logger.info('Drinking coffee...')
 *
 * @param {Object} methods Custom methods
 * @param {bool} verbose Print debug messages
 * @param {Object} [defaults] Default methods
 */
module.exports = function setupLogger(methods, verbose, defaults) {
	_.flow(
		_.defaults(defaults || printers),
		_.omit(verbose || ['debug']),
		_.toPairs,
		_.forEach(printer => logger.on(printer[0], printer[1]))
	)(methods);
};
