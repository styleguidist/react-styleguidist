import * as Rsg from '../../typings';

export default function build(
	config: Rsg.SanitizedStyleguidistConfig,
	callback: (err: Error | null, stats: any) => void
) {
	callback(null, { stats: true });
	return {};
}
