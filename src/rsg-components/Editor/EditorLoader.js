import React, { Component } from 'react';

export default class EditorLoader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editor: null,
		};
	}

	componentDidMount() {
		require.ensure(['rsg-components/Editor/Editor'], require => {
			this.setState({
				editor: require('rsg-components/Editor/Editor').default,
			});
		});
	}

	render() {
		const Editor = this.state.editor;
		if (!Editor) {
			return <div>Loading...</div>;
		}

		return <Editor {...this.props} />;
	}
}
