import React from 'react';
import PropTypes from 'prop-types';
import { EditorLoaderRenderer } from './EditorLoaderRenderer';
import Editor from './Editor';

const code = '<button>MyAwesomeCode</button>';
const newCode = '<button>MyNewAwesomeCode</button>';
const options = {
	context: {
		config: {
			showCode: false,
			highlightTheme: 'base16-light',
			editorConfig: {
				mode: 'js',
			},
		},
	},
	childContextTypes: {
		config: PropTypes.object.isRequired,
	},
};

describe('EditorLoaderRenderer', () => {
	it('should renderer should render loader', () => {
		const actual = shallow(<EditorLoaderRenderer classes={{}} />);

		expect(actual).toMatchSnapshot();
	});
});

describe('Editor', () => {
	it('should renderer and editor', () => {
		const actual = shallow(<Editor code={code} onChange={() => {}} />, options);

		expect(actual).toMatchSnapshot();
	});

	it('should update code with debounce', done => {
		const onChange = jest.fn();
		const actual = mount(<Editor code={code} onChange={onChange} />, options);

		expect(actual.text()).toMatch(code);

		// Set new value by calling a method on the CodeMirror instance
		actual
			.find('div')
			.getDOMNode()
			.querySelector('.CodeMirror')
			.CodeMirror.setValue(newCode);

		setTimeout(() => {
			expect(onChange).toBeCalledWith(newCode);
			done();
		}, 13);
	});
});
