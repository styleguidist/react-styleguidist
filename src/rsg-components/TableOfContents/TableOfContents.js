import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';
import { debounce } from 'lodash';
import { filterSectionsByName } from '../../utils/utils';

export default class TableOfContents extends Component {
	static propTypes = {
		sections: PropTypes.array.isRequired,
		searchTerm: PropTypes.string,
		onSearchTermChange: PropTypes.func,
		updateStyleguide: PropTypes.func,
	};

	state = {
		TOCsearchTerm: '',
		filteredSections: [],
	};

	componentWillMount() {
		const { sections, searchTerm } = this.props;

		this.filterSections(searchTerm, sections);
	}

	// Handles listMode update
	componentWillReceiveProps(nextProps) {
		const { sections, searchTerm } = nextProps;

		this.filterSections(searchTerm, sections);
	}

	// Updates Styleguidist state
	// using updateSections function passed as prop
	updateStyleguide = debounce((searchTerm, filteredSections, updateStyleguide) => {
		updateStyleguide(searchTerm, filteredSections);
	}, 200);

	filterSections(TOCsearchTerm, sections) {
		// If there is only one section, we treat it as a root section
		// In this case the name of the section won't be rendered and it won't get left padding
		const firstLevel = sections.length === 1 ? sections[0].components : sections;
		const filteredSections = filterSectionsByName(firstLevel, TOCsearchTerm);

		this.setState({ TOCsearchTerm, filteredSections });

		return filteredSections;
	}

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
		const { filteredSections } = this.state;

		return this.renderLevel(filteredSections);
	}

	render() {
		const { sections, updateStyleguide } = this.props;
		const { TOCsearchTerm } = this.state;

		return (
			<TableOfContentsRenderer
				searchTerm={TOCsearchTerm}
				onSearchTermChange={TOCsearchTerm => {
					const updatedSections = this.filterSections(TOCsearchTerm, sections);
					this.updateStyleguide(TOCsearchTerm, updatedSections, updateStyleguide);
				}}
			>
				{this.renderSections()}
			</TableOfContentsRenderer>
		);
	}
}
