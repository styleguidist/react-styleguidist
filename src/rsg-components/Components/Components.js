import { Component, PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Renderer from 'rsg-components/ReactComponent/Renderer';
import Section from 'rsg-components/Section';
import SRenderer from 'rsg-components/Section/Renderer';

export default class Components extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired
	};

	renderComponents() {
		const { highlightTheme, components, sections } = this.props;
		const ComponentRenderer = ReactComponent(Renderer);
		const SectionRenderer = Section(SRenderer);

		return components.map((component) => {
			return (<ComponentRenderer key={component.name} highlightTheme={highlightTheme} component={component} />);
		}).concat(sections.map((section) => {
			return (<SectionRenderer key={section.name} highlightTheme={highlightTheme} section={section} />);
		}));
	}

	render() {
		return (
			<div>
				{this.renderComponents()}
			</div>
		);
	}
}