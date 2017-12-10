import React from 'react';
import { View } from 'react-native';

class BlueBoxes extends React.Component {
	render() {
		return (
			<View style={{ padding: 40, backgroundColor: '#191f58' }}>
				<View style={{ padding: 40, backgroundColor: '#323875' }}>
					<View style={{ padding: 40, backgroundColor: '#535993' }} />
				</View>
			</View>
		);
	}
}

export default BlueBoxes;
