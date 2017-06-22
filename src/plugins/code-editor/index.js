import Editor from 'rsg-components/Editor';
import CodeTabButton from './CodeTabButton';

export const EXAMPLE_TAB_CODE_EDITOR = 'rsg-code-editor';

const codeEditorPlugin = () => ({
	fills: [
		{
			id: EXAMPLE_TAB_CODE_EDITOR,
			type: 'exampleTabButton',
			render: CodeTabButton,
		},
		{
			id: EXAMPLE_TAB_CODE_EDITOR,
			type: 'exampleTab',
			render: Editor,
		},
	],
});

export default codeEditorPlugin;
