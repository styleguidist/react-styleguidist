/* eslint-disable no-console */

import _ from 'lodash/fp';
import kleur from 'kleur';
import loggerMaker from 'glogg';

const logger = loggerMaker('rsg');

const format = (message: string) => message.trim() + '\n';

const printers: Record<string, (message: string) => void> = {
	info: (message: string) => console.log(format(message)),
	warn: (message: string) => console.warn(kleur.yellow(`Warning: ${format(message)}`)),
	debug: (message: string) => console.log(format(message)),
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
export default function setupLogger(
	methods?: Record<string, (message: string) => void>,
	verbose?: boolean,
	defaults?: Record<string, (message: string) => void>
) {
	_.flow(
		_.defaults(defaults || printers),
		_.omit(verbose ? [] : ['debug']),
		_.toPairs,
		_.forEach((printer: any[]) => logger.on(printer[0], printer[1]))
	)(methods);
}
