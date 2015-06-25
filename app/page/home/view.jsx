import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Page.Home');

/**
 * Master Layout.
 * @class View
 * @namespace App.Component.Layout.Master
 * @module App
 * @submodule Component
 */
class View extends ns.Core.Abstract.Component {

	constructor(props) {
		super(props);

		this.state = props;
	}

	render() {
		var x = this.props.map.x;
		var y = this.props.map.y;
		return (
			<div className='l-homepage'>
				<div className='content'>
					<div id='map' className="map" ref="map">
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		var map = new ol.Map({
	        target: 'map',
	        layers: [
	          new ol.layer.Tile({
	            source: new ol.source.MapQuest({layer: 'osm'})
	          })
	        ],
	        view: new ol.View({
	          center: ol.proj.transform([this.props.map.x, this.props.map.y], 'EPSG:4326', 'EPSG:3857'),
	          zoom: this.props.map.z
	        })
	      });
		map.on('moveend', this.onMoveEnd.bind(this));
	}

	onMoveEnd(evt) {
		var map = evt.map;
		var view = map.getView();

			var coords = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
			var zoom = view.getZoom();

			console.log({x:coords[0], y:coords[1], z:zoom })

			this.utils.$EventBus.fire(this.refs.map.getDOMNode(), 'mapMoveEnd', {
				x: coords[0],
				y: coords[1],
				z: zoom
			});

			if (this.props.map.x !=  coords[0] || this.props.map.y !=  coords[1] || this.props.map.z != zoom) {
				console.log('redirect', this.utils.$Router.link('home', {x:coords[0], y:coords[1], z:zoom }));
				this.utils.$Router.redirect(this.utils.$Router.link('home', {x:coords[0], y:coords[1], z:zoom }));
			}
	}
}

ns.App.Page.Home.View = View;

