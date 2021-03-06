(function(jQuery) {
"use strict";

var $ = jQuery;

/**
 * @class Echo.StreamServer.Controls.Submit.Plugins.JanrainSharing
 * Plugin provides the ability to load Janrain sharing dialog after
 * the item has been posted using the Echo Submit control.
 *
 *		new Echo.StreamServer.Controls.Submit({
 *			"target": document.getElementById("echo-submit"),
 *			"appkey": "echo.jssdk.demo.aboutecho.com",
 *			"plugins": [{
 *				"name": "JanrainSharing",
 *				"appId": "echo"
 *			}]
 *		});
 *
 * The plugin implementation employs the
 * <a href="http://developers.janrain.com/documentation/widgets/social-sharing-widget/users-guide/hosting-multiple-widgets/" target="_blank">Janrain recommendation</a>
 * of hosting multiple widgets to make sure that the Janrain widget initialized
 * within the plugin doesn't interfere with other Janrain Sharing widgets on the
 * same page. If you have other Janrain widgets installed on the page, please take
 * <a href="http://developers.janrain.com/documentation/widgets/social-sharing-widget/users-guide/hosting-multiple-widgets/" target="_blank">the recommendation</a>
 * into account as well.
 *
 * More information regarding the plugins installation can be found
 * in the ["How to initialize Echo components"](#!/guide/how_to_initialize_components-section-initializing-plugins) guide.
 *
 * @extends Echo.Plugin
 *
 * @package streamserver/plugins.pack.js
 * @package streamserver.pack.js
 */
var plugin = Echo.Plugin.manifest("JanrainSharing", "Echo.StreamServer.Controls.Submit");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	if (!this._isLegacy() && !this.config.get("alwaysShare")) {
		this.extendTemplate("insertBefore", "postButton", plugin.templates.share);
	}
};

plugin.config = {
	/**
	 * @cfg {String} appId (required)
	 * A string that identifies the application.
	 * Available from Janrain Dashboard home page under "Application info"
	 * (part of the app domain before rpxnow.com).
	 * For example in https://echo.rpxnow.com appId is "echo"
	 */
	"appId": "",

	/**
	 * @cfg {Boolean} [alwaysShare]
	 * Specifies if the "Share this" checkbox should be visible so that users
	 * could decide themselves if they want to share the posted content or not.
	 * If this parameter value is set to *true* checkbox is hidden and
	 * sharing popup always appears.
	 */
	"alwaysShare": false,

	/**
	 * @cfg {Object} [sharingWidgetConfig]
	 * Container for the options specific to Janrain Sharing widget.
	 * Full list of available options can be found in the
	 * <a href="http://developers.janrain.com/documentation/widgets/social-sharing-widget/sharing-widget-js-api/settings/" target="_blank">Sharing widget documentation</a>
	 *
	 *		Example:
	 *		{
	 *			"shortenUrl": true
	 *			"title": "Some page title",
	 *			"description": "Some page description",
	 *			"image": "http://example.com/image.png"
	 *			// ...
	 *		}
	 */
	"sharingWidgetConfig": {},

	// actual limit is 140, reserving some space
	// for ellipses and shortened link to the page
	// these parameters are used _only_ in legacy mode (when xdReceiver is provided)
	"maxLength": 120,
	"reducedLength": 30,
	"maxImagesCount": 5
};

plugin.enabled = function() {
	return this.config.get("appId");
};

plugin.dependencies = [{
	"loaded": function() { return !!Echo.GUI; },
	"url": "{config:cdnBaseURL.sdk}/gui.pack.js"
}, {
	"url": "{config:cdnBaseURL.sdk}/gui.pack.css"
}];

plugin.events = {
	"Echo.StreamServer.Controls.Submit.onPostInit": function(topic, args) {
		if (this._isLegacy()) return;
		this.set("needShare", this.config.get("alwaysShare") || this.view.get("shareCheckbox").prop("checked"));
	},
	"Echo.StreamServer.Controls.Submit.onPostComplete": function(topic, args) {
		var plugin = this;
		if (plugin._isLegacy()) {
			this._shareLegacy(args);
			return;
		}
		if (!this.get("needShare")) return;
		this._share(this._prepareData(args));
	}
};

plugin.labels = {
	/**
	 * @echo_label
	 */
	"share": "Share this comment",
	"sharePrompt": "Share your comment:"
};

/**
 * @echo_template
 */
plugin.templates.share =
	'<div class="echo-secondaryFont {plugin.class:shareContainer}">' +
		'<input type="checkbox" class="{plugin.class:shareCheckbox}">' +
		'<span class="{plugin.class:shareLabel}">{plugin.label:share}</span>' +
	'</div>';

plugin.methods._share = function(data) {
	var url, plugin = this;
	var callback = function() {
		plugin.set("foreignConfig", $.extend(true, {}, janrain.engage.share.getState()));
		plugin._showPopup(data);
	};
	if (window.janrain && janrain.engage && janrain.engage.share || plugin.get("janrainInitialized")) {
		callback();
		return;
	}
	plugin.set("janrainInitialized", true);

	if (typeof window.janrain !== "object") window.janrain = {};
	if (typeof janrain.settings !== "object") janrain.settings = {};
	if (typeof janrain.settings.share !== "object") janrain.settings.share = {};
	if (typeof janrain.settings.packages !== "object") janrain.settings.packages = [];
	janrain.settings.packages.push("share");
	// we can reach this line only after DOM is loaded so no need to use "onload" event
	janrain.ready = true;

	var foreignOnload = window.janrainShareOnload;
	window.janrainShareOnload = function() {
		// let the previous onload handler do its stuff first
		if (foreignOnload) {
			foreignOnload();
			window.janrainShareOnload = foreignOnload;
		}
		callback();
	};

	url = "https:" === document.location.protocol
		? "https://rpxnow.com/js/lib/" + plugin.config.get("appId") + "/widget.js"
		: "http://widget-cdn.rpxnow.com/js/lib/" + plugin.config.get("appId") + "/widget.js";
	Echo.Loader.download([{"url": url}]);
};

plugin.methods._showPopup = function(data) {
	var image, plugin = this;
	var share = janrain.engage.share;
	var idx = janrain.events.onModalClose.addHandler(function() {
		janrain.events.onModalClose.removeHandler(idx);
		share.reset();
		share.setState(plugin.get("foreignConfig"));
		plugin.remove("foreignConfig");
	});
	var config = plugin.config.get("sharingWidgetConfig");
	share.reset();
	share.setState(config);
	share.setTitle(config.title || $("meta[property=\"og:title\"]").attr("content") || document.title);
	share.setDescription(config.description || $("meta[property=\"og:description\"]").attr("content") || "");
	share.setMessage(config.message || Echo.Utils.stripTags(data.object.content));
	share.setUrl(config.url || $("meta[property=\"og:url\"]").attr("content") || location.href.replace(/([#\?][^#\?]*)+$/, ""));
	image = config.image || $("meta[property=\"og:image\"]").attr("content") || "";
	image && share.setImage(image);
	share.show();
};

plugin.methods._prepareData = function(data) {
	var item = data.postData.content[0];
	return {
		"origin": "submit",
		"actor": {
			"id": this.component.user.get("identityUrl"),
			"name": item.actor.name,
			"avatar": item.actor.avatar
		},
		"object": {
			"id": data.request.response.objectID,
			"content": item.object.content
		},
		"source": item.source,
		"target": data.targetURL
	};
};

plugin.methods._isLegacy = function() {
	return this.config.get("xdReceiver");
};

/* global RPXNOW: false */
plugin.methods._shareLegacy = function(args) {
	var plugin = this;
	Echo.Loader.download([{
		"loaded": function() {
			return !!window.RPXNOW;
		},
		"url": ("https:" === document.location.protocol ? "https://" : "http://static.") +
			"rpxnow.com/js/lib/rpx.js"
	}], function() {
		RPXNOW.init({
			"appId": plugin.config.get("appId"),
			"xdReceiver": plugin.config.get("xdReceiver")
		});
		RPXNOW.loadAndRun(["Social"], function () {
			var activity = new RPXNOW.Social.Activity(
				plugin.config.get("activity.sharePrompt", plugin.labels.get("sharePrompt")),
				plugin._prepareContentLegacy(args),
				plugin.config.get("activity.itemURL", args.targetURL)
			);
			RPXNOW.Social.publishActivity(plugin._prepareActivityLegacy(activity));
		});
	});
};

plugin.methods._prepareActivityLegacy = function(act) {
	var plugin = this;
	var activity = act;
	var handlers = {
		"activity.pageDescription": function(content) {
			activity.setDescription(content);
		},
		"activity.pageTitle": function(content) {
			activity.setTitle(content);
		},
		"activity.pageImages": function(content) {
			var count = 0;
			var maxCount = plugin.config.get("maxImagesCount");
			var collection = new RPXNOW.Social.ImageMediaCollection();
			$.each(content, function(key, image) {
				if (count === maxCount) return false;
				if (image.src && image.href) {
					collection.addImage(image.src, image.href);
					count++;
				}
			});
			activity.setMediaItem(collection);
		}
	};
	$.each(handlers, function(key, handler){
		if (plugin.config.get(key)) {
			handler(plugin.config.get(key));
		}
	});
	return activity;
};

plugin.methods._prepareContentLegacy = function(args) {
	var plugin = this;
	var text = Echo.Utils.stripTags(args.postData.content[0].object.content);
	var messagePattern = plugin.config.get("activity.shareContent");
	if (messagePattern) {
		return plugin.labels.get(messagePattern, {
			"domain": window.location.host,
			"content": plugin._truncate(text, plugin.config.get("reducedLength"))
		});
	}
	// if a reply to a tweet was posted
	var data = args.inReplyTo;
	var maxLength = plugin.config.get("maxLength");
	if (plugin._isReplyToTweet(data)) {
		var author = plugin._getTweetAuthor(data);
		return plugin.labels.get("@{author} {content}", {
			"author": author,
			"content": plugin._truncate(text, maxLength - author.length - 2)
		});
	}
	return plugin._truncate(text, maxLength);
};

plugin.methods._truncate = function(text, limit) {
	return (limit > 0 && text.length > limit) ? text.substring(0, limit) + "..." : text;
};

plugin.methods._isReplyToTweet = function(data) {
	return !!(data && data.source && data.source.name === "Twitter");
};

plugin.methods._getTweetAuthor = function(data) {
	return data.actor.id.replace(/https?\:\/\/twitter\.com\//, "");
};

plugin.css =
	'.{plugin.class:shareContainer} { display: inline-block; margin: 0px 15px 0px 0px; }' +
	'.echo-sdk-ui .{plugin.class:shareContainer} input.{plugin.class:shareCheckbox} { margin: 0px; margin-right: 3px; padding: 0px; }';

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function(jQuery) {
"use strict";

/**
 * @class Echo.StreamServer.Controls.Stream.Item.Plugins.JanrainSharing
 * Plugin provides the ability to load Janrain sharing dialog clicking
 * the "Share" button in the item.
 *
 *		new Echo.StreamServer.Controls.Stream({
 *			"target": document.getElementById("echo-stream"),
 *			"appkey": "echo.jssdk.demo.aboutecho.com",
 *			"plugins": [{
 *				"name": "JanrainSharing",
 *				"appId": "echo"
 *			}]
 *		});
 *
 * The plugin implementation employs the
 * <a href="http://developers.janrain.com/documentation/widgets/social-sharing-widget/users-guide/hosting-multiple-widgets/" target="_blank">Janrain recommendation</a>
 * of hosting multiple widgets to make sure that the Janrain widget initialized
 * within the plugin doesn't interfere with other Janrain Sharing widgets on the
 * same page. If you have other Janrain widgets installed on the page, please take
 * <a href="http://developers.janrain.com/documentation/widgets/social-sharing-widget/users-guide/hosting-multiple-widgets/" target="_blank">the recommendation</a>
 * into account as well.
 *
 * More information regarding the plugins installation can be found
 * in the ["How to initialize Echo components"](#!/guide/how_to_initialize_components-section-initializing-plugins) guide.
 *
 * @extends Echo.Plugin
 *
 * @package streamserver/plugins.pack.js
 * @package streamserver.pack.js
 */
var plugin = Echo.Plugin.manifest("JanrainSharing", "Echo.StreamServer.Controls.Stream.Item");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	this.component.addButtonSpec("Share", this._assembleButton());
};

plugin.config = {
	/**
	 * @cfg {String} appId (required)
	 * A string that identifies the application.
	 * Available from Janrain Dashboard home page under "Application info"
	 * (part of the app domain before rpxnow.com).
	 * For example in https://echo.rpxnow.com appId is "echo"
	 */
	"appId": "",

	/**
	 * @cfg {Object} [sharingWidgetConfig]
	 * Container for the options specific to Janrain Sharing widget.
	 * Full list of available options can be found in the
	 * <a href="http://developers.janrain.com/documentation/widgets/social-sharing-widget/sharing-widget-js-api/settings/" target="_blank">Sharing widget documentation</a>
	 *
	 *		Example:
	 *		{
	 *			"shortenUrl": true,
	 *			"title": "Some page title",
	 *			"description": "Some page description",
	 *			"image": "http://example.com/image.png"
	 *			// ...
	 *		}
	 */
	"sharingWidgetConfig": {}
};

plugin.enabled = function() {
	return this.config.get("appId");
};

plugin.dependencies = [{
	"loaded": function() { return !!Echo.GUI; },
	"url": "{config:cdnBaseURL.sdk}/gui.pack.js"
}, {
	"url": "{config:cdnBaseURL.sdk}/gui.pack.css"
}];

plugin.labels = {
	"shareButton": "Share"
};

// let's copy these functions from the related plugin for Submit Control
plugin.methods._share = Echo.StreamServer.Controls.Submit.Plugins.JanrainSharing.prototype._share;
plugin.methods._showPopup = Echo.StreamServer.Controls.Submit.Plugins.JanrainSharing.prototype._showPopup;

plugin.methods._prepareData = function(item) {
	return {
		"origin": "item",
		"actor": {
			"id": item.actor.id,
			"name": item.actor.title,
			"avatar": item.actor.avatar
		},
		"object": {
			"id": item.object.id,
			"content": item.object.content
		},
		"source": item.source,
		"target": item.target.id
	};
};

plugin.methods._assembleButton = function() {
	var plugin = this, item = this.component;
	var callback = function() {
		plugin._share(plugin._prepareData(item.get("data")));
	};
	return function() {
		return {
			"name": "Share",
			"label": plugin.labels.get("shareButton"),
			"callback": callback
		};
	};
};

Echo.Plugin.create(plugin);

})(Echo.jQuery);
