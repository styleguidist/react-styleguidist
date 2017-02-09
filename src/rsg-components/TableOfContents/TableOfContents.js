import React, { Component, PropTypes } from 'react';
import { filterComponentsByName, getFilterRegExp } from '../../utils/utils';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';

export default class TableOfContents extends Component {
	static propTypes = {
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

	getSections(sections = [], searchTerm) {
		const regExp = getFilterRegExp(searchTerm);
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
		const { sections } = this.props;

		// If there is only one section, we treat it as a root section
		// In this case the name of the section won't be rendered and it won't get left padding
		const content = sections.length === 1
			? this.renderLevel(sections[0].components, sections[0].sections, searchTerm)
			: this.renderLevel(null, sections, searchTerm);
		return (
			<TableOfContentsRenderer
				searchTerm={searchTerm}
				onSearchTermChange={searchTerm => this.setState({ searchTerm })}
			>
				{content}
			</TableOfContentsRenderer>
		);
	}
}
