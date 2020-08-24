import path from 'path';

export default {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		filename: 'jsHelpers.js',
		library: "jsHelpers",
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{loader: 'babel-loader'}
				]
			}
		]
	}
}
