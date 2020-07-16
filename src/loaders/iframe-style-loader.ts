import path from 'path';
import loaderUtils from 'loader-utils';

const absolutize = (filepath: string) => path.resolve(__dirname, filepath);

const ADD_STYLES_PATH = absolutize('utils/client/addStyles');

module.exports = () => {};

module.exports.pitch = function loader(request: string) {
	return `
var rawContent = require(${loaderUtils.stringifyRequest(this, `!!${request}`)});
var content = typeof content === 'string' ? [[module.id, content, '']] : rawContent;
require(${loaderUtils.stringifyRequest(this, `!${ADD_STYLES_PATH}`)}).default(content);
module.exports = content.locals;
	`;
};
