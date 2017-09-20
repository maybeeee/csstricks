const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtracTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtracTextPlugin({
	filename: 'style.css',
	disable: process.env.NODE_ENV === "development",
	allChunks: true
});

module.exports = {
	entry: {
		index: './src/main.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
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
								minimize: true
							}
						},
						{
							loader: 'sass-loader'
						}
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(jpg|gif|svg|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			},
		]
	},
	plugins: [
		extractSass,
		new HTMLWebpackPlugin({
			title: 'Css Tricks',
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/index.html')
		}),
		new CleanWebpackPlugin(['dist'])
	]
};