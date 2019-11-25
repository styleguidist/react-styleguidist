import webpack from 'webpack';
import makeWebpackConfig from './make-webpack-config';

export default function build(
	config: Rsg.ProcessedStyleguidistConfig,
	callback: (err: Error, stats: webpack.Stats) => void
) {
	return webpack(makeWebpackConfig(config, 'production'), (err, stats) => {
		// require('fs').writeFileSync('stats.json', JSON.stringify(stats.toJson()));
		callback(err, stats);
	});
}
