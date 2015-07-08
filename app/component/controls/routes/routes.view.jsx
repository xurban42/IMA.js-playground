import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Component.Controls.Routes');

/**
 * @class View
 * @namespace App.Component.Controls.Routes
 * @module App
 * @submodule App.Component
 */
class View extends ns.Core.Abstract.Component {

	constructor(props) {
		super(props);
	}

	render() {

		var routesData = this.props.data.UIData;
		var buttons = null;
		if (routesData) {
			buttons = routesData.map((route, index) => {
				return <a key={'routeButton'+index} className='button' href='#' onClick={(e) => this.showRoute(e, route.name)}>{route.name}</a>
			});
		}
		
		var className = 'routes'+(this.props.className?' '+this.props.className:'');

		return (
			<div ref='routes' className={className}>
			<h3>Show routes:</h3>
				{buttons}
			</div>
		);
	}

	showRoute(e, routeName) {
		e.preventDefault();
		
		this.utils
				.$EventBus
				.fire(e.currentTarget, 'showRoute', {
					name: routeName
				});
	}

}

ns.App.Component.Controls.Routes.View = View;
