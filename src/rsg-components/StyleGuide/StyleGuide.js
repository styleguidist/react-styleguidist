import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableOfContents from 'rsg-components/TableOfContents';
import StyleGuideRenderer from 'rsg-components/StyleGuide/StyleGuideRenderer';
import Sections from 'rsg-components/Sections';
import Welcome from 'rsg-components/Welcome';
import { HOMEPAGE } from '../../../scripts/consts';
import { filterSectionsByName } from '../../utils/utils';

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
		listTypes: PropTypes.array,
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

	state = {
		searchTerm: undefined,
		listMode: this.props.listTypes[0], //eslint-disable-line
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
		const { config, sections, listTypes, welcomeScreen, patterns, isolatedComponent } = this.props;

		const { searchTerm } = this.state;
		const list = sections.length === 1
			? sections
			: sections.filter(section => section.name === this.state.listMode)[0].sections;
		const filteredSections = searchTerm ? (0, filterSectionsByName)(list, searchTerm) : list;

		if (welcomeScreen) {
			return <Welcome patterns={patterns} />;
		}

		return (
			<StyleGuideRenderer
				title={config.title}
				homepageUrl={HOMEPAGE}
				hasSidebar={config.showSidebar && !isolatedComponent}
				listMode={this.state.listMode}
				listTypes={listTypes}
				onListToggle={listMode => this.setState({ listMode })}
				toc={
					<TableOfContents
						sections={filteredSections}
						searchTerm={searchTerm}
						onSearchTermChange={searchTerm => this.setState({ searchTerm })}
					/>
				}
			>
				<Sections sections={filteredSections} />
			</StyleGuideRenderer>
		);
	}
}
