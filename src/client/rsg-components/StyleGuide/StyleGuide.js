import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableOfContents from 'rsg-components/TableOfContents';
import StyleGuideRenderer from 'rsg-components/StyleGuide/StyleGuideRenderer';
import Sections from 'rsg-components/Sections';
import Welcome from 'rsg-components/Welcome';
import Error from 'rsg-components/Error';
import NotFound from 'rsg-components/NotFound';
import Context from 'rsg-components/Context';
import { HOMEPAGE } from '../../../scripts/consts';
import { DisplayModes } from '../../consts';

/**
 * This function will return true, if the sidebar should be visible and false otherwise.
 *
 * These sorted conditions (highest precedence first) define the visibility
 * state of the sidebar.
 *
 * - Sidebar is hidden for isolated example views
 * - Sidebar is always visible when pagePerSection
 * - Sidebar is hidden when showSidebar is set to false
 * - Sidebar is visible when showSidebar is set to true for non-isolated views
 *
 * @param {boolean} displayMode
 * @param {boolean} showSidebar
 * @param {boolean} pagePerSection
 * @returns {boolean}
 */
function hasSidebar(displayMode, showSidebar) {
	return displayMode === DisplayModes.notFound || (showSidebar && displayMode === DisplayModes.all);
}

export default class StyleGuide extends Component {
	static propTypes = {
		codeRevision: PropTypes.number.isRequired,
		config: PropTypes.object.isRequired,
		slots: PropTypes.object.isRequired,
		sections: PropTypes.array.isRequired,
		welcomeScreen: PropTypes.bool,
		patterns: PropTypes.array,
		displayMode: PropTypes.string,
		allSections: PropTypes.array.isRequired,
		pagePerSection: PropTypes.bool,
	};
	static defaultProps = {
		displayMode: DisplayModes.all,
	};

	state = {
		error: false,
		info: null,
	};

	componentDidCatch(error, info) {
		this.setState({
			error,
			info,
		});
	}

	render() {
		const { error, info } = this.state;
		const {
			config,
			sections,
			welcomeScreen,
			patterns,
			displayMode,
			allSections,
			pagePerSection,
			codeRevision,
			slots,
		} = this.props;

		if (error) {
			return <Error error={error} info={info} />;
		}

		if (welcomeScreen) {
			return <Welcome patterns={patterns} />;
		}

		return (
			<Context.Provider
				value={{
					codeRevision,
					config,
					slots,
					displayMode,
				}}
			>
				<StyleGuideRenderer
					title={config.title}
					version={config.version}
					homepageUrl={HOMEPAGE}
					toc={<TableOfContents sections={allSections} useRouterLinks={pagePerSection} />}
					hasSidebar={hasSidebar(displayMode, config.showSidebar)}
				>
					{sections.length ? <Sections sections={sections} depth={1} /> : <NotFound />}
				</StyleGuideRenderer>
			</Context.Provider>
		);
	}
}
