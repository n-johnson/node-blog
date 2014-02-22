/*!
 * nodeSync v0.0.1
 * Author: Nathan Johnson <node@njohnson.me>
 * License: MIT Licensed
 *
 * File: Database.js - Wrapper for chosen database. Default datastore is npJSON, a persistant JSON backed KV datastore.
 *                   - This file can be modified to utilize any datastorage method as long as it returns the original external-facing functions in the same manner
 */

var Database = function(file) {
	this.storage = require('./npJSON/npJSON.js')(file);
};

Database.prototype.getPosts = function() {
	return this.storage.getValue("posts");
};

module.exports = function(file) {
	return new Database(file);
};