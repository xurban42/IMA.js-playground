import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Module.Routes');

/**
 * Class for the feed model.
 * It's a model of the feed model.
 *
 * @class Service
 * @extends App.Base.Service
 * @namespace App.Module.Routes
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

		this.fakeRoutes = [
			{ 
				name: 'Brno - Praha',
				coordinates: [
					[14.421255027201065, 50.087440065361704],
					[15.021729873110885, 49.75281023196786],
					[15.14304132347232, 49.61083283141639],
					[15.668703654572514, 49.42601829110754],
					[16.01834240476548, 49.35910031584274],
					[16.434557476803768, 49.19304049435317],
					[16.59956824870352, 49.15988263892655],
					[16.611337764092596, 49.192242896838906]
				]
			},
			{ 
				name: 'Plzeň - Praha',
				coordinates: [
					[14.421255027201065, 50.087440065361704],
					[13.70893273073607, 49.78239781286368],
					[13.377520841478788, 49.74774054844943]
				]
			},
			{ 
				name: 'Plzeň - Brno',
				coordinates: [
					[13.377520841478788, 49.74774054844943],
					[13.70893273073607, 49.78239781286368],
					[14.421255027201065, 50.087440065361704],
					[15.021729873110885, 49.75281023196786],
					[15.14304132347232, 49.61083283141639],
					[15.668703654572514, 49.42601829110754],
					[16.01834240476548, 49.35910031584274],
					[16.434557476803768, 49.19304049435317],
					[16.59956824870352, 49.15988263892655],
					[16.611337764092596, 49.192242896838906]
				]
			}
		];

	}

	load(params) {

		return {
			route: params.route,
			UIData: this.fakeRoutes
		};
	}

	update (params, state) {
		return state;
	}

	getRoute(params, routeName) {
		var activeRoutes = this.fakeRoutes.filter((route) => routeName===route.name);
		if (activeRoutes.length > 0) {
			var route = activeRoutes[0];
			var coordinates = route.coordinates
					.map((xy) => {
						return ol.proj.transform(xy, 'EPSG:4326', 'EPSG:3857');
					});

			var routeFeature = new ol.Feature({
					geometry: new ol.geom.LineString(coordinates),
					name: route.name
				});

			var routeStyle = new ol.style.Style({
			    stroke: new ol.style.Stroke({
			      color: 'blue',
			      width: 3
			    })
			  });

			routeFeature.setStyle(routeStyle);

			var vectorSource = new ol.source.Vector({
			  features: [routeFeature]
			});

			if (params.route !== routeName) {
				this._router.redirect(
						this._router.link('mode', 
								Object.assign(params, { route: routeName })));
			}

			var vectorLayer = new ol.layer.Vector({
			  source: vectorSource
			});

			return vectorLayer;
		}

		return null;
		
	}
}

ns.App.Module.Routes.Service = Service;