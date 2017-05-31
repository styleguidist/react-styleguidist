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
		allSections: PropTypes.array.isRequired,
		listTypes: PropTypes.array.isRequired,
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

	state = {
		searchTerm: '',
		selectedListType: '',
		filteredSections: [],
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

	componentWillMount() {
		const { allSections, listTypes } = this.props;

		this.setState({
			selectedListType: listTypes[0], //eslint-disable-line
			filteredSections: this.getSectionsByListType(listTypes[0], allSections),
		});
	}

	getSectionsByListType(selectedListType, sections) {
		if (sections.length === 1) {
			return sections;
		}

		const list = sections.find(section => section.name === selectedListType);

		if (list) {
			return list.sections;
		}
		return [];
	}

	updateSections(selectedListType) {
		const { allSections } = this.props;
		this.setState({
			filteredSections: this.getSectionsByListType(selectedListType, allSections),
		});
	}

	render() {
		const {
			config,
			listTypes,
			allSections,
			welcomeScreen,
			patterns,
			isolatedComponent,
		} = this.props;

		const { searchTerm, selectedListType, filteredSections } = this.state;

		if (welcomeScreen) {
			return <Welcome patterns={patterns} />;
		}

		return (
			<StyleGuideRenderer
				title={config.title}
				homepageUrl={HOMEPAGE}
				hasSidebar={config.showSidebar && !isolatedComponent}
				selectedListType={this.state.selectedListType}
				listTypes={listTypes}
				onListToggle={selectedListType => {
					this.setState(
						{
							searchTerm: '',
							selectedListType,
						},
						this.updateSections(selectedListType)
					);
				}}
				toc={
					<TableOfContents
						searchTerm={searchTerm}
						sections={this.getSectionsByListType(selectedListType, allSections)}
						updateStyleguide={(searchTerm, filteredSections) => {
							this.setState({
								searchTerm,
								filteredSections,
							});
						}}
					/>
				}
			>
				<Sections sections={filteredSections} />
			</StyleGuideRenderer>
		);
	}
}
