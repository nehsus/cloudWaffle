const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { jsonBeautify } = require('beautify-json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      minify: false,
      template: './index.html',
      template: './favicon.png',
    }),
  ],
};

module.exports = (env, argv) => {
  config.mode = argv.mode;
  if (argv.mode === 'development') {
    config.entry = ['react-hot-loader/patch', './src'];
    config.devtool = 'inline-source-map';
    config.resolve.alias['react-dom'] = '@hot-loader/react-dom';
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devServer = {
      contentBase: './build',
      compress: true,
      open: true,
      port: 3000,
      historyApiFallback: true,
      hot: true,
      publicPath: '/',
    }
  }

  if (argv.mode === 'production') {
    config.entry = ['./src/index.js'];
    config.devtool = 'source-map';
    config.output.filename = '[name].[chunkhash].bundle.js';
    config.output.chunkFilename = '[name].[chunkhash].bundle.js';
    config.optimization = {
      moduleIds: 'hashed',
      runtimeChunk: {
        name: 'manifest',
      },
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules\/(?!antd\/).*/,
            name: 'vendors',
            chunks: 'all',
          },
          // This can be your own design library.
          antd: {
            test: /node_modules\/(antd\/).*/,
            name: 'antd',
            chunks: 'all',
          },
        },
      },
    };
    config.plugins.push(
      new HtmlWebpackPlugin({
      minify: false,
      template: path.resolve('./index.html'),
    }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
      }),
      new CopyPlugin({
        patterns: [
          { from: './_redirects' },
        ],
      })
    );
    config.performance = {
      hints: 'warning',
      // Calculates sizes of gziped bundles.
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js.gz');
      },
    };
  }

  console.log('Webpack config\n');

  jsonBeautify(config);

  return config;
};
