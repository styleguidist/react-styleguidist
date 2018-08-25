import React from 'react';
import { Editor } from './Editor';

const code = '<button>MyAwesomeCode</button>';
const newCode = '<button>MyNewAwesomeCode</button>';
const props = {
	classes: {},
	onChange() {},
	code,
};

describe('Editor', () => {
	it('should renderer and editor', () => {
		const actual = shallow(<Editor {...props} />);

		expect(actual).toMatchSnapshot();
	});

	it('should update code', () => {
		const actual = mount(<Editor {...props} />);

		actual.setProps({ code: newCode });

		expect(actual.text()).toMatch(newCode);
	});

	it('should call onChange when textarea value changes', () => {
		const onChange = jest.fn();
		const actual = mount(<Editor {...props} onChange={onChange} />);

		expect(actual.text()).toMatch(code);

		// Set new value
		actual.find('textarea').simulate('change', {
			target: {
				value: newCode,
			},
		});

		expect(onChange).toBeCalledWith(newCode);
	});
});
