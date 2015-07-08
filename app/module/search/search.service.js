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
				searchedText: 'Czech Republic',
				x:15.633985141083727,
				y:49.90602754389286,
				z:7
			},
			{ 
				searchedText: 'Brno',
				x:16.611337764092596,
				y:49.192242896838906,
				z:14
			},
			{ 
				searchedText: 'Plzeň',
				x:13.377520841478788,
				y:49.74774054844943,
				z:14
			},
			{ 
				searchedText: 'Prague',
				x:14.42677579994968,
				y:50.08895094406756,
				z:14
			}
		];
	}

	load(params) {

		return {
			searchedPlace: this.searchPlace(params, params.searchedText),
			UIData: this.fakeData
		} 
	}

	update (params, state) {
		state.search.searchedPlace = this.searchPlace(params, params.searchedText);
		return state;
	}

	searchPlace(params, searchedText) {
		if (searchedText) {
			var place = this
				.fakeData
				.filter((place) => {
					return place.searchedText === searchedText;
				})[0];

			if (params.searchedText !== searchedText) {
				this._router.redirect(
						this._router.link('mode', 
								Object.assign(params, { searchedText: place.searchedText })));
			}

			return place;
		}

		return null;
	}
}

ns.App.Module.Search.Service = Service;