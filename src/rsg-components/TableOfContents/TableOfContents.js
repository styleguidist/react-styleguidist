import React, { Component, PropTypes } from 'react';

import s from './TableOfContents.css';

class TableOfContents extends Component {

	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
			filteredComponents:[]
		};

		this.handleChange = this.handleChange.bind(this);
	}

	searchFilter(value, component) {
		const regex = new RegExp(value.toLowerCase().toString(), 'g');
		return component.name.toLowerCase().match(regex);
	}

	handleChange(e) {

		let components = this.props.components;

		if(e.target.value !== '') {
			components = components.filter(this.searchFilter.bind(null, e.target.value));
		}

		this.setState({
			searchTerm: e.target.value,
			filteredComponents: components
		})
	}

	componentDidMount() {
		this.setState({
			filteredComponents: this.props.components
		 })
	}

	render() {
		const { filteredComponents, searchTerm } = this.state;
		return (
			<div>
				<input
					className={s.find}
					placeholder="Find component..."
					onChange={this.handleChange}
					value={searchTerm} />
				<ul className={s.root}>
					{filteredComponents.map(({name}) => (
						<li className={s.item} key={name}>
							<a className={s.link} href={'#' + name}>{name}</a>
						</li>
					))}
				</ul>
			</div>
		);
	}
};

TableOfContents.propTypes = {
	components: PropTypes.array.isRequired
};

export default TableOfContents;
