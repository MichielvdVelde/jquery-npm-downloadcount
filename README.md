# jquery-npm-downloadcount

This is a handy and simple to use jQuery plugin for displaying [npm](https://npmjs.org) package download counts. It uses the npmjs.org API and offers caching and templating options.

The template has the response from the API available, so you can use any of the fields. For a definition of these, [see here](https://github.com/npm/download-counts).

A demo is available [here](http://jquery-npm-downloadcount.artofcoding.nl/).

# Install

```
bower install jquery-npm-downloadcount
```

# Usage

	<script src="js/jquery-npm-downloadcount.js"></script>

Now you can start the plugin:

```js
$(document).ready(function() {
	$('#my-downloadcount').npm_downloadcount({
		'package': 'request-ms',
		'templateUrl': 'templates/count.tpl',
		'renderer': Mustache.render,
		'store': sessionStorage
	});
});
```

## Options

* `package`: The package name to show the count for. If this is not set, defaults to `all`
* `template`: The template to use for rendering (this or `templateUrl` is required)
* `templateUrl`: The URL of the template to use for rendering (this or `template` is required)
* `cacheTime`: The cache time in hours. Defaults to 24h. Disable caching by setting `cacheTime` to 0
* `point`: The count point. Can be `last-day`, `last-week` or `last-month` (default).
* `renderer`: The render method. Should take `(template, scope)`. If no renderer is set, an error will be generated
* `store`: The cache store to use. Should have `setItem(key, value)` and `getItem(key)`. If no store is set, an error will be generated

If both `template` and `templateUrl` are set, `templateUrl` takes precedence.

`point` can also be a date range in the format `YYYY-mm-dd:YYYY-mm-dd`.

## To do

* Probably some things

## Changelog

* 0.0.1 - 6 December 2015
  * Published on Bower
  * First commit

## License

Copyright 2015 Michiel van der Velde.

This software is licensed under [the MIT License](LICENSE).
