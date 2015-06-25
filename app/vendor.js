var vendorApp = vendor || new Map(); // jshint ignore:line

var react = require('react');
var superAgent = require('superagent');

vendorApp.set('React', react);
vendorApp.set('SuperAgent', superAgent);

/*
 var thirdPartLibary = require('thirdPartLibary');

 vendorApp.set('ThirdPartLibary', thirdPartLibary);
 */
