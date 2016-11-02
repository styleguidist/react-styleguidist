import React, { Component, PropTypes } from 'react';
import Section from 'rsg-components/Section';
import Renderer from 'rsg-components/Section/Renderer';

export default class Sections extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		sections: PropTypes.array.isRequired,
		sidebar: PropTypes.bool,
	};

	renderSections() {
		const { highlightTheme, sections, sidebar } = this.props;
		const SectionRenderer = Section(Renderer);

		return sections.map(section => (
			<SectionRenderer
				key={section.name}
				highlightTheme={highlightTheme}
				section={section}
				sidebar={sidebar}
			/>
		));
	}

	render() {
		return (
			<div className="rsg-sections">
				{this.renderSections()}
			</div>
		);
	}
}
