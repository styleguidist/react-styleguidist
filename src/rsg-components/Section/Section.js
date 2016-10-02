import React, { Component, PropTypes } from 'react';
import Examples from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';

export default class Section extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		section: PropTypes.object.isRequired,
		sidebar: PropTypes.bool,
	};

	renderContent(highlightTheme, examples) {
		if (!examples) {
			return null;
		}

		return (
			<Examples highlightTheme={highlightTheme} examples={examples} />
		);
	}

	renderComponents(highlightTheme, components, sections, sidebar) {
		if (!components && !sections) {
			return null;
		}

		return (
			<Components
				highlightTheme={highlightTheme}
				components={components || []}
				sections={sections || []}
				sidebar={sidebar}
			/>
		);
	}

	render() {
		const { highlightTheme, section, sidebar } = this.props;

		return (
			<SectionRenderer
				name={section.name}
				content={this.renderContent(highlightTheme, section.content)}
				components={this.renderComponents(highlightTheme, section.components, section.sections, sidebar)}
			/>
		);
	}
}
