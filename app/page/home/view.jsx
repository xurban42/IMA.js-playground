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

		return (
			<div className='l-homepage'>
				<Menu $Utils={this.utils} />
				<div className='content'>
					<Map map={this.props.map} $Utils={this.utils} />
				</div>
			</div>
		);
	}

	
}

ns.App.Page.Home.View = View;

