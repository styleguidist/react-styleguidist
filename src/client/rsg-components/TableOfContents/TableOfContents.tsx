import React, { Component } from 'react';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';
import filterSectionsByName from '../../utils/filterSectionsByName';
import { getHash } from '../../utils/handleHash';
import * as Rsg from '../../../typings';

interface TableOfContentsProps {
	sections: Rsg.Section[];
	useRouterLinks?: boolean;
	tocMode?: string;
	loc?: { hash: string; pathname: string };
}

export default class TableOfContents extends Component<TableOfContentsProps> {
	public state = {
		searchTerm: '',
	};

	private renderLevel(
		sections: Rsg.TOCItem[],
		useRouterLinks = false,
		hashPath: string[] = [],
		useHashId = false
	): { content: React.ReactElement; containsSelected: boolean } {
		// Match selected component in both basic routing and pagePerSection routing.
		const { hash, pathname } = this.props.loc ?? window.location;
		const windowHash = pathname + (useRouterLinks ? hash : getHash(hash));

		let childrenContainSelected = false;
		const processedItems = sections.map((section) => {
			const children = [...(section.sections || []), ...(section.components || [])];
			const sectionDepth = section.sectionDepth || 0;
			const childHashPath =
				sectionDepth === 0 && useHashId
					? hashPath
					: [...hashPath, section.name ? section.name : '-'];

			const { content, containsSelected } =
				children.length > 0
					? this.renderLevel(children, useRouterLinks, childHashPath, sectionDepth === 0)
					: { content: undefined, containsSelected: false };

			const selected =
				(!useRouterLinks && section.href ? getHash(section.href) : section.href) === windowHash;

			if (containsSelected || selected) {
				childrenContainSelected = true;
			}

			return {
				...section,
				heading: !!section.name && children.length > 0,
				content,
				selected,
				shouldOpenInNewTab: !!section.external && !!section.externalLink,
				initialOpen: this.props.tocMode !== 'collapse' || containsSelected || section.expand,
				forcedOpen: !!this.state.searchTerm.length,
			};
		});
		return {
			content: <ComponentsList items={processedItems} />,
			containsSelected: childrenContainSelected,
		};
	}

	private renderSections() {
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
		const filtered = firstLevel
			? filterSectionsByName(firstLevel as Rsg.TOCItem[], searchTerm)
			: firstLevel || [];

		return this.renderLevel(filtered, useRouterLinks).content;
	}

	public render() {
		const handleSearchTermChange = (searchTerm: string) => this.setState({ searchTerm });
		return (
			<TableOfContentsRenderer
				searchTerm={this.state.searchTerm}
				onSearchTermChange={handleSearchTermChange}
			>
				{this.renderSections()}
			</TableOfContentsRenderer>
		);
	}
}
