import React, { Component, PropTypes } from 'react';
import Section from 'rsg-components/Section';
import SectionsRenderer from 'rsg-components/Sections/SectionsRenderer';

export default class Sections extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		sections: PropTypes.array.isRequired,
		sidebar: PropTypes.bool,
	};

	renderSections() {
		const { highlightTheme, sections, sidebar } = this.props;

		return sections.map(section => (
			<Section
				key={section.name}
				highlightTheme={highlightTheme}
				section={section}
				sidebar={sidebar}
			/>
		));
	}

	render() {
		return (
			<SectionsRenderer sections={this.renderSections()} />
		);
	}
}
