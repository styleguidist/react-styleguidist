import React, { Component, PropTypes } from 'react';

class TableOfContents extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
		};
	}

	renderLevel(components, sections, searchTerm) {
		if (searchTerm !== '') {
			let regExp = new RegExp(searchTerm.split('').join('.*'), 'gi');
			components = components.filter(component => component.name.match(regExp));
		}

		return (
			<ul>
				{(components || []).map(({ name }) => (
					<li key={name}>
						<a href={'#' + name}>{name}</a>
					</li>
				))}
				{(sections || []).map(({ name, components: subComponents, sections: subSections }) => (
					<li key={name}>
						<a href={'#' + name}>{name}</a>
						{this.renderLevel(subComponents, subSections, searchTerm)}
					</li>
				))}
			</ul>
		);
	}

	render() {
		let { searchTerm } = this.state;
		let { components, sections } = this.props;

		searchTerm = searchTerm.trim();

		return (
			<div>
				<input
					placeholder="Filter by name"
					onChange={event => this.setState({ searchTerm: event.target.value })}
					value={searchTerm}
				/>
				{this.renderLevel(components, sections, searchTerm)}
			</div>
		);
	}
}

TableOfContents.propTypes = {
	components: PropTypes.array.isRequired,
	sections: PropTypes.array.isRequired,
};

export default TableOfContents;
