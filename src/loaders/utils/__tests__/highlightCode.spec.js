import glogg from 'glogg';
import highlightCode from '../highlightCode';

const logger = glogg('rsg');

const code = '<p>Hello React</p>';

it('should highlight code with specified language', () => {
	const actual = highlightCode(code, 'html');
	expect(actual).toMatchSnapshot();
});

it('should warn when language not found', () => {
	const warn = jest.fn();
	logger.once('warn', warn);

	const actual = highlightCode(code, 'pizza');
	expect(actual).toBe(code);
	expect(warn).toBeCalledWith(
		'Syntax highlighting for “pizza” isn’t supported. Supported languages are: clike, markup, xml, html, mathml, svg, markdown, css, scss, javascript, js, flow, typescript, ts, jsx, tsx, graphql, json, jsonp, bash, shell, diff.'
	);
});

it('should not highlight code without language', () => {
	const actual = highlightCode(code);
	expect(actual).toBe(code);
});
