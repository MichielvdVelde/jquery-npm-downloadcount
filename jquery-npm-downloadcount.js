(function($) {

	$.fn.npm_downloadcount = function(options) {

		var el = this;
		options = $.extend({
			'baseUrl': 'https://api.npmjs.org/downloads',
			'cacheTime': 24,
			'point': 'last-month'
		}, options);

		// check renderer

		/**
		 * Returns true if the cache is expired
		*/
		var cacheExpired = function() {
			var cacheDate = options.store.getItem('npm-downloadcount.' + options.package + '.' + options.point + '.time') || null;
			if(!options.cacheTime || options.cacheTime === 0 || cacheDate === null)
				return true;
			return ((new Date()).getTime() - cacheDate) > (options.cacheTime * 3600000);
		};

		/**
		 *
		*/
		var loadDownloadCount = function(callback) {
			if(cacheExpired())
				return fetchDownloadCountsFromNpm(callback);
			return fetchDownloadCountsFromStorage(callback);
		};

		/**
		 *
		*/
		var fetchDownloadCountsFromNpm = function(callback) {
			var url = options.baseUrl + '/point/' + options.point;
			if(options.package) url += '/' + options.package;
			$.getJSON(url, function(count) {
				cacheDownloadCount(count);
				return callback(count);
			});
		};

		/**
		 *
		*/
		var fetchDownloadCountsFromStorage = function(callback) {
			var count = options.store.getItem('npm-downloadcount.' + option.package + '.' + options.point + '.count');
			return callback(JSON.parse(count));
		};

		/**
		 *
		*/
		var cacheDownloadCount = function(count) {
			options.store.setItem('npm-downloadcount.' + option.package + '.' + options.point + '.time', (new Date()).getTime());
			options.store.setItem('npm-downloadcount.' + option.package + '.' + options.point + '.count', JSON.stringify(count));
		};

		/**
		 * Load a template from a remote source
		*/
		var loadTemplate = function(cb) {
			$.ajax({
				'type': 'GET',
				'url': options.templateUrl,
				'dataType': 'html'
			}).done(function(template) {
				options.template = template;
				return cb();
			}).fail(function(jqXHR, textStatus, errorThrown) {
				return cb(errorThrown);
			});
		};

		/**
		 *
		*/
		var renderDownloadCount = function() {
			loadDownloadCount(function(count) {
				var rendered = options.renderer(options.template, count);
				el.html(rendered);
			});
		};

		option.package = (option.package) ? option.package : 'all';
		if(options.templateUrl) {
			return loadTemplate(function(error) {
				if(error || !options.template) return console.error(error || 'Invalid template');
				renderDownloadCount();
			});
		}
		renderDownloadCount();

	};

})(jQuery);
