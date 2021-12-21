import * as Rsg from '../../typings';
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
export default function processComponents(components: Rsg.Component[], { useRouterLinks, useHashId, hashPath }: HrefOptions): Rsg.Component[];
