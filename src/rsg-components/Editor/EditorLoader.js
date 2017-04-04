import React, { Component } from 'react';
import EditorLoaderRenderer from 'rsg-components/Editor/EditorLoaderRenderer';

/* istanbul ignore if  */
// FIX: require.ensure polyfill for tests
// Can’t make it work from tests, it shouldn’t be in the app code.
if (typeof require.ensure !== 'function') {
	require.ensure = (d, c) => c(require);
}

export default class EditorLoader extends Component {
	state = {
		editor: null,
	};

	componentDidMount() {
		require.ensure(['rsg-components/Editor/Editor'], require => {
			this.setState({
				editor: require('rsg-components/Editor/Editor').default,
			});
		});
	}

	render() {
		const Editor = this.state.editor;
		if (Editor) {
			return <Editor {...this.props} />;
		}

		return <EditorLoaderRenderer />;
	}
}
