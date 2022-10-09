const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		filename: 'jsHelpers.js',
		library: {
			name: 'jsHelpers',
			type: 'umd'
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							compact: true,
							comments: false,
						},
					},
				],
			},
		]
	}
}
