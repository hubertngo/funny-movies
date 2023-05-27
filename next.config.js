const webpack = require('webpack');

const withAntdLess = require('next-plugin-antd-less');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});


module.exports = withBundleAnalyzer(
  withAntdLess({
    // modifyVars: {
    // 	'hack': 'true;@import "~antd/lib/style/themes/compact.less";',
    // 	...antdVariables,
    // },
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {
      modules: {
        localIdentName: process.env.NODE_ENV !== 'production' ? '[folder]__[local]__[hash:4]' : '[hash:8]',
      },
    },
    // Other Config Here...
    webpack(config) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'frontmatter-markdown-loader',
      });
      config.module.rules.push({
        test: /\.svg$/,

        use: ['@svgr/webpack'],
      });

      config.plugins.push(new webpack.EnvironmentPlugin({ ...process.env }));

      return config;
    },
  }),
);
