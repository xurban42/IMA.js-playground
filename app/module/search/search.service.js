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
	constructor(router) {
		super();

		this._router = router;

		this.fakeData = [
			{ 
				title: 'Czech Republic',
				value: 'czech-republic',
				x:15.633985141083727,
				y:49.90602754389286,
				z:7
			},
			{ 
				title: 'Prague',
				value: 'prague',
				x:14.42677579994968,
				y:50.08895094406756,
				z:14
			}
		];
	}

	load() {
		return this.fakeData;
	}

	searchPlace(params, value) {
		var place = this
				.fakeData
				.filter((place) => {
					return place.value === value;
				})[0];

		if (params.searchedText !== place.value) {
			this._router.redirect(this._router.link('mode', Object.assign(params, { searchedText: place.value })));
		}

		return { x:place.x, y: place.y, z: place.z };
	}
}

ns.App.Module.Search.Service = Service;