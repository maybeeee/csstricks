const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtracTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtracTextPlugin({
	filename: '[name].[contenthash].css',
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
	plugins: [
		extractSass,
		new HTMLWebpackPlugin({
			title: 'Css Tricks',
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/index.html')
		}),
		new CleanWebpackPlugin(['dist'])
	],
	module: {
		rules: [
			{
				test: /\.(jpg|gif|svg|png)$/,
				use: ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [
						'css-loader',
						'sass-loader'
					],
					fallback: 'style-loader'
				})
			}
		]
	}
};