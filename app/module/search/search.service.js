import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Module.Search');

/**
 * Class for the feed model.
 * It's a model of the feed model.
 *
 * @class Service
 * @extends App.Base.Service
 * @namespace App.Module.Search
 * @module App
 * @submodule App.Module
 */
class Service extends ns.App.Base.Service {

	/**
	 * @method constructor
	 * @constructor
	 */
	constructor() {
		super();
	}

	load() {

		return [
			{ 
				title: 'Czech Republic',
				value: 'czech-republic'
			},
			{ 
				title: 'Prague',
				value: 'prague'
			}
		];
	}
}

ns.App.Module.Search.Service = Service;