import React, { Component } from 'react';
// eslint-disable-next-line import/extensions
import { StyleSheet, Text, ScrollView } from 'react-native';
import SimpleCard from './SimpleCard';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		margin: 12,
		marginTop: 30,
	},
});

export default class Root extends Component {
	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<SimpleCard title="Welcome">
					<Text>Open up App.js to start working on your app!</Text>
					<Text>Changes you make will automatically reload.</Text>
					<Text>Shake your phone to open the developer menu.</Text>
				</SimpleCard>
				<SimpleCard title="Card 2" color="#26572c">
					<Text>This is a second card.</Text>
				</SimpleCard>
				<SimpleCard title="Card 3">
					<Text>This is a third card.</Text>
				</SimpleCard>
			</ScrollView>
		);
	}
}
