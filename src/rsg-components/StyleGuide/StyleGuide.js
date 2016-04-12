import { Component } from 'react';
import Immutable from 'immutable';
import Layout from 'rsg-components/Layout';

export default class StyleGuide extends Component {
	constructor (props){
		super(props)
		this.state = {
			components: Immutable.fromJS(this.props.components),
			sections: Immutable.fromJS(this.props.sections),
			filter: ''
		}
	}

	handleSearchChange(e) {
		this.setState({ filter: e.target.value })
	}

	handleItemFocus(e) {
		console.log('item focus')
	}

	render() {
		const components = this.state.components.map(component => {
			const regexp = new RegExp(this.state.filter, 'gi');
			return component.set('visible', regexp.test(component.get('name')));
		})

		return (
			<Layout
				{...this.props}
				components={components.toJS()}
				sections={this.state.sections.toJS()}
				onSearchChange={this.handleSearchChange.bind(this)}
				onItemFocus={this.handleItemFocus.bind(this)}
				filter={this.state.filter}
			/>
		);
	}
}
