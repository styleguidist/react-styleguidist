import React, { Component, PropTypes } from 'react';
import { filterComponentsByName, getFilterRegExp } from '../../utils/utils';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';

export default class TableOfContents extends Component {
	static propTypes = {
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
		};
	}

	getComponents(components, searchTerm) {
		return filterComponentsByName(components || [], searchTerm);
	}

	getSections(sections, searchTerm) {
		const regExp = getFilterRegExp(searchTerm);
		sections = sections || [];
		return sections.reduce((filteredSections, { name, components: subComponents = [], sections: subSections }) => {
			subComponents = this.getComponents(subComponents, searchTerm);
			if (subComponents.length || !searchTerm || regExp.test(name)) {
				filteredSections.push({
					heading: true,
					name,
					content: this.renderLevel(subComponents, subSections, searchTerm),
				});
			}
			return filteredSections;
		}, []);
	}

	renderLevel(components, sections, searchTerm) {
		const items = [
			...this.getComponents(components, searchTerm),
			...this.getSections(sections, searchTerm),
		];
		return (
			<ComponentsList items={items} />
		);
	}

	render() {
		const { searchTerm } = this.state;
		const { components, sections } = this.props;
		return (
			<TableOfContentsRenderer
				searchTerm={searchTerm}
				items={this.renderLevel(components, sections, searchTerm)}
				onSearchTermChange={searchTerm => this.setState({ searchTerm })}
			/>
		);
	}
}
