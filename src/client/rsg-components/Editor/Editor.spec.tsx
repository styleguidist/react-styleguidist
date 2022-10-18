import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createRenderer } from 'react-test-renderer/shallow';
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
		const renderer = createRenderer();
		renderer.render(<Editor {...props} />);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});

	it('should update code', () => {
		const { rerender, getByText } = render(<Editor {...props} />);

		rerender(<Editor {...props} code={newCode} />);

		expect(getByText(newCode));
	});

	it('should call onChange when textarea value changes', () => {
		const onChange = jest.fn();
		const { getByText } = render(<Editor {...props} onChange={onChange} />);

		const textarea = getByText(code);
		fireEvent.change(textarea, { target: { value: newCode } });

		expect(onChange).toBeCalledWith(newCode);
	});
});
