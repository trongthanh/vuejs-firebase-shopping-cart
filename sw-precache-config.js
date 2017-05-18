module.exports = {
	staticFileGlobs: [
		'dist/assets/**.css',
		'dist/assets/*.png',
		'dist/index.html',
		'dist/*.json',
		'dist/**.js',
	],
	stripPrefix: 'dist',
	runtimeCaching: [{
		urlPattern: /assets\/products\/.*\.(png|jpg)/,
		handler: 'networkFirst',
	}, {
		urlPattern: /https?:\/\/fonts\.googleapis\.com\/.*/,
		handler: 'networkFirst',
	}, {
		urlPattern: /https?:\/\/fonts\.gstatic\.com\/.*/,
		handler: 'networkFirst',
	}],
};
