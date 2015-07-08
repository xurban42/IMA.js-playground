import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Component.Controls.Search');

/**
 * @class View
 * @namespace App.Component.Controls.Search
 * @module App
 * @submodule App.Component
 */
class View extends ns.Core.Abstract.Component {

	constructor(props) {
		super(props);
	}

	render() {

		var selectBox = this.getSelectBox('select-box', this.props.data);

		var className = 'search'+(this.props.className?' '+this.props.className:'');

		return (
			<div className={className}>
				<label htmlFor='select-box'>Show:&nbsp;</label>
				{selectBox}
			</div>
		);
	}

	getSelectBox(id, data) {
		if (data) {
			var optionsData = data.UIData;
			var searchedText = data.searchedPlace?data.searchedPlace.searchedText:optionsData[0].searchedText;

			var options = optionsData.map((optionData)=> {
				return (
					<option key={optionData.searchedText} value={optionData.searchedText}>{optionData.searchedText}</option>
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

ns.App.Component.Controls.Search.View = View;
