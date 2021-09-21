/**
 * Setup up logger:
 * const logger = require('glogg')('rsg')
 * logger.info('Drinking coffee...')
 *
 * @param {Object} methods Custom methods
 * @param {bool} verbose Print debug messages
 * @param {Object} [defaults] Default methods
 */
export default function setupLogger(methods?: Record<string, (message: string) => void>, verbose?: boolean, defaults?: Record<string, (message: string) => void>): void;
