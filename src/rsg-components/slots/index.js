import Editor from 'rsg-components/Editor';
import Usage from 'rsg-components/Usage';
import IsolateButton from './IsolateButton';
import CodeTabButton from './CodeTabButton';
import UsageTabButton from './UsageTabButton';

export const EXAMPLE_TAB_CODE_EDITOR = 'rsg-code-editor';
export const DOCS_TAB_USAGE = 'rsg-usage';

export default ({ pagePerSection }) => {
	const toolbar = pagePerSection ? [] : [IsolateButton];

	return {
		sectionToolbar: toolbar,
		componentToolbar: toolbar,
		exampleToolbar: toolbar,
		exampleTabButtons: [
			{
				id: EXAMPLE_TAB_CODE_EDITOR,
				render: CodeTabButton,
			},
		],
		exampleTabs: [
			{
				id: EXAMPLE_TAB_CODE_EDITOR,
				render: Editor,
			},
		],
		docsTabButtons: [
			{
				id: DOCS_TAB_USAGE,
				render: UsageTabButton,
			},
		],
		docsTabs: [
			{
				id: DOCS_TAB_USAGE,
				render: Usage,
			},
		],
	};
};
