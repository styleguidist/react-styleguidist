import React, { Component } from 'react';
import EditorLoaderRenderer from 'rsg-components/Editor/EditorLoaderRenderer';
import Editor from './Editor';

export default class EditorLoader extends Component {
	state = {
		editor: null,
	};

	// componentDidMount() {
   //  System.import('rsg-components/Editor/Editor').then(module => {
   //    console.log(module);
   //    this.setState({ editor: module.default });
   //  }).catch((err) => {
   //    console.log(err);
   //  });
	// }

	render() {
		if (Editor) {
			return <Editor {...this.props} />;
		}

		return <EditorLoaderRenderer />;
	}
}
