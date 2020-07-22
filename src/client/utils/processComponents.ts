import * as Rsg from '../../typings';
import getUrl from './getUrl';

export interface HrefOptions {
	hashPath?: string[];
	useRouterLinks: boolean;
	useHashId?: boolean;
}

/**
 * Do things that are hard or impossible to do in a loader: we don’t have access to component name
 * and props in the styleguide-loader because we’re using `require` to load the component module.
 *
 * @param {Array} components
 * @return {Array}
 */
export default function processComponents(
	components: Rsg.Component[],
	{ useRouterLinks, useHashId, hashPath }: HrefOptions
): Rsg.Component[] {
	return components.map(component => {
		const newComponent: Rsg.Component = component.props
			? {
					...component,

					// Add .name shortcuts for names instead of .props.displayName.
					name: component.props.displayName,
					visibleName: component.props.visibleName || component.props.displayName,

					props: {
						...component.props,
						// Append @example doclet to all examples
						examples: [...(component.props.examples || []), ...(component.props.example || [])],
					},
					href:
						component.href ||
						getUrl({
							name: component.props.displayName,
							slug: component.slug,
							anchor: !useRouterLinks,
							hashPath: useRouterLinks ? hashPath : false,
							useSlugAsIdParam: useRouterLinks ? useHashId : false,
						}),
			  }
			: {};

		return newComponent;
	});
}
