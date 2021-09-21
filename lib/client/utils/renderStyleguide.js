import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.search";
import React from 'react';
import hashSum from 'hash-sum';
import slots from 'rsg-components/slots';
import StyleGuide from 'rsg-components/StyleGuide';
import getPageTitle from './getPageTitle';
import getRouteData from './getRouteData';
import processSections from './processSections';

/**
 * @param {object} styleguide An object returned by styleguide-loader
 * @param {number} codeRevision
 * @param {Location} [loc]
 * @param {Document} [doc]
 * @param {History} [hist]
 * @return {React.ReactElement}
 */
export default function renderStyleguide(styleguide, codeRevision, loc, doc, hist) {
  if (loc === void 0) {
    loc = window.location;
  }

  if (doc === void 0) {
    doc = document;
  }

  if (hist === void 0) {
    hist = window.history;
  }

  return function () {
    var allSections = processSections(styleguide.sections, {
      useRouterLinks: styleguide.config.pagePerSection
    });
    var _styleguide$config = styleguide.config,
        title = _styleguide$config.title,
        pagePerSection = _styleguide$config.pagePerSection,
        theme = _styleguide$config.theme,
        styles = _styleguide$config.styles;

    var _getRouteData = getRouteData(allSections, loc.hash, pagePerSection),
        sections = _getRouteData.sections,
        displayMode = _getRouteData.displayMode; // Update page title


    doc.title = getPageTitle(sections, title, displayMode); // If the current hash location was set to just `/` (e.g. when navigating back from isolated view to overview)
    // replace the URL with one without hash, to present the user with a single address of the overview screen

    if (loc.hash === '#/') {
      var _url = loc.pathname + loc.search;

      hist.replaceState('', doc.title, _url);
    }

    return /*#__PURE__*/React.createElement(StyleGuide, {
      codeRevision: codeRevision // only caclulate css revisions in dev when hot is on to avoid
      // stringifying the styles in production
      ,
      cssRevision: module.hot ? hashSum({
        theme: theme,
        styles: styles
      }) : '0',
      config: styleguide.config,
      slots: slots(styleguide.config),
      welcomeScreen: styleguide.welcomeScreen,
      patterns: styleguide.patterns,
      sections: sections,
      allSections: allSections,
      displayMode: displayMode,
      pagePerSection: pagePerSection
    });
  }();
}