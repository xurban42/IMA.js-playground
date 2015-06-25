(function(){
	var Loader = {
		base: (location.protocol.match(/^http/i) ? "" : "http:") + "//api.mapy.cz",
		mode: "single",
		version: "4.11.14",
		async: false,

		_callback: false,
		_files: {
			css: {
				api: ["/css/api/api.css", "/css/api/card.css"],
				poi: "/css/api/poi.css",
				pano: "/css/api/pano.css",
				"api-simple": "/css/api/api.css"
			},

			single: {
				jak: ["/js/api/jak/touchr.js", "/js/api/jak.js"],
				api: ["/js/api/smap.js", "/config.js?key={key}"],
				poi: "/js/api/poi.js",
				pano: "/js/api/pano.js",
				"api-simple": ["/js/api/smap-simple.js", "/config.js?key={key}"]
			},

			multi: {
				jak: ["/js/api/jak/touchr.js", "/js/api/jak/jak.js"],
				api: [
						"/js/api/jak/graphics.js",
						"/js/api/jak/xml.js",
						"/js/api/jak/interpolator.js",
						"/js/api/jak/rpc.js",
						"/js/api/jak/frpc.js",
						"/js/api/jak/base64.js",
						"/js/api/jak/css3.js",
						"/js/api/api/map.js",
						"/js/api/api/map-iowned.js",
						"/js/api/api/util.js",
						"/js/api/api/projection.js",
						"/js/api/api/projection-oblique.js",
						"/js/api/api/layer.js",
						"/js/api/api/layer-tile.js",
						"/js/api/api/layer-tile-oblique.js",
						"/js/api/api/layer-image.js",
						"/js/api/api/layer-wms.js",
						"/js/api/api/layer-wmts.js",
						"/js/api/api/layer-smart.js",
						"/js/api/api/layer-smart-turist.js",
						"/js/api/api/layer-turist.js",
						"/js/api/api/layer-marker.js",
						"/js/api/api/layer-geometry.js",
						"/js/api/api/geometry.js",
						"/js/api/api/geometry-multi.js",
						"/js/api/api/marker.js",
						"/js/api/api/marker-repositioner.js",
						"/js/api/api/marker-cluster.js",
						"/js/api/api/marker-clusterer.js",
						"/js/api/api/card.js",
						"/js/api/api/control.js",
						"/js/api/api/control-keyboard.js",
						"/js/api/api/control-mouse.js",
						"/js/api/api/control-orientation.js",
						"/js/api/api/control-overview.js",
						"/js/api/api/control-layer.js",
						"/js/api/api/control-zoom.js",
						"/js/api/api/control-copyright.js",
						"/js/api/api/control-minimap.js",
						"/js/api/api/control-rosette.js",
						"/js/api/api/control-scale.js",
						"/js/api/api/contextmenu.js",
						"/js/api/api/contextmenu-item.js",
						"/js/api/util/gpx.js",
						"/js/api/util/kml.js",
						"/js/api/util/geocoder.js",
						"/js/api/util/logger.js",
						"/js/api/util/route.js",
						"/js/api/api/eggs.js",
					 "/config.js?key={key}"
				],
				poi: [
						"/js/api/poi/poiserver.js",
						"/js/api/poi/poiserver-xml.js",
						"/js/api/poi/poiserver-frpc.js",
						"/js/api/poi/dataprovider.js",
						"/js/api/poi/layer-lookup.js",
						"/js/api/poi/marker-poi.js",
						"/js/api/poi/marker-fotopoi.js",
						"/js/api/poi/marker-trafficpoi.js",
						"/js/api/poi/geometry-trafficpoi.js",
						"/js/api/poi/marker-trafficdetail.js",
						"/js/api/poi/geometry-traffic.js",
						"/js/api/poi/geometry-parkingzone.js",
						"/js/api/poi/def.js"
				],
				pano: [
						"/js/api/pano/gl-matrix-min.js",
						"/js/api/pano/gl.js",
						"/js/api/pano/pano.js",
						"/js/api/pano/pano-renderer.js",
						"/js/api/pano/pano-webgl.js",
						"/js/api/pano/pano-flash.js",
						"/js/api/pano/pano-nav.js",
						"/js/api/pano/pano-clickmask.js",
						"/js/api/pano/pano-place.js",
						"/js/api/pano/pano-scene.js",
						"/js/api/pano/pano-sphere.js",
						"/js/api/pano/pano-tile.js",
						"/js/api/pano/pano-marker.js",
						"/js/api/pano/pano-layer.js"
				],
				"api-simple": [
						"/js/api/api/map-simple.js",
						"/js/api/api/util.js",
						"/js/api/api/projection.js",
					 "/config.js?key={key}"
				]
			}
		},

		load: function(key_, what_, callback) {
			var key = key_ || "";
			var what = {
				jak: true,
				poi: false,
				pano: false,
				api: "full"
			};
			for (var p in what_) { what[p] = what_[p]; }
			if (callback) { this._callback = callback; }
			
			/* soupis souboru k naloadovani */
			var list = [];
			var css = [];
			var files = this._files[this.mode];
			if (what.jak && !window.JAK) { list = list.concat(files.jak); }
			if (what.api == "simple" && !window.SMap) { 
				list = list.concat(files["api-simple"]); 
				css = css.concat(this._files.css["api-simple"]);
			}
			if (what.api == "full" && !window.SMap) {
				list = list.concat(files.api);
				css = css.concat(this._files.css.api);
			}
			if (what.poi && !(window.SMap && window.SMap.Detail)) {
				list = list.concat(files.poi);
				css = css.concat(this._files.css.poi);
			}
			if (what.pano && !(window.SMap && window.SMap.Pano)) {
				list = list.concat(files.pano);
				css = css.concat(this._files.css.pano);
			}

			/* mozna neni co delat? */
			if (!list.length) { 
				if (this._callback) { this._callback(); }
				return;
			}
			/* vyrobit celou cestu */
			for (var i=0;i<list.length;i++) { 
				var value = list[i];
				value = value.replace(/{key}/, key);
				if (value.indexOf("?") != -1) {
					value += "&";
				} else {
					value += "?";
				}
				value += "v=" + (this.version == 0 ? Math.random() : this.version);
				list[i] = this.base + value; 
			}
			this._loadList(list);

			/* nacist css */
			var parent = (document.getElementsByTagName("head")[0] || document.documentElement);
			while (css.length) {
				var link = document.createElement("link");
				link.rel = "stylesheet";
				link.type = "text/css";
				link.href = this.base + css.shift() + "?v" + (this.version == 0 ? Math.random() : this.version);
				parent.appendChild(link);
			}
		},

		_onLoad: function() {
			this.async = true;

			if (this._callback) {
				this._callback();
				this._callback = null;
			}
		},
		
		_loadAsync: function(list) {
			var head = document.getElementsByTagName("head")[0];
			
			function readyStateChange(e) {
				var elm = e.srcElement;
				if (elm.readyState == 'loaded' || elm.readyState == 'complete') { loadNext(); }
			}
			
			function loadNext() {
				if (!list.length) {
					if (Loader._callback) {
						Loader._callback();
						Loader._callback = null;
					}
					return;
				}
				
				var name = list.shift();
				var script = document.createElement("script");
				script.charset = "utf-8";
				
				if (script.attachEvent) {
					script.attachEvent("onreadystatechange", readyStateChange);
				} else {
					script.addEventListener("load", loadNext, false);
				}
				
				script.type = "text/javascript";
				script.src = name;
				head.appendChild(script);
			}
			
			loadNext();
		},
		
		_loadSync: function(list) {
			for (var i=0;i<list.length;i++) {
				document.write('<script charset="utf-8" type="text/javascript" src="'+list[i]+'"></script>');
			}
		},
		
		_loadList: function(list) {
			if (this.async) {
				this._loadAsync(list);
			} else {
				this._loadSync(list);
			}
		}		
	};
	
	window.Loader = Loader;
	window.onload = function() { Loader._onLoad(); };
})();