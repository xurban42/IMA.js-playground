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

	render() {

		var ControlPanel = ns.App.Component.Controls.ControlPanel.View; 
		var Map = ns.App.Component.Map.View; 

		var mode = this.props.mode;
		var states = this.props.states;

		return (
			<div className='l-homepage'>
				<ControlPanel 
						mode={mode} 
						routesData={this.props.routes} 
						searchData={this.props.search}
						$Utils={this.utils} />

				<div className='content'>
					<Map
							place={this.props.mapPlace}
							displayedRoute={this.props.routes.route} 
							searchedPlace={this.props.search.seachedPlace} 
							$Utils={this.utils} />

				</div>
			</div>
		);
	}

	
}

ns.App.Page.Home.View = View;

