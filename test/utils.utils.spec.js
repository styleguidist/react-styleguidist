import { expect } from 'chai';
import {pluck} from 'lodash';

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
				}
			]);
			expect(pluck(result, 'name')).to.eql(['Foo', 'Bar']);
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
				}
			]);
			expect(Object.keys(global).length).to.eql(sourceGlobalLength + 2);
			expect(global.Foo).to.eql(13);
			expect(global.Bar).to.eql(27);
		});
	});

});
