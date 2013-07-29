(function($) {

var server, canvasId;

Echo.Tests.addModule({
	"name": "Echo.Canvas",
	"meta": {
		"className" : "Echo.Canvas"
	},
	"setup": function() {
		canvasId = "js-sdk-tests/test-canvas-001";
		var reUrl = new RegExp("^" + Echo.Loader.config.storageURL.dev + canvasId + "\\?");
		server = sinon.fakeServer.create();
		server.respondWith(
			"GET",
			{
				"test": function(url) { return reUrl.test(url); }
			},
			[200,
				{"Content-Type": "application/x-javascript; charset=\"utf-8\""},
				JSON.stringify(Echo.Tests.Mocks.canvases[canvasId])
			]
		);
	},
	"teardown": function() {
		server.restore();
	}
});

Echo.Tests.constructRenderersTest({
	"component": "Echo.Canvas",
	"config": {
		"data": {
			"apps": []
		}
	}
});

QUnit.asyncTest("common workflow", function() {
	var target = $("#qunit-fixture");
	target.append('<div id="echo-canvas" data-canvas-appkey="echo.jssdk.tests.aboutecho.com" data-canvas-id="' + canvasId + '#some-id_001"></div>');
	new Echo.Canvas({
		"target": $("#echo-canvas"),
		"ready": function() {
			QUnit.ok(true, "Check that component is initialized");
			QUnit.ok(this.apps.length === 2, "Check that all apps are initialized");
			QUnit.ok(
				this.config.get("target").is(".echo-canvas-js-sdk-tests-test-canvas-001"),
				"Check that target is marked with CSS class based on canvas ID"
			);
			QUnit.ok(
				this.config.get("target").is(".echo-canvas-js-sdk-tests-test-canvas-001-some-id-001"),
				"Check that target is marked with CSS class based on canvas ID and additional ID separated with #"
			);
			QUnit.ok(
				$.grep(this.apps, function(app) {
					return app.config.get("canvasId") === canvasId + "#some-id_001";
				}).length === 2,
				"Check that all apps received the canvas ID"
			);
			QUnit.ok(
				$.grep(this.apps, function(app) {
					return !!~app.config.get("target").attr("class").indexOf("echo-canvas-appId-");
				}).length === 2,
				"Check that all apps marked with appId"
			);
			QUnit.ok(
				this.config.get("target").data("echo-canvas-initialized"),
				"Check that target marked as initialized canvas"
			);
			this.destroy();
			QUnit.ok(
				!this.config.get("target").data("echo-canvas-initialized"),
				"Check that target is not marked as initialized canvas"
			);
			QUnit.ok(
				$.grep(this.apps, function(app) {
					return $.isEmptyObject(app.subscriptionIDs);
				}).length === 2,
				"Check all apps unsubscribed from all events after destroy canvas"
			);
			QUnit.start();
		}
	});
	server.respond();
});

QUnit.asyncTest("select app script url", function() {
	var target = $("#qunit-fixture");
	target.append($('<div id="echo-canvas" data-canvas-appkey="echo.jssdk.tests.aboutecho.com" data-canvas-id="' + canvasId + '"></div>'));
	new Echo.Canvas({
		"target": $("#echo-canvas"),
		"ready": function() {
			var debug = Echo.Loader.debug;
			QUnit.strictEqual(this._getAppScriptURL({}), undefined, "If incoming object is empty, no url is returned");
			QUnit.strictEqual(this._getAppScriptURL({"script": "some-url"}), "some-url", "If \"scripts\" field is omitted, then \"script\" field will be used");
			Echo.Loader.debug = true;
			QUnit.strictEqual(this._getAppScriptURL({
				"script": "some-url",
				"scripts": {
					"prod": "some-prod-url"
				}
			}), "some-prod-url", "If \"scripts\" field provides only \"prod\" URL, then it will be used for development too");
			QUnit.strictEqual(this._getAppScriptURL({
				"script": "some-url",
				"scripts": {
					"dev": "some-dev-url",
					"prod": "some-prod-url"
				}
			}), "some-dev-url", "Returns \"dev\" URL in the \"dev\" environment");
			Echo.Loader.debug = false;
			QUnit.strictEqual(this._getAppScriptURL({
				"script": "some-url",
				"scripts": {
					"dev": "some-dev-url"
				}
			}), "some-dev-url", "If \"scripts\" field provides only \"dev\" URL, then it will be used for production too");
			QUnit.strictEqual(this._getAppScriptURL({
				"script": "some-url",
				"scripts": {
					"dev": "some-dev-url",
					"prod": "some-prod-url"
				}
			}), "some-prod-url", "Returns \"prod\" URL in the \"prod\" environment");
			if (window.location.protocol === "https:") {
				QUnit.strictEqual(this._getAppScriptURL({
					"scripts": {
						"prod": {
							"secure": "some-secure-url",
							"regular": "some-regular-url"
						}
					}
				}), "some-secure-url", "For the secure zone it returns a secure URL");
			} else {
				QUnit.strictEqual(this._getAppScriptURL({
					"scripts": {
						"prod": {
							"secure": "some-secure-url",
							"regular": "some-regular-url"
						}
					}
				}), "some-regular-url", "For the regular zone it returns a regular URL");
			}
			Echo.Loader.debug = debug;
			QUnit.start();
		}
	});
	server.respond();
});

})(Echo.jQuery);
