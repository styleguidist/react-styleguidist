import { Component, PropTypes } from 'react';
import Section from 'rsg-components/Section';
import Renderer from 'rsg-components/Section/Renderer';

export default class Sections extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		sections: PropTypes.array.isRequired
	};

	renderSections() {
		const { highlightTheme, sections } = this.props;
		const SectionRenderer = Section(Renderer);

		return sections.map((section) => {
			return (<SectionRenderer key={section.name} highlightTheme={highlightTheme} section={section} />);
		});
	}

	render() {
		return (
			<div>
				{this.renderSections()}
			</div>
		);
	}
}