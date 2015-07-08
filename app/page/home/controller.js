import ns from 'imajs/client/core/namespace.js';
//import IMAError from 'imajs/client/core/imaError.js';

ns.namespace('App.Page.Home');

/**
 * @class Controller
 * @extends App.Base.Controller
 * @namespace App.Page.Home
 * @module App
 * @submodule App.Page
 */
class Controller extends ns.App.Base.Controller {

	/**
	 * @method constructor
	 * @constructor
	 */
	constructor(router, mapService, searchService, routesService) {
		super();

		this._router = router;

		this._mapService = mapService;
		this._searchService = searchService;
		this._routesService = routesService;

	}

	/**
	 * Callback for initializing the controller with the route parameters.
	 *
	 * @override
	 * @method init
	 */
	init() {}


	/**
	 * Callback the controller uses to request the resources it needs to render
	 * its view. This method is invoked after the {@codelink init()} method.
	 *
	 * The controller should request all resources it needs in this method, and
	 * represent each resource request as a promise that will resolve once the
	 * resource is ready for use (these can be data fetch over HTTP(S), database
	 * connections, etc).
	 *
	 * The controller must return a map object. The field names of the object
	 * identify the resources being fetched and prepared, the values must be the
	 * Promises that resolve when the resources are ready to be used.
	 *
	 * The returned map object may also contain fields that have non-Promise
	 * value. These can be used to represent static data, or initial value of
	 * controller's state that will change due to user interaction, or resource
	 * that has been immediately available (for example fetched from the DOM
	 * storage).
	 *
	 * The system will wait for all promises to resolve, and then push them to
	 * the controller's state using the field names used in the returned map
	 * object.
	 *
	 * @override
	 * @method load
	 * @return {Object<string, (Vendor.Rsvp.Promise|*)>} A map object of promises
	 *         resolved when all resources the controller requires are ready. The
	 *         resolved values will be pushed to the controller's state.
	 */
	load() {
		// Default mode
		if (!this.params.mode) {
			this._router.redirect(this._router.link('mode', Object.assign(this.params, { mode: 'search'})));
		}

		return {
			
			//error: Promise.reject(new IMAError('Try error page.')),
			//redirect: Promise.reject(new IMAError('Redirect from home page to error page for $Debug = false.', {status: 303, url: 'http://localhost:3001/not-found'})),
			mode: this.params.mode,
			mapPlace: this._mapService.load(this.params),
			search: this._searchService.load(this.params),
			routes: this._routesService.load(this.params)
		}
	}


	update() {
		var state = this.getState();
		state.mode = this.params.mode;
		state = this._routesService.update(this.params, state);
		state = this._searchService.update(this.params, state);
		return state;
	}

	/**
	 * Callback for activating the controller in the UI. This is the last method
	 * invoked during controller initialization, called after all the promises
	 * returned from the {@codelink load()} method has been resolved, the
	 * controller's reactive view has been set and the controller has configured
	 * the SEO manager.
	 *
	 * The controller may register in this method any React and DOM event
	 * listeners the controller may need to handle the user interaction with the
	 * page.
	 *
	 * @override
	 * @method activate
	 */
	activate() {
	}

	/**
	 * Callback used to configure the meta attribute manager. The method is called
	 * after the the controller's state has been patched with the loaded
	 * resources, the view has been rendered and (if at the client-side) the
	 * controller has been provided with the rendered view.
	 *
	 * @override
	 * @method setMetaParams
	 * @param {Object<string, *>} loadedResources Map of resource names to
	 *        resources loaded by the {@codelink load} method. This is the same
	 *        object as the one passed to the {@codelink patchState} method when
	 *        the Promises returned by the {@codelink load} method were resolved.
	 * @param {Core.Interface.MetaManager} metaManager Meta attributes manager to configure.
	 * @param {Core.Interface.Router} router The current application router.
	 * @param {Core.Interface.Dictionary} dictionary The current localization
	 *        dictionary.
	 * @param {Object<string, *>} settings The application settings for the
	 *        current application environment.
	 */
	setMetaParams(loadedResources, metaManager, router, dictionary, settings) {
		var title = 'IMA.js';
		var description = 'IMA.js is isomorphic javascript application framework.';
		var image = router.getDomain() + settings.$Static.image + 'imajs-share.png';

		var url = router.getUrl();

		metaManager.setTitle(title);

		metaManager.setMetaName('description', description);
		metaManager.setMetaName('keywords', 'IMA.js, isomorphic application, javascript');
	}

	/**
	 * Finalization callback, called when the controller is being discarded by
	 * the application. This usually happens when the user navigates to a
	 * different URL.
	 *
	 * The controller should unregister all React and DOM event listeners the
	 * controller has registered in the {@codelink active()} method. The
	 * controller must also release any resources that might not be released
	 * automatically when the controller instance is destroyed by the garbage
	 * collector.
	 *
	 * @override
	 * @method destroy
	 */
	destroy() {}

	// ******************************* Event Listeners ************************************** //

	onMapCreated(e) {
		var state = this.getState();
		state.map = e.map;
		this.setState(state);
	}

	onMapMoveEnd(e) {
		this._mapService.updateMapUrl(this.params, e.x, e.y, e.z);
	}

	onChangeMode(e) {
		this._router.redirect(this._router.link('mode', Object.assign(this.params, {mode: e.mode })));
	}

	onSearchEvent(e) {
		var placeToShowOnMap = this._searchService.searchPlace(this.params, e.searchedText);
		this._mapService.showOnMap(this.params, this.getState().map, placeToShowOnMap);
	}

	onShowRoute(e) {

		var vectorLayer = this._routesService.getRoute(this.params, e.name);
		this._mapService.showRoute(this.params, this.getState().map, vectorLayer);
	}

	// ******************************* ~ Event Listeners ************************************ //
}

ns.App.Page.Home.Controller = Controller;
