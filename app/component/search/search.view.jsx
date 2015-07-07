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

		var selectBox = this.getSelectBox('select-box', this.props.data);

		return (
			<div className='search'>
				<label htmlFor='select-box'>SEARCH:&nbsp;</label>
				{selectBox}
			</div>
		);
	}

	getSelectBox(id, data) {
		if (data) {
			var optionsData = data.fakeData;
			var searchedText = data.searchedText;

			var options = optionsData.map((optionData)=> {
				return (
					<option key={optionData.value} value={optionData.value}>{optionData.title}</option>
				);
			});

			return (
				<select id={id} onChange={(e)=>{ this.selectPlace(e); }} defaultValue={searchedText} >
					{options}
				</select>
			);
			

		}

		return null;
		
	}

	selectPlace(e) {
		var selectEl = e.currentTarget;
		var selectedValue = selectEl.options[selectEl.selectedIndex].value;

		this.utils
				.$EventBus
				.fire(selectEl, 'searchEvent', {
					searchedText: selectedValue
				});
	}

}

ns.App.Component.Search.View = View;
