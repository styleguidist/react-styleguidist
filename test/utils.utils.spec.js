import { expect } from 'chai';
const _ = require('lodash');

import * as utils from '../src/utils/utils';

describe('utils', () => {

	describe('setComponentsNames', () => {
		it('should set name property to each component', () => {
			let result = utils.setComponentsNames([
				{
					module: {displayName: 'Foo'}
				},
				{
					module: {name: 'Bar'}
				},
				{
					module: {displayName: 'Foo'},
					props: {displayName: 'FooOverride'}
				}
			]);
			expect(_.map(result, 'name')).to.eql(['Foo', 'Bar', 'FooOverride']);
		});
	});

	describe('globalizeComponents', () => {
		let sourceGlobalLength;
		beforeEach(() => {
			sourceGlobalLength = Object.keys(global).length;
		});
		afterEach(() => {
			delete global.Foo;
			delete global.Bar;
		});
		it('should set each component’s module as a global variable', () => {
			utils.globalizeComponents([
				{
					name: 'Foo',
					module: 13
				},
				{
					name: 'Bar',
					module: 27
				},
				{
					name: 'PathedFoo',
					module: {a: 32},
					props: {
						path: 'a'
					}
				}
			]);
			expect(Object.keys(global).length).to.eql(sourceGlobalLength + 3);
			expect(global.Foo).to.eql(13);
			expect(global.Bar).to.eql(27);
			expect(global.PathedFoo).to.eql(32);
		});
	});

});
