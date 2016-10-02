import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import Components from 'rsg-components/Components';
import TableOfContents from 'rsg-components/TableOfContents';
import Message from 'rsg-components/Message';
import StyleGuideRenderer from 'rsg-components/StyleGuide/StyleGuideRenderer';

const DOCS_URL = 'https://github.com/sapegin/react-styleguidist/blob/master/docs/Configuration.md';

export default class StyleGuide extends Component {
	static propTypes = {
		config: PropTypes.object.isRequired,
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
		sidebar: PropTypes.bool,
	};

	static defaultProps = {
		sidebar: true,
	};

	static childContextTypes = {
		config: PropTypes.object.isRequired,
	};

	getChildContext() {
		return {
			config: this.props.config,
		};
	}

	renderComponents(config, components, sections, sidebar) {
		if (!isEmpty(components) || !isEmpty(sections)) {
			return (
				<Components
					highlightTheme={config.highlightTheme}
					components={components}
					sections={sections}
					sidebar={sidebar}
				/>
			);
		}

		return (
			<Message>
				No components or sections found.
				Check [the `components` and `sections` options]({DOCS_URL}) in your style guide config.
			</Message>
		);
	}

	renderTableOfContents(components, sections) {
		return <TableOfContents components={components} sections={sections} />;
	}

	render() {
		let { config, components, sections, sidebar } = this.props;

		return (
			<StyleGuideRenderer
				title={config.title}
				components={this.renderComponents(config, components, sections, sidebar)}
				sections={sections}
				toc={this.renderTableOfContents(components, sections)}
				sidebar={sidebar}
			/>
		);
	}
}
