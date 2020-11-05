import React, { PureComponent } from 'react';
// eslint-disable-next-line import/extensions
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderWidth: 1,
		marginBottom: 12,
	},
	titleView: {
		padding: 12,
	},
	titleText: {
		fontWeight: '600',
		fontSize: 18,
	},
	contentContainer: {
		padding: 12,
	},
});

export default class SimpleCard extends PureComponent {
	static propTypes = {
		/** Contents of the card */
		children: PropTypes.node.isRequired,
		/** Title of the card */
		title: PropTypes.string.isRequired,
		/** The color for the card */
		color: PropTypes.string,
		/** The color for title text */
		titleTextColor: PropTypes.string,
	};

	static defaultProps = {
		color: '#333',
		titleTextColor: '#fff',
	};

	render() {
		const { children, color, title, titleTextColor } = this.props;
		return (
			<View style={[styles.container, { borderColor: color }]}>
				<View style={[styles.titleView, { backgroundColor: color }]}>
					<Text style={[styles.titleText, { color: titleTextColor }]}>{title}</Text>
				</View>
				<View style={styles.contentContainer}>{children}</View>
			</View>
		);
	}
}
