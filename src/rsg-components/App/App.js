import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import slots from 'rsg-components/slots';
import StyleGuide from 'rsg-components/StyleGuide';
import getPageTitle from '../../utils/getPageTitle';
import getRouteData from '../../utils/getRouteData';
import globalizeComponents from '../../utils/globalizeComponents';
import processSections from '../../utils/processSections';

export default class App extends Component {
	static propTypes = {
		/** Object returned by styleguide-loader */
		styleguide: PropTypes.object.isRequired,
		codeRevision: PropTypes.number.isRequired,
		loc: PropTypes.object,
		doc: PropTypes.object,
		hist: PropTypes.object,
	};

	static defaultProps = {
		loc: window.location,
		doc: document,
		hist: window.history,
	};

	constructor(props) {
		super(props);
		this.lastHash = props.loc.hash;
	}

	componentDidUpdate() {
		// scroll to top of styleguide container when sections changed
		if (this.props.styleguide.config.pagePerSection && this.props.loc.hash !== this.lastHash) {
			if (window && isFunction(window.scrollTo)) {
				window.scrollTo(0, 0);
			}
		}
		this.currentHash = this.props.loc.hash;
	}

	render() {
		const { styleguide, codeRevision, loc, doc, hist } = this.props;

		const allSections = processSections(styleguide.sections);

		// Globalize all components, not just ones we see on the screen, to make
		// all components accessible to all examples
		globalizeComponents(allSections);

		const { title, pagePerSection } = styleguide.config;
		const { sections, displayMode } = getRouteData(allSections, loc.hash, pagePerSection);

		// Update page title
		doc.title = getPageTitle(sections, title, displayMode);

		// If the current hash location was set to just `/` (e.g. when navigating back from isolated view to overview)
		// replace the URL with one without hash, to present the user with a single address of the overview screen
		if (loc.hash === '#/') {
			const url = loc.pathname + loc.search;
			hist.replaceState('', doc.title, url);
		}

		return (
			<StyleGuide
				codeRevision={codeRevision}
				config={styleguide.config}
				slots={slots}
				welcomeScreen={styleguide.welcomeScreen}
				patterns={styleguide.patterns}
				sections={sections}
				allSections={allSections}
				displayMode={displayMode}
				pagePerSection={pagePerSection}
			/>
		);
	}
}
