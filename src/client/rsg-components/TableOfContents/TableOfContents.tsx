import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';
import filterSectionsByName from '../../utils/filterSectionsByName';
import filterComponentsByName from '../../utils/filterComponentsByName';
import { getHash } from '../../utils/handleHash';
import * as Rsg from '../../../typings';

interface TableOfContentsProps {
	sections: Rsg.Section[];
	useRouterLinks?: boolean;
	tocMode?: string;
	loc: { hash: string; pathname: string };
}

export default class TableOfContents extends Component<TableOfContentsProps> {
	public static propTypes = {
		sections: PropTypes.array.isRequired,
		useRouterLinks: PropTypes.bool,
		tocMode: PropTypes.string,
		loc: PropTypes.object,
	};

	public static defaultProps = {
		loc: window.location,
	};

	public state = {
		searchTerm: '',
	};

	private renderLevel(
		sections: (Rsg.Section | Rsg.Component)[],
		useRouterLinks = false,
		hashPath: string[] = [],
		useHashId = false
	): { content: React.ReactElement; containsSelected: boolean } {
		// Match selected component in both basic routing and pagePerSection routing.
		const { hash, pathname } = this.props.loc;
		const windowHash = pathname + (useRouterLinks ? hash : getHash(hash));

		let childrenContainSelected = false;
		const processedItems: Rsg.TOCItem[] = sections.map((tocItem) => {
			const children = [
				...('sections' in tocItem ? tocItem.sections || [] : []),
				...('components' in tocItem ? tocItem.components || [] : []),
			];
			const sectionDepth = 'sectionDepth' in tocItem ? tocItem.sectionDepth || 0 : 0;
			const childHashPath =
				sectionDepth === 0 && useHashId
					? hashPath
					: [...hashPath, tocItem.name ? tocItem.name : '-'];

			const { content, containsSelected } =
				children.length > 0
					? this.renderLevel(children, useRouterLinks, childHashPath, sectionDepth === 0)
					: { content: undefined, containsSelected: false };

			const selected =
				(!useRouterLinks && tocItem.href ? getHash(tocItem.href) : tocItem.href) === windowHash;

			if (containsSelected || selected) {
				childrenContainSelected = true;
			}

			return {
				...tocItem,
				heading: !!tocItem.name && children.length > 0,
				content,
				selected,
				shouldOpenInNewTab:
					!!('external' in tocItem && tocItem.external) &&
					!!('externalLink' in tocItem && tocItem.externalLink),
				initialOpen:
					this.props.tocMode !== 'collapse' ||
					containsSelected ||
					('expand' in tocItem && tocItem.expand),
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
		// TODO: Extract into a function
		const filtered =
			sections.length === 1
				? // only use subsections if there actually are subsections
				  sections[0].sections && sections[0].sections.length > 0
					? filterSectionsByName(sections[0].sections, searchTerm)
					: filterComponentsByName(sections[0].components || [], searchTerm)
				: filterSectionsByName(sections, searchTerm);

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
