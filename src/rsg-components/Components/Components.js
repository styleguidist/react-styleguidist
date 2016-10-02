import React, { Component, PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Sections from 'rsg-components/Sections';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

export default class Components extends Component {
	static propTypes = {
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
		sidebar: PropTypes.bool,
	};

	renderComponents() {
		const { components, sidebar } = this.props;

		return components.map(component => {
			return (
				<ReactComponent
					key={component.filepath}
					component={component}
					sidebar={sidebar}
				/>
			);
		});
	}

	renderSections() {
		const { sections, sidebar } = this.props;

		return (
			<Sections
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
