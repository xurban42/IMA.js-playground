export var init = (ns, oc, config) => {

	oc.bind('SearchService', ns.App.Module.Search.Service);

	// Page Home
	oc.inject(ns.App.Page.Home.Controller, ['$Router', 'SearchService']);

	// Page Error
	oc.inject(ns.App.Page.Error.Controller, []);

	// Page Not Found
	oc.inject(ns.App.Page.NotFound.Controller, []);


	//COMPONENT Utils
	oc.constant('$Utils', {
		$Router: oc.get('$Router'),
		$EventBus: oc.get('$EventBus'),
		$Dictionary: oc.get('$Dictionary'),
		$Settings: oc.get('$Settings'),
		$Window: oc.get('$Window')
	});
};
