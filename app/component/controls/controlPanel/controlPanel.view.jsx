import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Component.Controls.ControlPanel');

/**
 * @class View
 * @namespace App.Component.Controls.ControlPanel
 * @module App
 * @submodule App.Component
 */
class View extends ns.Core.Abstract.Component {

	constructor(props) {
		super(props);
	}

	render() {

		var Menu = ns.App.Component.Controls.Menu.View; 

		var Search = ns.App.Component.Controls.Search.View; 
		var Routes = ns.App.Component.Controls.Routes.View; 

		var mode = this.props.mode;

		return (
			<div className='controlPanel'>
				<Menu mode={mode} $Utils={this.utils} />
				<Search className={mode==='search'?'active':'hidden'} data={this.props.searchData} $Utils={this.utils} />
				<Routes className={mode==='routes'?'active':'hidden'} data={this.props.routesData} $Utils={this.utils} />
			</div>
		);
	};
}

ns.App.Component.Controls.ControlPanel.View = View;
