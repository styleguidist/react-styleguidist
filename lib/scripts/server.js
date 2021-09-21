"use strict";

exports.__esModule = true;
exports.default = server;

var _createServer = _interopRequireDefault(require("./create-server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function server(config, callback) {
  const env = 'development';
  const serverInfo = (0, _createServer.default)(config, env);
  serverInfo.app.listen(config.serverPort, config.serverHost, callback);
  return serverInfo;
}