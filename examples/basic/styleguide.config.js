const path = require('path');

const context = process.cwd();

module.exports = {
  title: 'Material StyleGuide',
  components: 'lib/components/**/[A-Z]*.js',
  contextDependencies: [
    path.resolve(context, 'src/components'),
  ],
  getExampleFilename: (componentpath) => path.join(path.dirname(componentpath), 'demo/demo.md'),
  getChangelogFilename: (componentpath) => path.join(path.dirname(componentpath), 'demo/changelog.md'),
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'UI Components',
      components: 'lib/components/[A-Z]*/[A-Z]*.jsx',
    },
  ],
  updateWebpackConfig(webpackConfig) {
    const dir = path.resolve(__dirname, 'lib');
    webpackConfig.module.loaders.push(
      {
        test: /\.jsx?$/,
        include: dir,
        use: 'babel',
      },
      {
        test: /\.pcss$/,
        include: dir,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[path]--[local]',
              context: '/',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.json$/,
        include: path.dirname(require.resolve('dog-names/package.json')),
        use: 'json',
      }
    );
    return webpackConfig;
  },
};
