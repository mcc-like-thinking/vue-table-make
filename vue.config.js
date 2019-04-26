const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	productionSourceMap: false,
	publicPath: './',
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
	}
}