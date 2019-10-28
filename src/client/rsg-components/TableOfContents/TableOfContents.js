import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';
import filterSectionsByName from '../../utils/filterSectionsByName';

export default class TableOfContents extends Component {
	static propTypes = {
		sections: PropTypes.array.isRequired,
		useRouterLinks: PropTypes.bool,
	};
	state = {
		searchTerm: '',
	};

	renderLevel(sections, useRouterLinks = false, hashPath = [], useHashId = false) {
		const items = sections.map(section => {
			const children = [...(section.sections || []), ...(section.components || [])];
			const sectionDepth = section.sectionDepth || 0;
			const childHashPath =
				sectionDepth === 0 && useHashId ? hashPath : [...hashPath, section.name];
			return {
				...section,
				heading: !!section.name && children.length > 0,
				content:
					children.length > 0 &&
					this.renderLevel(children, useRouterLinks, childHashPath, sectionDepth === 0),
			};
		});
		return (
			<ComponentsList
				items={items}
				hashPath={hashPath}
				useHashId={useHashId}
				useRouterLinks={useRouterLinks}
			/>
		);
	}

	renderSections() {
		const { searchTerm } = this.state;
		const { sections, useRouterLinks } = this.props;
		// If there is only one section, we treat it as a root section
		// In this case the name of the section won't be rendered and it won't get left padding
		// Since a section can contain only other sections,
		// we need to make sure not to loose the subsections.
		// We will treat those subsections as the new roots.
		const firstLevel =
			sections.length === 1
				? // only use subsections if there actually are subsections
				  sections[0].sections && sections[0].sections.length
					? sections[0].sections
					: sections[0].components
				: sections;
		const filtered = filterSectionsByName(firstLevel, searchTerm);

		return this.renderLevel(filtered, useRouterLinks);
	}

	render() {
		return (
			<TableOfContentsRenderer
				searchTerm={this.state.searchTerm}
				onSearchTermChange={searchTerm => this.setState({ searchTerm })}
			>
				{this.renderSections()}
			</TableOfContentsRenderer>
		);
	}
}
