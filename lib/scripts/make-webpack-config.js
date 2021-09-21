"use strict";

exports.__esModule = true;
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _castArray = _interopRequireDefault(require("lodash/castArray"));

var _webpack = _interopRequireDefault(require("webpack"));

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _miniHtmlWebpackPlugin = require("mini-html-webpack-plugin");

var _miniHtmlWebpackTemplate = _interopRequireDefault(require("@vxna/mini-html-webpack-template"));

var _cleanWebpackPlugin = require("clean-webpack-plugin");

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _forEach = _interopRequireDefault(require("lodash/forEach"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _StyleguidistOptionsPlugin = _interopRequireDefault(require("./utils/StyleguidistOptionsPlugin"));

var _mergeWebpackConfig = _interopRequireDefault(require("./utils/mergeWebpackConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RENDERER_REGEXP = /Renderer$/;

const sourceDir = _path.default.resolve(__dirname, '../client');

function _default(config, env) {
  process.env.NODE_ENV = process.env.NODE_ENV || env;
  const isProd = env === 'production';
  const template = (0, _isFunction.default)(config.template) ? config.template : _miniHtmlWebpackTemplate.default;
  const templateContext = (0, _isFunction.default)(config.template) ? {} : config.template;
  const htmlPluginOptions = {
    context: {
      lang: 'en',
      ...templateContext,
      title: config.title,
      container: config.mountPointId
    },
    template
  };
  let webpackConfig = {
    entry: config.require.concat([_path.default.resolve(sourceDir, 'index')]),
    mode: env,
    output: {
      path: config.styleguideDir,
      filename: 'build/[name].bundle.js',
      chunkFilename: 'build/[name].js',
      publicPath: ''
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {}
    },
    plugins: [new _StyleguidistOptionsPlugin.default(config), new _miniHtmlWebpackPlugin.MiniHtmlWebpackPlugin(htmlPluginOptions), new _webpack.default.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.STYLEGUIDIST_ENV': JSON.stringify(env)
    })],
    performance: {
      hints: false
    }
  };

  if (isProd) {
    const minimizer = new _terserWebpackPlugin.default({
      terserOptions: {
        ie8: false,
        ecma: 5,
        compress: {
          keep_fnames: true,
          warnings: false,

          /*
           * Disable reduce_funcs to keep Terser from inlining
           * Preact's VNode. If enabled, the 'new VNode()' is replaced
           * with a anonymous 'function(){}', which is problematic for
           * preact-compat, since it extends the VNode prototype to
           * accomodate React's API.
           */
          reduce_funcs: false
        },
        mangle: {
          keep_fnames: true
        }
      }
    });
    webpackConfig = (0, _webpackMerge.default)(webpackConfig, {
      output: {
        filename: 'build/bundle.[chunkhash:8].js',
        chunkFilename: 'build/[name].[chunkhash:8].js'
      },
      plugins: [new _cleanWebpackPlugin.CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [`${config.styleguideDir}/build/**/*`],
        verbose: config.verbose === true
      })],
      optimization: {
        minimize: config.minimize === true,
        minimizer: [minimizer]
      }
    });

    if (config.assetsDir && webpackConfig.plugins) {
      const copyPatterns = {
        patterns: (0, _castArray.default)(config.assetsDir).map(dir => ({
          from: dir
        }))
      };
      webpackConfig.plugins.push( // FIXME: Since we don't have the type of copy-webpack-plugin@6.0
      // we cast the config as any to make it work. Once the new types are
      // released we must remove the cast.
      new _copyWebpackPlugin.default(copyPatterns));
    }
  } else {
    webpackConfig = (0, _webpackMerge.default)(webpackConfig, {
      entry: [require.resolve('react-dev-utils/webpackHotDevClient')],
      plugins: [new _webpack.default.HotModuleReplacementPlugin()],
      devServer: {
        transportMode: 'ws'
      }
    });
  }

  if (config.webpackConfig) {
    webpackConfig = (0, _mergeWebpackConfig.default)(webpackConfig, config.webpackConfig, env);
  } // Custom aliases
  // NOTE: in a sanitized config, moduleAliases are always an object (never null or undefined)


  const aliasedWebpackConfig = (0, _webpackMerge.default)(webpackConfig, {
    resolve: {
      alias: config.moduleAliases
    }
  });
  const alias = aliasedWebpackConfig.resolve.alias; // Custom style guide components

  if (config.styleguideComponents) {
    (0, _forEach.default)(config.styleguideComponents, (filepath, name) => {
      const fullName = name.match(RENDERER_REGEXP) ? `${name.replace(RENDERER_REGEXP, '')}/${name}` : name;
      alias[`rsg-components/${fullName}`] = filepath;
    });
  } // Add components folder alias at the end, so users can override our components
  // to customize the style guide (their aliases should be before this one)


  alias['rsg-components'] = _path.default.resolve(sourceDir, 'rsg-components');
  webpackConfig = config.dangerouslyUpdateWebpackConfig ? config.dangerouslyUpdateWebpackConfig(aliasedWebpackConfig, env) : aliasedWebpackConfig;
  return webpackConfig;
}