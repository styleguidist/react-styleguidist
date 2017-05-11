/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/jsx-filename-extension: off
*/
import React, { Component } from 'react';
import EditorLoaderRenderer from 'rsg-components/Editor/EditorLoaderRenderer';

export default class EditorLoader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editor: null,
		};
	}

	componentDidMount() {
		require.ensure(['rsg-components/Editor/Editor'], (require) => {
			this.setState({
				editor: require('rsg-components/Editor/Editor').default,
			});
		});
	}

	render() {
		const Editor = this.state.editor;
		if (!Editor) {
			return <EditorLoaderRenderer />;
		}

		return <Editor {...this.props} />;
	}
}
