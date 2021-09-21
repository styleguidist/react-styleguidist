import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import processComponents from './processComponents';
import getUrl from './getUrl';
/**
 * Recursively process each component in all sections.
 *
 * @param {Array} sections
 * @return {Array}
 */

export default function processSections(sections, _ref) {
  var useRouterLinks = _ref.useRouterLinks,
      _ref$useHashId = _ref.useHashId,
      useHashId = _ref$useHashId === void 0 ? false : _ref$useHashId,
      _ref$hashPath = _ref.hashPath,
      hashPath = _ref$hashPath === void 0 ? [] : _ref$hashPath;
  return sections.map(function (section) {
    var options = {
      useRouterLinks: Boolean(useRouterLinks && section.name),
      useHashId: section.sectionDepth === 0,
      hashPath: [].concat(hashPath, [section.name ? section.name : '-'])
    };
    var href = section.href || getUrl({
      name: section.name,
      slug: section.slug,
      anchor: !useRouterLinks,
      hashPath: useRouterLinks ? hashPath : false,
      useSlugAsIdParam: useRouterLinks ? useHashId : false
    });
    return Object.assign({}, section, {
      // flag the section as an external link to avoid rendering it later
      externalLink: !!section.href,
      href: href,
      visibleName: section.name,
      components: processComponents(section.components || [], options),
      sections: processSections(section.sections || [], options)
    });
  });
}