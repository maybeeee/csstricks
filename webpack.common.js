const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtracTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtracTextPlugin({
	filename: 'style/style.css',
	disable: process.env.NODE_ENV === "development",
	allChunks: true
});

module.exports = {
	entry: {
		index: './assets/main.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		alias: {
			'src': path.resolve(__dirname, './src')
		}
	},
	module: {
		rules: [
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: 'file-loader'
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					],
					fallback: 'style-loader',
					publicPath: '../'
				})
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: [
					{
						loader:'url-loader',
						options: {
							limit: 8192,
							name: 'images/[name]-[hash:8].[ext]'
						}
					}
				]
			},
			{
				test: /\.svg$/,
				loader: 'file-loader',
				query: {
					name: 'images/[name]-[hash:8].[ext]'
				}
			},
		]
	},
	plugins: [
		extractSass,
		new HTMLWebpackPlugin({
			title: 'Css Tricks',
			filename: 'index.html',
			minify: {
				removeComments: true
			},
			template: path.resolve(__dirname, 'assets/index.html')
		}),
		new CleanWebpackPlugin(['dist'])
	]
};