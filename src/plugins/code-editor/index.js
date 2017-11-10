import Editor from 'rsg-components/Editor';
import CodeTabButton from './CodeTabButton';
import { Slots } from '../../consts';

export const EXAMPLE_TAB_CODE_EDITOR = 'rsg-code-editor';

const codeEditorPlugin = () => ({
	fills: [
		{
			id: EXAMPLE_TAB_CODE_EDITOR,
			type: Slots.playgroundTabButton,
			render: CodeTabButton,
		},
		{
			id: EXAMPLE_TAB_CODE_EDITOR,
			type: Slots.playgroundTab,
			render: Editor,
		},
	],
});

export default codeEditorPlugin;
