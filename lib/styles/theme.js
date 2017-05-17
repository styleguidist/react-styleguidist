'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var spaceFactor = exports.spaceFactor = 8;
var space = exports.space = [spaceFactor / 2, // 4
spaceFactor, // 8
spaceFactor * 2, // 16
spaceFactor * 3, // 24
spaceFactor * 4, // 32
spaceFactor * 5, // 40
spaceFactor * 6];

var color = exports.color = {
	base: '#333',
	light: '#999',
	lightest: '#ccc',
	link: '#1978c8',
	linkHover: '#f28a25',
	border: '#e8e8e8',
	name: '#7f9a44',
	type: '#b77daa',
	error: '#fff',
	baseBackground: '#fff',
	errorBackground: '#c00',
	codeBackground: '#f5f5f5',
	sidebarBackground: '#f5f5f5'
};

var fontFamily = exports.fontFamily = {
	base: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Roboto"', '"Oxygen"', '"Ubuntu"', '"Cantarell"', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', 'sans-serif'],
	monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace']
};

var fontSize = exports.fontSize = {
	base: 15,
	text: 16,
	small: 13,
	h1: 48,
	h2: 36,
	h3: 24,
	h4: 18,
	h5: 16,
	h6: 16
};

var mq = exports.mq = {
	small: '@media (max-width: 600px)'
};

var borderRadius = exports.borderRadius = 3;
var maxWidth = exports.maxWidth = 1000;
var sidebarWidth = exports.sidebarWidth = 200;