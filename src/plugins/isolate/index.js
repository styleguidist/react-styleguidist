import IsolateButton from './IsolateButton';
import { Slots } from '../../consts';

const isolatePlugin = () => ({
	fills: [
		{
			type: Slots.sectionToolbarButton,
			render: IsolateButton,
		},
		{
			type: Slots.componentToolbarButton,
			render: IsolateButton,
		},
		{
			type: Slots.previewToolbarButton,
			render: IsolateButton,
		},
	],
});

export default isolatePlugin;
