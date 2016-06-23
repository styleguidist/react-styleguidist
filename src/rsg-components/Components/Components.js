import React, { Component, PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Renderer from 'rsg-components/ReactComponent/Renderer';
import Sections from 'rsg-components/Sections';

export default class Components extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
		sidebar: PropTypes.bool,
	};

	renderComponents() {
		const { highlightTheme, components, sidebar } = this.props;
		const ComponentRenderer = ReactComponent(Renderer);

		return components.map((component) => {
			return (
				<ComponentRenderer
					key={component.name}
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
			<div>
				{this.renderComponents()}
				{this.renderSections()}
			</div>
		);
	}
}
