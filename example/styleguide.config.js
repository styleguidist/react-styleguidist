module.exports = {
  title:   'Style guide example',
  rootDir: './lib',

  components: function (config, glob) {
    return glob.sync(config.rootDir + '/components/**/*.{js,jsx}')
      //.filter(function (module) {
      //  return /\/[A-Z]\w*\.jsx?$/.test(module);
      //});
  },

  updateWebpackConfig: function (webpackConfig, env) {
    return webpackConfig;
  }
};
