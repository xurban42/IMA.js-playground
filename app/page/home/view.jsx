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
		var Menu = ns.App.Component.Menu.View; 
		var Map = ns.App.Component.Map.View; 

		var mode = this.state.mode;

		var controlView = this.getControlViewByMode(mode, this.state.states[mode]);

		return (
			<div className='l-homepage'>
				<Menu mode={mode} $Utils={this.utils} />
					{controlView}
				<div className='content'>
					<Map map={this.state.map} $Utils={this.utils} />
				</div>
			</div>
		);
	}

	getControlViewByMode(mode, data) {
		switch (mode) {
			case 'search': 
				var Search = ns.App.Component.Search.View; 
				return (
					<Search data={data} />
				);
			default: 
				return null;
		}
	}

	
}

ns.App.Page.Home.View = View;

