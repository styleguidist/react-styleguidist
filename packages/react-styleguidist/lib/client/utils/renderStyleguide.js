import "core-js/modules/es6.regexp.search";
import React from 'react';
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

export default function renderStyleguide(styleguide, codeRevision) {
  const loc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.location;
  const doc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;
  const hist = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window.history;
  const allSections = processSections(styleguide.sections);
  const _styleguide$config = styleguide.config;

      
const title = _styleguide$config.title;

      
const pagePerSection = _styleguide$config.pagePerSection;

  const _getRouteData = getRouteData(allSections, loc.hash, pagePerSection);

      
const sections = _getRouteData.sections;

      
const displayMode = _getRouteData.displayMode; // Update page title


  doc.title = getPageTitle(sections, title, displayMode); // If the current hash location was set to just `/` (e.g. when navigating back from isolated view to overview)
  // replace the URL with one without hash, to present the user with a single address of the overview screen

  if (loc.hash === '#/') {
    const url = loc.pathname + loc.search;
    hist.replaceState('', doc.title, url);
  }

  return React.createElement(StyleGuide, {
    codeRevision,
    config: styleguide.config,
    slots: slots(styleguide.config),
    welcomeScreen: styleguide.welcomeScreen,
    patterns: styleguide.patterns,
    sections,
    allSections,
    displayMode,
    pagePerSection
  });
}