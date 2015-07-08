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
		console.log('HOME VIEW STATE:', this.state);

		var ControlPanel = ns.App.Component.Controls.ControlPanel.View; 
		var Map = ns.App.Component.Map.View; 

		var mode = this.state.mode;
		var states = this.state.states;

		return (
			<div className='l-homepage'>
				<ControlPanel 
						mode={mode} 
						routesData={this.state.routes} 
						searchData={this.state.search}
						$Utils={this.utils} />

				<div className='content'>
					<Map
							place={this.state.mapPlace}
							displayedRoute={this.state.routes.route} 
							searchedPlace={this.state.search.seachedPlace} 
							$Utils={this.utils} />

				</div>
			</div>
		);
	}

	
}

ns.App.Page.Home.View = View;

