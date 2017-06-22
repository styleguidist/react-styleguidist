import Usage from 'rsg-components/Usage';
import UsageTabButton from './UsageTabButton';

export const DOCS_TAB_USAGE = 'rsg-usage';

const usagePlugin = () => ({
	fills: [
		{
			id: DOCS_TAB_USAGE,
			type: 'docsTabButton',
			render: UsageTabButton,
		},
		{
			id: DOCS_TAB_USAGE,
			type: 'docsTab',
			render: Usage,
		},
	],
});

export default usagePlugin;
