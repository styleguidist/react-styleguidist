import * as Rsg from '../../typings';

export default function server(
	config: Rsg.SanitizedStyleguidistConfig,
	callback: (err: Error | null) => void
) {
	callback(null);
	return {};
}
