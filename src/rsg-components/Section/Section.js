import React, { Component, PropTypes } from 'react';
import Examples from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';

export default class Section extends Component {
	static propTypes = {
		section: PropTypes.object.isRequired,
		sidebar: PropTypes.bool,
	};

	renderContent(examples) {
		if (!examples) {
			return null;
		}

		return (
			<Examples examples={examples} />
		);
	}

	renderComponents(components, sections, sidebar) {
		if (!components && !sections) {
			return null;
		}

		return (
			<Components
				components={components || []}
				sections={sections || []}
				sidebar={sidebar}
			/>
		);
	}

	render() {
		const { section, sidebar } = this.props;
		return (
			<SectionRenderer
				name={section.name}
				content={this.renderContent(section.content)}
				components={this.renderComponents(section.components, section.sections, sidebar)}
			/>
		);
	}
}
