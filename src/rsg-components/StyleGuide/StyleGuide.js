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
		this.setState({ filter: e.target.value });
	}

	handleItemFocus(item, e) {
		if (this.state.active && this.state.active.name === item.name) {
			this.setState({ active: null });
		}
		else {
			this.setState({ active: item });
		}
	}

	render() {
		const components = this.state.components.map(component => {
			const regexp = new RegExp(this.state.filter, 'gi');
			component = component.set('visible', regexp.test(component.get('name')));

			if (this.state.active && this.state.active !== null) {
				component = component.set('active', this.state.active.name === component.get('name'));
			} else {
				component = component.set('active', true);
			}

			return component
		})

		console.log(components.toJS())

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
