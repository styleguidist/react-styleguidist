import renderer from 'react-test-renderer';

import React from 'react';
import { Text } from 'react-native';
import SimpleCard from './SimpleCard';

it('renders without crashing', () => {
	const rendered = renderer
		.create(
			<SimpleCard title="Basic Card">
				<Text>Basic example 1</Text>
			</SimpleCard>
		)
		.toJSON();
	expect(rendered).toBeTruthy();
});

it('Can change card color', () => {
	const rendered = renderer.create(
		<SimpleCard title="Basic Card" color="red">
			<Text>Basic example 1</Text>
		</SimpleCard>
	);
	expect(rendered).toMatchSnapshot();
});

it('Can change title text color', () => {
	const rendered = renderer.create(
		<SimpleCard title="Basic Card" titleTextColor="red">
			<Text>Basic example 1</Text>
		</SimpleCard>
	);
	expect(rendered).toMatchSnapshot();
});
