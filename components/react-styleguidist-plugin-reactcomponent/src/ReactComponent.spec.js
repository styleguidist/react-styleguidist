import React from 'react';
import slots, { DOCS_TAB_USAGE } from '../slots';
import ReactComponent from './ReactComponent';
import { ReactComponentRenderer } from './ReactComponentRenderer';
import { DisplayModes } from '../../consts';

const options = {
	context: {
		config: {
			showUsage: false,
		},
		displayMode: DisplayModes.all,
		slots,
	},
	metadata: {},
};

const component = {
	name: 'Foo',
	slug: 'foo',
	pathLine: 'foo/bar.js',
	props: {
		description: 'Bar',
		methods: [],
		examples: [],
	},
	metadata: {},
};
const componentWithEverything = {
	name: 'Foo',
	slug: 'foo',
	pathLine: 'foo/bar.js',
	props: {
		description: 'Bar',
		methods: [
			{
				name: 'set',
				params: [
					{
						name: 'newValue',
						description: 'New value for the counter.',
						type: { name: 'Number' },
					},
				],
				returns: null,
				description: 'Sets the counter to a particular value.',
			},
		],
		examples: [
			{
				type: 'code',
				content: '<button>OK</button>',
				evalInContext: () => {},
			},
			{
				type: 'markdown',
				content: 'Hello *world*!',
			},
		],
	},
	metadata: {
		tags: ['one', 'two'],
	},
};

describe('ReactComponent', () => {
	it('should render an example placeholder', () => {
		const actual = shallow(<ReactComponent component={component} depth={3} />, options);

		const props = actual.prop('examples').props;
		expect(props.name).toBeTruthy();
		expect(props.examples).toBeFalsy();
	});

	it('should render examples', () => {
		const actual = shallow(
			<ReactComponent component={componentWithEverything} depth={3} />,
			options
		);

		const props = actual.prop('examples').props;
		expect(props.name).toBeTruthy();
		expect(props.examples).toBeTruthy();
	});

	it('should pass rendered description, usage, examples, etc. to the renderer', () => {
		const actual = shallow(
			<ReactComponent component={componentWithEverything} depth={3} />,
			options
		);

		expect(actual).toMatchSnapshot();
	});

	it('should render usage closed by default when showUsage config options is false', () => {
		const actual = shallow(
			<ReactComponent component={componentWithEverything} depth={3} />,
			options
		);

		expect(actual.prop('tabButtons').props.active).toBeFalsy();
		expect(actual.prop('tabBody').props.active).toBeFalsy();
	});

	it('should render usage opened by default when showUsage config options is true', () => {
		const actual = shallow(<ReactComponent component={componentWithEverything} depth={3} />, {
			...options,
			context: {
				config: {
					showUsage: true,
				},
			},
		});

		expect(actual.prop('tabButtons').props.active).toBe(DOCS_TAB_USAGE);
		expect(actual.prop('tabBody').props.active).toBe(DOCS_TAB_USAGE);
	});

	it('should return null when component has no name', () => {
		const actual = shallow(
			<ReactComponent component={{ slug: 'foo', props: {} }} depth={3} />,
			options
		);

		expect(actual.getElement()).toBe(null);
	});

	test('should not render component in isolation mode by default', () => {
		const actual = shallow(<ReactComponent component={component} depth={3} />, options);

		expect(actual.prop('heading').props.slotProps.isolated).toBeFalsy();
	});

	test('should render component in isolation mode', () => {
		const actual = shallow(<ReactComponent component={component} depth={3} />, {
			context: {
				...options.context,
				displayMode: DisplayModes.component,
			},
		});

		expect(actual.prop('heading').props.slotProps.isolated).toBeTruthy();
	});

	it('should pass depth to heading', () => {
		const actual = shallow(<ReactComponent component={component} depth={3} />, options);

		expect(actual.prop('heading').props.depth).toBe(3);
	});

	it('should not render heading as deprecated by default', () => {
		const actual = shallow(<ReactComponent component={component} depth={3} />, options);

		expect(actual.prop('heading').props.deprecated).toBeFalsy();
	});

	it('should render heading as deprecated when @deprecated is present in tags', () => {
		const actual = shallow(
			<ReactComponent
				component={{
					...component,
					props: {
						tags: {
							deprecated: [
								{
									title: 'deprecated',
									description: 'I am deprecated',
								},
							],
						},
					},
				}}
				depth={3}
			/>,
			options
		);

		expect(actual.prop('heading').props.deprecated).toBeTruthy();
	});
});

describe('ReactComponentRenderer', () => {
	const props = {
		classes: {},
		name: 'Test',
		slug: 'test',
		pathLine: 'components/test',
		heading: <div>heading</div>,
	};

	test('should render component', () => {
		const actual = shallow(<ReactComponentRenderer {...props} />);

		expect(actual).toMatchSnapshot();
	});

	test('should render component without a pathline', () => {
		const actual = shallow(<ReactComponentRenderer {...props} pathLine="" />);

		expect(actual).toMatchSnapshot();
	});

	test('should render usage section', () => {
		const actual = shallow(
			<ReactComponentRenderer
				{...props}
				tabButtons={<div>tab buttons</div>}
				tabBody={<div>tab body</div>}
			/>
		);

		expect(actual).toMatchSnapshot();
	});

	test('should render description', () => {
		const actual = shallow(
			<ReactComponentRenderer {...props} description={<div>description</div>} />
		);

		expect(actual).toMatchSnapshot();
	});

	test('should render docs', () => {
		const actual = shallow(<ReactComponentRenderer {...props} docs={<div>docs</div>} />);

		expect(actual).toMatchSnapshot();
	});

	test('should render examples', () => {
		const actual = shallow(
			<ReactComponentRenderer
				{...props}
				examples={[<div key={1}>example 1</div>, <div key={2}>example 2</div>]}
			/>
		);

		expect(actual).toMatchSnapshot();
	});
});
