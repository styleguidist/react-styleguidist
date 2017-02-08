import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import TableOfContents from 'rsg-components/TableOfContents';
import Message from 'rsg-components/Message';
import StyleGuideRenderer from 'rsg-components/StyleGuide/StyleGuideRenderer';
import Sections from 'rsg-components/Sections';
import { DOCS_CONFIG, HOMEPAGE } from '../../../scripts/consts';

export default class StyleGuide extends Component {
	static propTypes = {
		codeKey: PropTypes.number.isRequired,
		config: PropTypes.object.isRequired,
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
		sidebar: PropTypes.bool,
		singleExample: PropTypes.bool,
	};

	static childContextTypes = {
		codeKey: PropTypes.number.isRequired,
		config: PropTypes.object.isRequired,
		singleExample: PropTypes.bool,
	};

	static defaultProps = {
		sidebar: true,
	};

	getChildContext() {
		return {
			codeKey: this.props.codeKey,
			config: this.props.config,
			singleExample: this.props.singleExample,
		};
	}

	renderTableOfContents(components, sections) {
		return <TableOfContents components={components} sections={sections} />;
	}

	render() {
		const { config, components, sections, sidebar } = this.props;

		return (
			<StyleGuideRenderer
				title={config.title}
				homepageUrl={HOMEPAGE}
				toc={this.renderTableOfContents(components, sections)}
				sidebar={isEmpty(sections) ? false : sidebar}
			>
				{
					!isEmpty(sections)
						? <Sections sections={sections} sidebar={sidebar} />
						: <Message>
								No components or sections found.
								Check [the `components` and `sections` options]({DOCS_CONFIG}) in your style guide
								config.
							</Message>
				}
			</StyleGuideRenderer>
		);
	}
}
