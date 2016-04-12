import { Component } from 'react';
import Immutable from 'immutable';
import Layout from 'rsg-components/Layout';
import Renderer from 'rsg-components/Layout/Renderer';

export default class StyleGuide extends Component {
	constructor (props){
		super(props)
		this.state = {
			components: Immutable.fromJS(this.props.components),
			sections: Immutable.fromJS(this.props.sections)
		}
	}

	handleSearchChange(e) {
		console.log('search change')
	}

	handleItemFocus(e) {
		console.log('item focus')
	}

	render() {
		const LayoutRenderer = Layout(Renderer);

		return (
			<LayoutRenderer
				{...this.props}
				components={this.state.components.toJS()}
				sections={this.state.sections.toJS()}
				onSearchChange={this.handleSearchChange.bind(this)}
				onItemFocus={this.handleItemFocus.bind(this)}
			/>
		);
	}
}
