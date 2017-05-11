import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableOfContents from 'rsg-components/TableOfContents';
import StyleGuideRenderer from 'rsg-components/StyleGuide/StyleGuideRenderer';
import Sections from 'rsg-components/Sections';
import Welcome from 'rsg-components/Welcome';
import { HOMEPAGE } from '../../../scripts/consts';

export default class StyleGuide extends Component {
	static propTypes = {
		codeKey: PropTypes.number.isRequired,
		config: PropTypes.object.isRequired,
		sections: PropTypes.array.isRequired,
		welcomeScreen: PropTypes.bool,
		patterns: PropTypes.array,
		isolatedComponent: PropTypes.bool,
		isolatedExample: PropTypes.bool,
		isolatedSection: PropTypes.bool,
	};

	static childContextTypes = {
		codeKey: PropTypes.number.isRequired,
		config: PropTypes.object.isRequired,
		isolatedComponent: PropTypes.bool,
		isolatedExample: PropTypes.bool,
		isolatedSection: PropTypes.bool,
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
			isolatedSection: this.props.isolatedSection,
		};
	}

	render() {
		const { config, sections, welcomeScreen, patterns, isolatedComponent } = this.props;

		if (welcomeScreen) {
			return <Welcome patterns={patterns} />;
		}

		return (
			<StyleGuideRenderer
				title={config.title}
				homepageUrl={HOMEPAGE}
				toc={<TableOfContents sections={sections} />}
				hasSidebar={config.showSidebar && !isolatedComponent}
			>
				<Sections sections={sections} />
			</StyleGuideRenderer>
		);
	}
}
