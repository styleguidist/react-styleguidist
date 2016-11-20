import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import Components from 'rsg-components/Components';
import TableOfContents from 'rsg-components/TableOfContents';
import Message from 'rsg-components/Message';
import StyleGuideRenderer from 'rsg-components/StyleGuide/StyleGuideRenderer';
import { HOMEPAGE, DOCS_CONFIG } from '../../../scripts/consts';

export default class StyleGuide extends Component {
	static propTypes = {
		config: PropTypes.object.isRequired,
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
		sidebar: PropTypes.bool,
		singleExample: PropTypes.bool,
	};
	static defaultProps = {
		sidebar: true,
	};
	static childContextTypes = {
		codeKey: PropTypes.number.isRequired,
		config: PropTypes.object.isRequired,
		singleExample: PropTypes.bool,
	};

	getChildContext() {
		return {
			codeKey: this.props.codeKey,
			config: this.props.config,
			singleExample: this.props.singleExample,
		};
	}

	renderComponents(components, sections, sidebar, singleExample) {
		if (!isEmpty(components) || !isEmpty(sections)) {
			return (
				<Components
					components={components}
					sections={sections}
					sidebar={sidebar}
				/>
			);
		}

		return (
			<Message>
				No components or sections found.
				Check [the `components` and `sections` options]({DOCS_CONFIG}) in your style guide config.
			</Message>
		);
	}

	renderTableOfContents(components, sections) {
		return <TableOfContents components={components} sections={sections} />;
	}

	render() {
		let { config, components, sections, sidebar, singleExample } = this.props;

		return (
			<StyleGuideRenderer
				title={config.title}
				homepageUrl={HOMEPAGE}
				components={this.renderComponents(components, sections, sidebar, singleExample)}
				sections={sections}
				toc={this.renderTableOfContents(components, sections)}
				sidebar={(isEmpty(components) && isEmpty(sections)) ? false : sidebar}
			/>
		);
	}
}
