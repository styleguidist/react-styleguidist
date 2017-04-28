import React from 'react';
import { ArgumentsRenderer } from './ArgumentsRenderer';

describe('Arguments', () => {
	function createTestParameter(title, name = 'test', description = 'Test description', type = { name: 'string' }) {
		return {
			title,
			name,
			description,
			type,
		};
	}

	const mockParam = {
		param: [createTestParameter('param', 'one'), createTestParameter('param', 'two')],
	};

	const mockArg = {
		arg: [createTestParameter('arg')],
	};

	const mockArgument = {
		argument: [createTestParameter('argument')],
	};

	it('renderer should render Arguments for one @param tag', () => {
		const tags = {
			param: [mockParam.param[0]],
		};

		const actual = render(
			<ArgumentsRenderer classes={{}} tags={tags} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should render Arguments for two @param tags', () => {
		const actual = render(
			<ArgumentsRenderer classes={{}} tags={mockParam} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should render Arguments for @arg tag', () => {
		const actual = render(
			<ArgumentsRenderer classes={{}} tags={mockArg} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should render Arguments for @argument tag', () => {
		const actual = render(
			<ArgumentsRenderer classes={{}} tags={mockArgument} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should render Arguments for mixed tags', () => {
		const mixed = {
			...mockParam,
			...mockArg,
			...mockArgument,
		};

		const actual = render(
			<ArgumentsRenderer classes={{}} tags={mixed} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should still render for incomplete documentation', () => {
		const tags = {
			param: [
				createTestParameter('param', 'testNoDescription', null),
				createTestParameter('param', 'testNoType', 'Test description', null),
			],
		};

		const actual = render(
			<ArgumentsRenderer tags={tags} classes={{}} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should render empty for empty documentation', () => {
		const actual = shallow(
			<ArgumentsRenderer tags={{}} classes={{}} />
		);

		expect(actual.node).toBe(null);
	});
});

