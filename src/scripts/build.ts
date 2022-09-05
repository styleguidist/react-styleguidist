import webpack from 'webpack';
import makeWebpackConfig from './make-webpack-config';
import * as Rsg from '../typings';

export default function build(
	config: Rsg.SanitizedStyleguidistConfig,
	callback: (err: Error, stats: webpack.Stats) => void
) {
	return webpack(makeWebpackConfig(config, 'production'), (err, stats) => {
		// require('fs').writeFileSync('stats.json', JSON.stringify(stats.toJson()));
		callback(err as Error, stats as webpack.Stats);
	});
}
