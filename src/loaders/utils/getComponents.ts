import processComponent from './processComponent';
import * as Rsg from '../../typings';

/**
 * Process each component in a list.
 *
 * @param components File names of components.
 * @param config
 */
export default function getComponents(
	components: string[],
	config: Rsg.SanitizedStyleguidistConfig
) {
	return components.map(filepath => processComponent(filepath, config));
}
