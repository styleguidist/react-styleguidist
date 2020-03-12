import { Configuration } from 'webpack';
import uiWebpackConfig from './ui.webpack.config';
import iframeWebpackConfig from './iframe.webpack.config';

export default function(
	config: Rsg.SanitizedStyleguidistConfig,
	env: 'development' | 'production' | 'none'
): Configuration[] {
	return [uiWebpackConfig(config, env), iframeWebpackConfig(config, env)];
}
