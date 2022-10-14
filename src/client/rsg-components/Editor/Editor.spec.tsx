import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
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
		const { getByText } = render(<Editor {...props} onChange={onChange} />);

		const textarea = getByText(code);
		fireEvent.change(textarea, { target: { value: newCode } });

		expect(onChange).toBeCalledWith(newCode);
	});
});
