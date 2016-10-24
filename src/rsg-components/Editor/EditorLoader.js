import React, { Component } from 'react';

export default class EditorLoader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editor: null,
		};
	}

	componentDidMount() {
		require.ensure(['rsg-components/Editor'], require => {
			this.setState({
				editor: require('rsg-components/Editor').default,
			});
		});
	}

	render() {
		if (!this.state.editor) {
			return <div>Loading...</div>;
		}

		return <this.state.editor {...this.props} />;
	}
}
