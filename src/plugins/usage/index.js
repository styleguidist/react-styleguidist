import Usage from 'rsg-components/Usage';
import UsageTabButton from './UsageTabButton';
import { Slots } from '../../consts';

export const DOCS_TAB_USAGE = 'rsg-usage';

const usagePlugin = () => ({
	fills: [
		{
			id: DOCS_TAB_USAGE,
			type: Slots.docsTabButton,
			render: UsageTabButton,
		},
		{
			id: DOCS_TAB_USAGE,
			type: Slots.docsTab,
			render: Usage,
		},
	],
});

export default usagePlugin;
