import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.assign";
import getUrl from './getUrl';

/**
 * Do things that are hard or impossible to do in a loader: we don’t have access to component name
 * and props in the styleguide-loader because we’re using `require` to load the component module.
 *
 * @param {Array} components
 * @return {Array}
 */
export default function processComponents(components, _ref) {
  var useRouterLinks = _ref.useRouterLinks,
      useHashId = _ref.useHashId,
      hashPath = _ref.hashPath;
  return components.map(function (component) {
    var newComponent = component.props ? Object.assign({}, component, {
      // Add .name shortcuts for names instead of .props.displayName.
      name: component.props.displayName,
      visibleName: component.props.visibleName || component.props.displayName,
      props: Object.assign({}, component.props, {
        // Append @example doclet to all examples
        examples: [].concat(component.props.examples || [], component.props.example || [])
      }),
      href: component.href || getUrl({
        name: component.props.displayName,
        slug: component.slug,
        anchor: !useRouterLinks,
        hashPath: useRouterLinks ? hashPath : false,
        useSlugAsIdParam: useRouterLinks ? useHashId : false
      })
    }) : {};
    return newComponent;
  });
}