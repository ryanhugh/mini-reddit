
// Entry point for the backend. This file is intended to be ran with `node startup.js`. 
// This file loads the babel polyfills and then starts the server.

require('babel-core/register');
require('babel-polyfill');
require('./server.js');
