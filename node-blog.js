/*!
 * nodeSync v0.0.1
 * Author: Nathan Johnson <node@njohnson.me>
 * License: MIT Licensed
 *
 * File: node-blog.js
 */

var WebServer = require('./lib/WebServer')(3000,__dirname + '/data/posts.json');
WebServer.start();