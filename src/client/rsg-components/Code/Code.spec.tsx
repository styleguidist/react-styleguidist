import React from 'react';
import { shallow } from 'enzyme';
import { CodeRenderer } from './CodeRenderer';

describe('Code blocks', () => {
	it('should render code', () => {
		const code = '<button>OK</button>';
		const actual = shallow(<CodeRenderer classes={{}}>{code}</CodeRenderer>);

		expect(actual).toMatchSnapshot();
	});
});
