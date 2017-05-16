import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filterSectionsByName } from '../../utils/utils';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';

export default class TableOfContents extends Component {
	static propTypes = {
		sections: PropTypes.array.isRequired,
		searchTerm: PropTypes.string,
		onSearchTermChange: PropTypes.func,
	};
	// state = {
	// searchTerm: '',
	// };

	renderLevel(sections) {
		const items = sections.map(section => {
			const children = [...(section.sections || []), ...(section.components || [])];
			return Object.assign({}, section, {
				heading: !!section.name && children.length > 0,
				content: children.length > 0 && this.renderLevel(children),
			});
		});
		return <ComponentsList items={items} />;
	}

	renderSections() {
		// const { searchTerm } = this.state;
		const { sections, searchTerm } = this.props;

		// If there is only one section, we treat it as a root section
		// In this case the name of the section won't be rendered and it won't get left padding
		const firstLevel = sections.length === 1 ? sections[0].components : sections;
		const filtered = filterSectionsByName(firstLevel, searchTerm);

		return this.renderLevel(filtered);
	}
	// onSearchTermChange={searchTerm => this.setState({ searchTerm })}

	render() {
		// const { searchTerm } = this.state;
		const { onSearchTermChange, searchTerm } = this.props;

		return (
			<TableOfContentsRenderer searchTerm={searchTerm} onSearchTermChange={onSearchTermChange}>
				{this.renderSections()}
			</TableOfContentsRenderer>
		);
	}
}
