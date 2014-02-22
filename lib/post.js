/*!
 * nodeSync v0.0.1
 * Author: Nathan Johnson <node@njohnson.me>
 * License: MIT Licensed
 *
 * File: posts.js - Defines datatypes Post and PostArray
 */


var Post = function(object) {
	this.id = object.id;
	this.title = object.title;
	this.body = object.body;
	this.date = object.date;
	this.image = object.image;
};

var PostArray = function() {
	this._array = [];
	this.maxID = 0;
};

PostArray.prototype.add = function(object) {
	if (typeof object.id === 'undefined')
		throw "Post ID was not set.";
	this._array.push(new Post(object));
	if (object.id > this.maxID)
		this.maxID = object.id;
};
/**
 * getBefore - Returns specified posts
 * Assumption: We are assuming incoming data was sorted during the write
 * @param   beforeID - Only returns posts earlier than beforeID. 0 is assumed to mean MAX id, not min id. Default: 0
 * @param   amount - Number of posts to return. Unlimited. Should be limited in API AP.
 * @return {array} - Array of posts matching input criteria
 */
PostArray.prototype.getBefore = function(beforeID, amount) {
	beforeID = beforeID || this.maxID + 1;
	if (beforeID === 0)
		beforeID = this.maxID + 1;
	amount = amount || 10;
	var ret = [];
	for (var i = 0; i < this._array.length; i++) {
		if (this._array[i].id < beforeID)
			ret.push(this._array[i]);
		if (ret.length === amount)
			return ret;
	}
	return ret;
};

PostArray.prototype.get = function(postID) {
	for(var i = 0; i < this._array.length; i++) {
		if(postID === this._array[i].id)
			return this._array[i];
	}
	return null;
};

PostArray.prototype.sort = function() {
	// Sort the object from newest to oldest, or highest ID to lowest ID
};

exports.Post = Post;
module.exports.PostArray = function() {
	return new PostArray();
};