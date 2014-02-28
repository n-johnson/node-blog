/*!
 * nodeSync v0.0.1
 * Author: Nathan Johnson <node@njohnson.me>
 * License: MIT Licensed
 *
 * File: WebServer.js
 */

var app = require('express')();
var Post = require('./Post').Post;

var WebServer = function(port,databaseFile) {
	this.port = port;

	this.Database = require('./Database')(databaseFile);
	this.PostArray = require('./Post').PostArray();

	var that = this;

	app.get('/posts', function(req, res, next) {
		var amount = 10,
			before = 0;
		if (!isNaN(req.query.amount)) { //Amount parameter set AND is numeric.
			amount = req.query.amount < 50 ? req.query.amount : 50;
		}
		if (!isNaN(req.query.before)) { //Amount parameter set AND is numeric.
			before = req.query.before;
		}
		res.json(that.PostArray.getBefore(before, amount));
	});

	app.get('/posts/:id', function(req, res, next) {
		if (isNaN(req.params.id)) { //ID parameter is not numeric
			return res.json(400, that.sendError('Post IDs must be numeric.'));
		}

		var ret = that.PostArray.get(parseInt(req.params.id, 10));

		if (ret !== null) {
			return res.json(ret);
		} else {
			return res.json(404, that.sendError('No post with that ID found.'));
		}
		//return (ret = that.PostArray.get(parseInt(req.params.id, 10))) !== null ? res.json(ret) : res.json(404, sendError('No post with that ID found.'));
	});

	app.get('/', function(req, res, next) {
		res.json(404, that.sendError("No endpoint specified."));
	});

	app.get('*', function(req, res, next) {
		res.json(404, that.sendError("Invalid endpoint specified."));
	});
};

WebServer.prototype.sendError = function(errorText) {
	errorText = errorText || 'Unknown error occured.';
	return {
		error: errorText
	};
};

WebServer.prototype.start = function() {
	this.PostArray.addAll(this.Database.getPosts());

	app.listen(this.port);
};

module.exports = function(port,databaseFile) {
	return new WebServer(port,databaseFile);
};