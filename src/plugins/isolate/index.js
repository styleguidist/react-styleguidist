import IsolateButton from './IsolateButton';

const isolatePlugin = () => ({
	fills: [
		{
			type: 'sectionToolbarButton',
			render: IsolateButton,
		},
		{
			type: 'componentToolbarButton',
			render: IsolateButton,
		},
		{
			type: 'exampleToolbarButton',
			render: IsolateButton,
		},
	],
});

export default isolatePlugin;
