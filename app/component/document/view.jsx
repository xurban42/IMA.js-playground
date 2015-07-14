import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Component.Document');

/**
 * Master Layout.
 * @class View
 * @namespace App.Component.Layout.Master
 * @module App
 * @submodule Component
 */
class View extends ns.Core.Abstract.Component {
	render() {
		var appCssFile = this.utils.$Settings.$Env !== 'dev' ? 'app.bundle.min.css' : 'app.css';
		appCssFile += `?version=${this.utils.$Settings.$Page.$Render.version}`;
		var scripts = this.getScripts();

		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

					<meta name="description" content={this.props.metaManager.getMetaName('description')} />
					<meta name="keywords" content={this.props.metaManager.getMetaName('keywords')} />

					<meta property="og:title" content={this.props.metaManager.getMetaProperty('og:title')} />
					<meta property="og:description" content={this.props.metaManager.getMetaProperty('og:description')} />
					<meta property="og:type" content={this.props.metaManager.getMetaProperty('og:type')} />
					<meta property="og:url" content={this.props.metaManager.getMetaProperty('og:url')} />
					<meta property="og:image" content={this.props.metaManager.getMetaProperty('og:image')} />

					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="stylesheet" href={`/static/css/${appCssFile}`} />
					<title>
						{this.props.metaManager.getTitle()}
					</title>
				</head>
				<body>
					<div id="page" dangerouslySetInnerHTML={{__html: this.props.page}} />
					<div id="revivalSettings" dangerouslySetInnerHTML={{__html: this.props.revivalSettings}}/>
					<div id="scripts">
						{scripts}
					</div>
				</body>
			</html>
		);
	}

	getScripts() {
		return this.utils.$Settings.$Page.$Render.scripts.map((script, index) => {
			return <script src={script} key={"script" + index}/>;
		});
	}
}

ns.App.Component.Document.View = View;
