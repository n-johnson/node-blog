/*!
 * nodeSync v0.0.1
 * Author: Nathan Johnson <node@njohnson.me>
 * License: MIT Licensed
 *
 * File: node-blog.js
 */

//Settings
var MAX_POSTS_RESULTS = 50; //TODO move to config file?? Something better than this.
//End Settings

var express = require('express');
var app = express();

var Post = require('./lib/post.js').Post;
var PostArray = require('./lib/post.js').PostArray();

var Database = require('./lib/Database.js')(__dirname + '/data/posts.json');

loadPosts();

console.log(PostArray.getBefore(3, 100));
console.log(PostArray.maxID);

app.get('/', function(req, res, next) {
	res.json(404, sendError("No endpoint specified."));
});

app.get('/posts', function(req, res, next) {
	var amount = 10,
		before = 0;
	if (!isNaN(req.query.amount)) { //Amount parameter set AND is numeric.
		amount = req.query.amount < MAX_POSTS_RESULTS ? req.query.amount : MAX_POSTS_RESULTS;
	}
	if (!isNaN(req.query.before)) { //Amount parameter set AND is numeric.
		before = req.query.before;
	}
	console.log("We are displaying: " + amount + " posts, starting at post: " + before);

	res.json(PostArray.getBefore(before, amount));
});

app.get('/posts/:id', function(req, res, next) {
	if (isNaN(req.params.id)) { //ID parameter is not numeric
		return res.json(400, sendError('Post IDs must be numeric.'));
	}

	var ret = PostArray.get(parseInt(req.params.id, 10));

	if (ret !== null) {
		return res.json(ret);
	} else {
		return res.json(404, sendError('No post with that ID found.'));
	}
	//return (ret = PostArray.get(parseInt(req.params.id, 10))) !== null ? res.json(ret) : res.json(404, sendError('No post with that ID found.'));
});

app.listen(3000);


//Functions
function sendError(errorText) {
	errorText = errorText || 'Unknown error occured.';
	return {
		error: errorText
	};
}

function loadPosts() {
	var ourPosts = Database.getPosts();

	for (var i = 0; i < ourPosts.length; i++) {
		PostArray.add(new Post(ourPosts[i]));
	}
}