import { Component } from 'react';
import Layout from 'rsg-components/Layout';
import Renderer from 'rsg-components/Layout/Renderer';

export default class StyleGuide extends Component {
	render() {
		const LayoutRenderer = Layout(Renderer);

		return (
			<LayoutRenderer {...this.props}/>
		);
	}
}
