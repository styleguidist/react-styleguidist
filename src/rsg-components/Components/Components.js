import React, { Component, PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Sections from 'rsg-components/Sections';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

export default class Components extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
		sidebar: PropTypes.bool,
	};

	renderComponents() {
		const { highlightTheme, components, sidebar } = this.props;

		return components.map(component => {
			return (
				<ReactComponent
					key={component.filepath}
					highlightTheme={highlightTheme}
					component={component}
					sidebar={sidebar}
				/>
			);
		});
	}

	renderSections() {
		const { highlightTheme, sections, sidebar } = this.props;

		return (
			<Sections
				highlightTheme={highlightTheme}
				sections={sections}
				sidebar={sidebar}
			/>
		);
	}

	render() {
		return (
			<ComponentsRenderer
				components={this.renderComponents()}
				sections={this.renderSections()}
			/>
		);
	}
}
