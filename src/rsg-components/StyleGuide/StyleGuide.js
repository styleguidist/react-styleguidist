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
		sections: PropTypes.array.isRequired,
		isolatedComponent: PropTypes.bool,
		isolatedExample: PropTypes.bool,
	};

	static childContextTypes = {
		codeKey: PropTypes.number.isRequired,
		config: PropTypes.object.isRequired,
		isolatedComponent: PropTypes.bool,
		isolatedExample: PropTypes.bool,
	};

	static defaultProps = {
		isolatedComponent: false,
	};

	getChildContext() {
		return {
			codeKey: this.props.codeKey,
			config: this.props.config,
			isolatedComponent: this.props.isolatedComponent,
			isolatedExample: this.props.isolatedExample,
		};
	}

	render() {
		const { config, sections, isolatedComponent } = this.props;
		const noComponentsFound = isEmpty(sections);
		return (
			<StyleGuideRenderer
				title={config.title}
				homepageUrl={HOMEPAGE}
				toc={<TableOfContents sections={sections} />}
				hasSidebar={noComponentsFound ? false : !isolatedComponent}
			>
				{noComponentsFound ? (
					<Message>
						No components or sections found.
						Check [the `components` and `sections` options]({DOCS_CONFIG}) in your style guide config.
					</Message>
				) : (
					<Sections sections={sections} />
				)}
			</StyleGuideRenderer>
		);
	}
}
