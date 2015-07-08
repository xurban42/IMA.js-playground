import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Module.Map');

/**
 * Class for the feed model.
 * It's a model of the feed model.
 *
 * @class Service
 * @extends App.Base.Service
 * @namespace App.Module.Map
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

		this.vectorLayer = null;

		this.defaultPlace = {
				x: 15.633985141083727,
				y: 49.90602754389286,
				z: 7
			};
	}

	load(params) {
		var displayedPlace = null;

		if (params.x && params.y) {
			displayedPlace = { 
				x: Number(params.x),
				y: Number(params.y),
				z: 7
			}
		}
		if (params.z) {
			displayedPlace.z = Number(params.z);
		}

		return {
			displayedPlace,
			defaultPlace: this.defaultPlace
		};
	}

	showOnMap(params, map, place) {
		if (map) {
			this.updateMapUrl(params, place.x, place.y, place.z);
			map.getView().setCenter(ol.proj.transform([place.x, place.y], 'EPSG:4326', 'EPSG:3857'));
			map.getView().setZoom(place.z);
		}
	}

	showRoute(params, map, vectorLayer) {
		if (this.vectorLayer) {
			map.removeLayer(this.vectorLayer);
		}

		if (vectorLayer) {
			
			this.vectorLayer = vectorLayer;

			map.addLayer(this.vectorLayer);
		} else {
			delete params.route;
			this._router.redirect(this._router.link('mode', params));
		}
	}

	updateMapUrl(params, x, y, z) {
		this._router.redirect(this._router.link('mode', Object.assign(params, {x:x, y:y, z:z })));
	}
}

ns.App.Module.Map.Service = Service;