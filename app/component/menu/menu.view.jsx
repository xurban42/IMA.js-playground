import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Component.Menu');

/**
 * AdditionalInfo of one game.
 * @class View
 * @namespace App.Component.Menu
 * @module App
 * @submodule App.Component
 */
class View extends ns.Core.Abstract.Component {

	constructor(props) {
		super(props);

		this.items = [
			{
				title: 'Search',
				slug:'search',
				active: false
			},
			{
				title: 'Routes',
				slug:'routes',
				active: false
			},
			{
				title: 'User Marks',
				slug: 'user-marks',
				active: false
			}
		]
	}

	render() {

		var menuItems = this.items.map( (mode, index) => {
			
			var activeClass = (this.props.active == mode.slug)?'active':'';

			return (
				<li key={index} className={activeClass}>
					<a href='#' onClick={(e) => { this.setMode(e, mode.slug); } }>
						{mode.title}
					</a>
				</li>
			);
		});

		return (
			<ul className='menu'>
				{menuItems}
			</ul>
		);
	}

	setMode(e, mode) {
		e.preventDefault();
		this.utils.$EventBus.fire(e.target, 'changeMode', {'mode': mode});
	}
}

ns.App.Component.Menu.View = View;
