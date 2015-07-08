import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Component.Map');

/**
 * AdditionalInfo of one game.
 * @class View
 * @namespace App.Component.Map
 * @module App
 * @submodule App.Component
 */
class View extends ns.Core.Abstract.Component {

	constructor(props) {
		super(props);

		this.place = null;
		this.map = null;
	}

	render() {
		return (
			<div id='map' className="map" ref="map"></div>
		);
		
	}

	componentDidMount() {

		this.place = this.props.place.displayedPlace;
		if (!this.place) {
			this.place = this.props.searchedPlace;
		}
		if (!this.place) {
			this.place = this.props.place.defaultPlace;
		}

		this.map = new ol.Map({
	        target: 'map',
	        layers: [
	          new ol.layer.Tile({
	            source: new ol.source.MapQuest({layer: 'osm'})
	          })
	        ],
	        view: new ol.View({
	          center: ol.proj.transform([this.place.x, this.place.y], 'EPSG:4326', 'EPSG:3857'),
	          zoom: this.place.z
	        })
	      });

		

		this.map.on('moveend', this.onMoveEnd.bind(this));

		this.onMapCreated(this.map);

		this.onRouteExists();
	}

	onMapCreated(map) {
		this.utils.$EventBus.fire(this.refs.map.getDOMNode(), 'mapCreated', {
				map
			});
	}

	onRouteExists() {
		var routeName = this.props.displayedRoute;
		if (routeName) {

			this.utils
				.$EventBus
				.fire(this.refs.map.getDOMNode(), 'showRoute', {
					name: routeName
				});
		}
	}
	
	onMoveEnd(evt) {
		var map = evt.map;
		var view = map.getView();

		var coords = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
		var zoom = view.getZoom();

		if (this.place.x !=  coords[0] || this.place.y !=  coords[1] || this.place.z != zoom) {
			this.utils.$EventBus.fire(this.refs.map.getDOMNode(), 'mapMoveEnd', {
				x: coords[0],
				y: coords[1],
				z: zoom
			});
		}
	}

}

ns.App.Component.Map.View = View;
