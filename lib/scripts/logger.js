"use strict";

exports.__esModule = true;
exports.default = setupLogger;

var _fp = _interopRequireDefault(require("lodash/fp"));

var _kleur = _interopRequireDefault(require("kleur"));

var _glogg = _interopRequireDefault(require("glogg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
const logger = (0, _glogg.default)('rsg');

const format = message => message.trim() + '\n';

const printers = {
  info: message => console.log(format(message)),
  warn: message => console.warn(_kleur.default.yellow(`Warning: ${format(message)}`)),
  debug: message => console.log(format(message))
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

function setupLogger(methods, verbose, defaults) {
  _fp.default.flow(_fp.default.defaults(defaults || printers), _fp.default.omit(verbose ? [] : ['debug']), _fp.default.toPairs, _fp.default.forEach(printer => logger.on(printer[0], printer[1])))(methods);
}