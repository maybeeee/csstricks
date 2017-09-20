const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtracTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtracTextPlugin({
	filename: 'style.css',
	disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry: {
		index: './src/main.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
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

							}
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths: ['./src/style']
							}
						}
					],
					fallback: 'style-loader'
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
			template: path.resolve(__dirname, 'src/index.html')
		}),
		new CleanWebpackPlugin(['dist'])
	]
};