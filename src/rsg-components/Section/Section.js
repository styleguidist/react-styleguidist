import React, { Component, PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Playground from 'rsg-components/Playground';
import Components from 'rsg-components/Components';

const Section = (Renderer) => class extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		section: PropTypes.object.isRequired
	};

	renderContent(highlightTheme, examples) {
		if (!examples) {
			return null;
		}

		return examples.map((example, index) => {
			switch (example.type) {
				case 'code':
					return (
						<Playground
							code={example.content}
							evalInContext={example.evalInContext}
							highlightTheme={highlightTheme}
							key={index}
						/>
					);
				case 'markdown':
					return (
						<Markdown
							text={example.content}
							key={index}
						/>
					);
			}
		});
	}

	renderComponents(highlightTheme, components, sections) {
		if (!components && !sections) {
			return null;
		}

		return (
			<Components highlightTheme={highlightTheme}
				components={components || []}
				sections={sections || []}
			/>
		);
	}

	render() {
		const {highlightTheme, section} = this.props;

		return (
			<Renderer
				name={section.name}
				content={this.renderContent(highlightTheme, section.content)}
				components={this.renderComponents(highlightTheme, section.components, section.sections)}
			/>
		);
	}
};

export default Section;
