const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const babelrc = require('./.babelrc');

const fileExtensions =
	'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$';

const postcssOptions = {
	plugins: [nested, autoprefixer()]
};

const clientPaths = [
	path.resolve(process.cwd(), 'src'),
	...module.paths,
	'node_modules'
];

module.exports = {
	target: 'web',
	mode: 'development',
	devtool: 'cheap-module-source-map',

	entry: path.join(process.cwd(), 'src/index.jsx'),

	output: {
		filename: 'assets/[name].js',
		chunkFilename: 'assets/[name].js'
	},

	resolve: {
		extensions: ['.mjs', '.js', '.jsx'],
		modules: clientPaths,
		alias: {
			'package.json': path.join(process.cwd(), 'package.json')
		}
	},

	resolveLoader: {
		modules: clientPaths
	},

	node: {
		process: 'mock',
		__dirname: true,
		__filename: true
	},
	devServer: {
		contentBase: path.join(process.cwd(), 'dist'),
		compress: true,
		open: true,
		hot: true,
		port: 9000,
		proxy: {
			'/login': 'http://localhost:8090'
		}
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				include: path.join(process.cwd(), 'src'),
				loader: 'eslint-loader'
			},
			{
				test: /\.(graphql|gql)$/,
				loader: 'graphql-tag/loader'
			},
			{
				type: 'javascript/auto',
				test: /\.mjs$/,
				use: []
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				include: [/SvgIcon/],
				use: [
					{
						loader: 'babel-loader'
					},
					{
						loader: '@svgr/webpack',
						options: {
							babel: false,
							icon: true,
							svgoConfig: {
								removeUselessDefs: false,
								plugins: [{ prefixIds: false }]
							}
						}
					}
				]
			},
			{
				test: new RegExp(fileExtensions),
				loader: 'url-loader',
				exclude: [/SvgIcon/],
				options: {
					limit: 20000
				}
			},
			{
				test: /\.css$/,
				include: [path.join(process.cwd(), 'src')],
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							localsConvention: 'camelCase',
							modules: {
								localIdentName: '[local]--[hash:base64:5]'
							},
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: postcssOptions
					}
				]
			},
			{
				test: /\.css$/,
				exclude: [path.join(process.cwd(), 'src')],
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				include: path.join(process.cwd(), 'src'),
				options: {
					...babelrc,
					cacheDirectory: true
				}
			}
		]
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new HtmlWebpackPlugin({
			inject: true,
			filename: 'index.html',
			template: path.join(__dirname, 'template.html')
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
		// new webpack.HotModuleReplacementPlugin(),
		// new CaseSensitivePathsPlugin(),
		// new WatchMissingNodeModulesPlugin(paths.appNodeModules),
	]
};
