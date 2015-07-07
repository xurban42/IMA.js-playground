import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Component.Search');

/**
 * AdditionalInfo of one game.
 * @class View
 * @namespace App.Component.Search
 * @module App
 * @submodule App.Component
 */
class View extends ns.Core.Abstract.Component {

	constructor(props) {
		super(props);
	}

	render() {

		var data = this.props.data;

		return (
			<div className='search'>
				<label htmlFor='select-box'>SEARCH:&nbsp;</label>
				<select id='select-box' onChange={(e)=>{ this.selectPlace(e); }}>
				  <option value={data[0].value}>{data[0].title}</option>
				  <option value={data[1].value}>{data[1].title}</option>
				</select>
			</div>
		);
	}

	selectPlace(e) {
		console.log(e);
	}

}

ns.App.Component.Search.View = View;
