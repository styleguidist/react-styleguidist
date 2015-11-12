import { expect } from 'chai';

import examplesLoader from '../loaders/examples.loader';

/* eslint max-nested-callbacks: [1, 5] */

describe('examples loader', () => {

	describe('requireAnythingRegex', () => {

		let regex;
		beforeEach(() => {
			expect(examplesLoader.requireAnythingRegex).to.be.an.instanceof(RegExp);
			// we make a version without the /g flag
			regex = new RegExp(examplesLoader.requireAnythingRegex, '');
		});

		it('should match require invocations', () => {
			expect(`require("foo")`).to.match(regex);
			expect(`require ( "foo" )`).to.match(regex);
			expect(`require('foo')`).to.match(regex);
			expect(`require(foo)`).to.match(regex);
			expect(`require("f" + "o" + "o")`).to.match(regex);
			expect(`require("f" + ("o" + "o"))`).to.match(regex);
			expect(`function f() { require("foo"); }`).to.match(regex);
		});

		it('should not match other occurences of require', () => {
			expect(`"required field"`).not.to.match(regex);
			expect(`var f = require;`).not.to.match(regex);
			expect(`require.call(module, "foo")`).not.to.match(regex);
		});
	});

	describe('simpleStringRegex', () => {
		it('should match simple strings and nothing else', () => {
			let regex = examplesLoader.simpleStringRegex;

			expect(`"foo"`).to.match(regex);
			expect(`'foo'`).to.match(regex);
			expect(`"fo'o"`).to.match(regex);
			expect(`'fo"o'`).to.match(regex);
			expect(`'.,:;!§$&/()=@^12345'`).to.match(regex);

			expect(`foo`).not.to.match(regex);
			expect(`'foo"`).not.to.match(regex);
			expect(`"foo'`).not.to.match(regex);

			// these 2 are actually valid in JS, but don't work with this regex.
			// But you shouldn't be using these in your requires anyway.
			expect(`"fo\\"o"`).not.to.match(regex);
			expect(`'fo\\'o'`).not.to.match(regex);

			expect(`"foo" + "bar"`).not.to.match(regex);
		});
	});

	describe('findRequires', () => {
		it('should find calls to require in code', () => {
			let findRequires = examplesLoader.findRequires;
			expect(findRequires(`require('foo')`)).to.deep.equal(['foo']);
		});
	});

	describe('readExamples', () => {
		it('should separate code and html chunks', () => {
			let examplesMarkdown = '# header\n\n    <div />\n\ntext';
			let examples = examplesLoader.readExamples(examplesMarkdown);
			expect(examples).to.have.length(3);
			expect(examples[0].type).to.equal('html');
			expect(examples[1].type).to.equal('code');
			expect(examples[2].type).to.equal('html');
		});
	});

	describe('loader', () => {
		it('should return valid, parsable js', () => {
			let exampleMarkdown = '# header\n\n    <div />\n\ntext';
			let output = examplesLoader.call({}, exampleMarkdown);
			expect(() => new Function(output)).not.to.throw(SyntaxError); // eslint-disable-line no-new-func
		});
	});

});
