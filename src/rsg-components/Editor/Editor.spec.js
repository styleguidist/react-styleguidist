import React from 'react';
import PropTypes from 'prop-types';
import { EditorLoaderRenderer } from './EditorLoaderRenderer';
import { Editor } from './Editor';

const code = '<button>MyAwesomeCode</button>';
const newCode = '<button>MyNewAwesomeCode</button>';
const options = {
	context: {
		config: {
			showCode: false,
			highlightTheme: 'base16-light',
			editorConfig: {
				lineWrapping: true,
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
		const actual = shallow(
			<Editor classes={{}} code={code} editorConfig={{ readOnly: true, mode: 'text/html' }} />,
			options
		);

		expect(actual).toMatchSnapshot();
	});

	it('should update code with debounce', done => {
		const onChange = jest.fn();
		const actual = mount(<Editor classes={{}} code={code} onChange={onChange} />, options);

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

	it('should not update if not read only', () => {
		const actual = shallow(<Editor classes={{}} code={code} />, options);

		const shouldUpdate = actual.instance().shouldComponentUpdate({ code: newCode });
		expect(shouldUpdate).toBe(false);
	});

	it('should update if read only and code has changed', () => {
		const actual = shallow(
			<Editor classes={{}} code={code} editorConfig={{ readOnly: true }} />,
			options
		);

		const shouldUpdate = actual
			.instance()
			.shouldComponentUpdate({ code: newCode, editorConfig: { readOnly: true } });
		expect(shouldUpdate).toBe(true);
	});
});
