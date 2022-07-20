//.webstorm.bootstrap.js
var chai = require('chai');
var jsdom = require('jsdom');
global.chai = chai;
global.expect = chai.expect;
global.showdown = require('../.build/showdown.js');
global.getDefaultOpts = require('./optionswp.js').getDefaultOpts;
global.showdown.helper.document = new jsdom.JSDOM('', {}).window.document;
