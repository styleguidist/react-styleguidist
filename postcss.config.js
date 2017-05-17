/* eslint-disable */

module.exports = {
  plugins: [
    require('postcss-nested-ancestors'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('postcss-custom-media'),
    require('postcss-media-minmax'),
    require('postcss-conditionals'),
    require('postcss-mixins'),
    require('postcss-cssnext')({ browsers: ['last 2 versions'] }),
    require('postcss-easings'),
  ]
}
