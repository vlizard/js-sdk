(function(jQuery) {
var $ = jQuery;

"use strict";

Echo.Tests.addModule({
	"name": "Echo.Loader",
	"meta": {
		"className": "Echo.Loader",
		"functions": [
			"init",
			"initApplication",
			"initEnvironment",
			"isDebug",
			"download",
			"override",
			"getURL"
		]
	},
	"setup": function() {
		Echo.Tests.Fixtures.loader = {};
	}
});

QUnit.test("URL conversion", function() {
	var cdnBaseURL = Echo.Loader.config.cdnBaseURL;
	var version = Echo.Loader.version;
	var debug = Echo.Loader.debug;
	function checkURLs(urls) {
		$.each(urls, function(i, spec) {
			QUnit.ok(spec.expect === Echo.Loader.getURL(spec.data), "Checking URL conversion: '" + spec.data + "'");
		});
	}
	var urls = {
		"absolute": [{
			"data": "//cdn.echoenabled.com/image.png",
			"expect": "//cdn.echoenabled.com/image.png"
		}, {
			"data": "http://echoenabled.com/image.png",
			"expect": "http://echoenabled.com/image.png"
		}, {
			"data": "https://echoenabled.com/image.png",
			"expect": "https://echoenabled.com/image.png"
		}],
		"relative": [{
			"data": "/web/image.png",
			"expect": cdnBaseURL + "sdk/v" + version + "/web/image.png"
		}, {
			"data": "web/image.png",
			"expect": cdnBaseURL + "sdk/v" + version + "/web/image.png"
		}, {
			"data": "",
			"expect": cdnBaseURL + "sdk/v" + version
		}],
		"relativeDev": [{
			"data": "/web/image.png",
			"expect": cdnBaseURL + "sdk/v" + version + "/dev/web/image.png"
		}, {
			"data": "web/image.png",
			"expect": cdnBaseURL + "sdk/v" + version + "/dev/web/image.png"
		}, {
			"data": "",
			"expect": cdnBaseURL + "sdk/v" + version + "/dev"
		}]
	};
	checkURLs(urls.absolute);
	Echo.Loader.debug = false;
	QUnit.ok(!Echo.Loader.isDebug(), "Checking if debug mode is off");
	checkURLs(urls.relative);
	Echo.Loader.debug = true;
	QUnit.ok(Echo.Loader.isDebug(), "Checking if debug mode is on");
	checkURLs(urls.relativeDev);
	QUnit.equal(
		Echo.Loader.getURL("web/image.png", false),
		cdnBaseURL + "sdk/v" + version + "/web/image.png",
		"Checking URL conversion: /web/image.png, no dev version"
	);
	Echo.Loader.debug = debug;
});

QUnit.asyncTest("resource downloading", function() {
	var base = Echo.Tests.baseURL + "tests/fixtures/resources/loader/";
	var emptyResourceArray = function(callback) {
		Echo.Loader.download([], function() {
			QUnit.ok(true, "Checking if the callback is fired even if the list of the scripts to load is empty (empty array)");
			callback();
		});
	};
	var missingResourceArray = function(callback) {
		Echo.Loader.download(undefined, function() {
			QUnit.ok(true, "Checking if the callback is fired even if the scripts list is undefined");
			callback();
		});
	};
	var callbackCheck = function(callback) {
		try {
			Echo.Loader.download([]);
			QUnit.ok(true, "Checking if the callback is an optional parameter (no JS error expected)");
		} catch(e) {
			QUnit.ok(false, "Received JS error when trying to launch \"download\" function without a \"callback\" function");
		}
		callback();
	};
	var nonExistingScripts = function(callback) {
		Echo.Loader.download([{
			"url": base + "non-existing-folder/1.js"
		}, {
			"url": base + "nonexisting-file.js"
		}], function() {
			QUnit.ok(true, "Checking if the callback is executed when non-existing scripts were passed as a function arguments");
			callback();
		}, {
			"errorTimeout": 1000 // 1 sec
		});
	};
	var alreadyDownloadedScripts = function(callback) {
		Echo.Loader.download([{
			"url": "events.js"
		}, {
			"url": "labels.js",
			"loaded": function() { return !!Echo.Labels; }
		}, {
			"url": "plugin.js"
		}], function() {
			QUnit.ok(true, "Checking if the callback is executed when the scripts loaded previously are loaded again");
			callback();
		});
	};
	var equalUrlsPerSingleCall = function(callback) {
		Echo.Loader.download([
			{"url": base + "dup1.js"},
			{"url": base + "dup1.js"},
			{"url": base + "dup1.css"},
			{"url": base + "dup1.css"}
		], function() {
			QUnit.ok(!!Echo.Tests.Fixtures.loader.duplicate1, "Checking if the callback is executed when equal URLs of js/css was loaded per single call");
			callback();
		});
	};
	var equalUrlsPerSequentialCalls = function(callback) {
		Echo.Loader.download([
			{"url": base + "dup2.js"},
			{"url": base + "dup2.css"}
		], function() {
			Echo.Loader.download([
				{"url": base + "dup2.js"},
				{"url": base + "dup2.css"}
			], function() {
				QUnit.ok(!!Echo.Tests.Fixtures.loader.duplicate2, "Checking if the callback is executed when equal URLs of js/css was loaded per sequential call");
				callback();
			});
		});
	};
	var equalUrlsPerParallelCalls = function(callback) {
		var k = 2;
		var commonCallback = function() {
			if (!--k) {
				QUnit.ok(!!Echo.Tests.Fixtures.loader.duplicate3, "Checking if the callback is executed when equal URLs of js/css was loaded per parallel call");
				callback();
			}
		};
		Echo.Loader.download([
			{"url": base + "dup3.js"},
			{"url": base + "dup3.css"}
		], commonCallback);
		Echo.Loader.download([
			{"url": base + "dup3.js"},
			{"url": base + "dup3.css"}
		], commonCallback);
	};
	var _scriptsLoading = function(callback, description, count) {
		var existingScriptsCount = 3;
		count = count || existingScriptsCount;
		var resources = [];
		for (var i = 1; i <= count; i++) {
			resources.push({
				"url": base + (count > existingScriptsCount ? "non-existing" : i) + ".js",
				"loaded": function() { return !!Echo.Tests.Fixtures.loader["object" + i]; }
			});
		}
		Echo.Loader.download(resources, function() {
			var success = true;
			// check only existing scripts
			for (var i = 1; i <= existingScriptsCount; i++) {
				if (success) {
					success = !!Echo.Tests.Fixtures.loader["object" + i];
				}
			}
			QUnit.ok(success, description);
			callback();
		}, {
			"errorTimeout": 1000 // 1 sec
		});
	};
	var validScripts = function(callback) {
		_scriptsLoading(callback, "Checking if all the test scripts were loaded successfully");
	};
	var validAndInvalidScriptsMix = function(callback) {
		_scriptsLoading(callback, "Checking if the mix of valid and invalid scripts is handled by the loader correctly", 4);
	};
	var loadingSameScriptMultipleTimes = function(callback) {
		delete Echo.Tests.Fixtures.loader.object1;
		var resources = [];
		for (var i = 1; i <= 5; i++) {
			resources.push({
				"url": base + "1.js"
			});
		}
		Echo.Loader.download(resources, function() {
			QUnit.ok(true, "Checking the situation when the same script is loaded multiple times (checking if the callback is executed)");
			callback();
		});
	};
	var fireSameScriptLoadingMultipleTimes = function(callback) {
		var resources = [{
			"url": base + "check-multiple-downloads.js"
		}];
		var count = 0;
		var check = function() {
			return Echo.Control.isDefined("Echo.Tests.Controls.TestMultipleDownloads");
		};
		var maybeExecuteCallback = function() {
			if (++count === 3) callback();
		};
		Echo.Loader.download(resources, function() {
			QUnit.ok(check(), "Checking if the control is defined after the first download");
			maybeExecuteCallback();
		});
		Echo.Loader.download(resources, function() {
			QUnit.ok(check(), "Checking if the control is defined after the second (parallel) download");
			maybeExecuteCallback();
		});
		Echo.Loader.download(resources, function() {
			Echo.Loader.download(resources, function() {
				Echo.Loader.download(resources, function() {
					QUnit.ok(check(),
						"Checking if the 'download' functions can be executed within the previous 'download' function calls");
					maybeExecuteCallback();
				});
			});
		});
	};

	QUnit.expect(14);
	Echo.Utils.sequentialCall([
		emptyResourceArray,
		missingResourceArray,
		callbackCheck,
		nonExistingScripts,
		alreadyDownloadedScripts,
		equalUrlsPerSingleCall,
		equalUrlsPerSequentialCalls,
		equalUrlsPerParallelCalls,
		validScripts,
		validAndInvalidScriptsMix,
		loadingSameScriptMultipleTimes,
		fireSameScriptLoadingMultipleTimes
	], function() {
		QUnit.start();
	});
});

QUnit.asyncTest("yepnope corner cases", function() {
	// This code reproduces the issue described here:
	// https://github.com/SlexAxton/yepnope.js/issues/113
	//
	// Test case: load a file via Echo.Loader.download and in its callback function
	// load some more files, one synchronously and one asynchronously
	// (or maybe more than one).
	//
	// Yepnope uses two-phase script loading mechanism: first preloads and then
	// executes it. The issue appears when asynchronous script is pushed to the stack
	// of scripts to be loaded and then synchronous script is preloaded but not
	// executed yet. In this test case yepnope tries to execute synchronous script
	// before it's fully preloaded.
	var raceConditions = function(callback) {
		var base = Echo.Tests.baseURL + "tests/fixtures/resources/loader";
		Echo.Loader.download([{"url": base + "/yepnope-base.js"}], function() {
			QUnit.ok(!!Echo.Tests.Fixtures.loader.yepnope, "Check if base script is loaded");
			// we override injectJs function to be sure that
			// preloading is finished before executing the script
			var injectJs = Echo.yepnope.injectJs;
			Echo.yepnope.injectJs = function () {
				var self = this;
				var arg = arguments;
				setTimeout(function() {
					injectJs.apply(self, arg);
				}, 5000);
			};
			Echo.Loader.download([{"url": base + "/yepnope-first.js"}], function() {
				QUnit.ok(Echo.Tests.Fixtures.loader.yepnope.first,
					"Check if first callback is executed after complete loading of first script");
			});
			// asynchronous loading of this script affects internal state of yepnope
			setTimeout(function() {
				Echo.Loader.download([{"url": base + "/yepnope-second.js"}], function() {
					QUnit.ok(Echo.Tests.Fixtures.loader.yepnope.second,
						"Check if second callback is executed after complete loading of second script");
					Echo.yepnope.injectJs = injectJs;
					callback();
				});
			}, 10);
		});
	};
	var removingFirstNode = Echo.Tests.iframeTest(function(callback) {
		var script = $("<script>");
		var head = $("head", this.document);
		head.prepend(script);
		$("<script>").on("load readystatechange", function() {
			$(this).off("load readystatechange");
			script.remove();
			Echo.Loader.download([{
				"url": Echo.Tests.baseURL +
					"tests/fixtures/resources/loader/check-removing-first-script.js"
			}], function() {
				QUnit.ok(Echo.Tests.Fixtures.loader.firstScriptRemoved,
					"Check if removing of firstNode doesn't cause side effects");
				callback();
			});
		}).appendTo(head).attr({
			"type": "text/javascript",
			"src": "http://cdn.echoenabled.com/sdk/v3/loader.js"
		});
	});
	Echo.Utils.sequentialCall([
		raceConditions,
		removingFirstNode
	], function() {
		QUnit.start();
	});
});

QUnit.asyncTest("environment initialization", function() {
	var emptyCallback = function(callback) {
		try {
			Echo.Loader.initEnvironment();
			QUnit.ok(true, "Checking if the 'callback' param is optional (no errors produced)");
		} catch(e) {
			QUnit.ok(false, "Calling 'initEnvironment' with no callback produced JS error...");
		}
		callback();
	};
	var environmentCheck = function(callback) {
		Echo.Loader.initEnvironment(function() {
			QUnit.ok(true, "Checking if the callback is being fired as soon as the environment is ready.");
			QUnit.ok(!!window.Backplane && !!Echo.Control && Echo.jQuery,
				"Checking if the callback is being fired as soon as the environment is ready.");
			var state = $.extend(true, {}, Echo.Loader.vars.state);
			Echo.Loader.initEnvironment();
			QUnit.deepEqual(state, Echo.Loader.vars.state,
				"Checking if the second 'initEnvironment' function call doesn't produce any downloading requests");
			callback();
		});
	};
	QUnit.expect(4);
	Echo.Utils.sequentialCall([
		emptyCallback,
		environmentCheck
	], function() {
		QUnit.start();
	});
});

QUnit.asyncTest("application initialization", function() {
	var initCounterApplication = function(callback) {
		$("qunit-fixture").empty();
		Echo.Loader.initApplication({
			"script": "streamserver.pack.js",
			"component": "Echo.StreamServer.Controls.Counter",
			"config": {
				"target": $("qunit-fixture"),
				"data": {"count": 5},
				"appkey": "echo.jssdk.tests.aboutecho.com",
				"liveUpdates": {"enabled": false},
				"ready": function() {
					QUnit.ok(this.config.get("data.count") === 5, "Checking if the Counter application was initialized");
					this.destroy();
					callback();
				}
			}
		});
	};
	var initForeignApplication = function(callback) {
		$("qunit-fixture").empty();
		Echo.Loader.initApplication({
			"script": Echo.Tests.baseURL + "tests/fixtures/resources/loader/foreign-class.js",
			"component": "SomeForeignClass",
			"config": {
				"target": $("qunit-fixture")
			}
		});
		// initApplication pushes data to canvases object so let's use it
		var canvas = Echo.Loader.canvases.pop();
		Echo.Events.subscribe({
			"topic": "Echo.Canvas.onReady",
			"context": canvas.config.get("context"),
			"once": true,
			"handler": function() {
				QUnit.ok(!!window.SomeForeignClass, "Check that foreign class was loaded");
				callback();
			}
		});
	};
	QUnit.expect(2);
	Echo.Utils.sequentialCall([
		initCounterApplication,
		initForeignApplication
	], function() {
		QUnit.start();
	});
});

QUnit.asyncTest("canvases initialization", function() {
	var simpleValidCanvas = Echo.Tests.iframeTest(function(callback) {
		$(this.document.body).append('<div class="echo-canvas" data-canvas-id="js-sdk-tests/test-canvas-001" data-canvas-appkey="echo.jssdk.tests.aboutecho.com"></div>');
		var expecting = 2;
		var waitForCompletion = function(canvasID, appID) {
			Echo.Loader.override(canvasID, appID, {"ready": function() {
				this.destroy();
				expecting--;
				if (!expecting) {
					QUnit.ok(true, "[simple valid canvas] Checking if both controls (Stream and Submit) were initialized correctly after a page canvases lookup");
					callback();
				}
			}});
		};
		waitForCompletion("js-sdk-tests/test-canvas-001", "submit");
		waitForCompletion("js-sdk-tests/test-canvas-001", "stream");
		Echo.Loader.init({"target": this.document.body});
	});
	var validAndInvalidCanvases = Echo.Tests.iframeTest(function(callback) {
		var body = $(this.document.body);
		// all mandatory fields are missing -->
		body.append('<div class="echo-canvas"></div>');
		body.append('<div class="echo-canvas" id="echo-canvas"></div>');
		// missing appkey
		body.append('<div class="echo-canvas" data-canvas-id="js-sdk-tests/canvas.001"></div>');
		body.append('<div class="echo-canvas" data-canvas-id="js-sdk-tests/canvas.002"></div>');
		// missing canvas id
		body.append('<div class="echo-canvas" data-appkey="canvas.003"></div>');
		// all fields defined, but no config available for the canvas id specified
		body.append('<div class="echo-canvas" data-canvas-id="js-sdk-tests/canvas.004" data-canvas-appkey="echo.jssdk.tests.aboutecho.com"></div>');
		body.append('<div class="echo-canvas" data-canvas-id="js-sdk-tests/canvas.005" data-canvas-appkey="echo.jssdk.tests.aboutecho.com"></div>');
		// canvas with empty app list
		body.append('<div class="echo-canvas" data-canvas-id="js-sdk-tests/test-canvas-004" data-canvas-appkey="echo.jssdk.tests.aboutecho.com"></div>');
		// canvas with no app list and no Backplane config
		body.append('<div class="echo-canvas" data-canvas-id="js-sdk-tests/test-canvas-005" data-canvas-appkey="echo.jssdk.tests.aboutecho.com"></div>');
		// canvas with no configuration at all (empty JSON object)
		body.append('<div class="echo-canvas" data-canvas-id="js-sdk-tests/test-canvas-006" data-canvas-appkey="echo.jssdk.tests.aboutecho.com"></div>');
		// valid canvas with existing configuration
		body.append('<div class="echo-canvas" data-canvas-id="js-sdk-tests/test-canvas-001" data-canvas-appkey="echo.jssdk.tests.aboutecho.com"></div>');

		var count = {
			"valid": 2,
			"invalid": 10
		};
		var errors = {
			"invalid_canvas_config": [0, 8],
			"unable_to_retrieve_app_config": [0, 2]
		};
		var eventsCountCheck = function(events) {
			var success = true;
			$.each(events, function(id, event) {
				if (event[0] != event[1]) {
					success = false;
					return false; // break
				}
			});
			return success;
		};
		// check invalid canvases
		var handlerId = Echo.Events.subscribe({
			"topic": "Echo.Canvas.onError",
			"handler": function(topic, args) {
				count.invalid--;
				errors[args.code][0]++;
				if (!count.invalid) {
					Echo.Events.unsubscribe({"handlerId": handlerId});
					QUnit.ok(eventsCountCheck(errors), "[valid and invalid canvases] Checking if the canvases on the page were analyzed correctly by the Loader");
					if (!count.valid) callback();
				}
			}
		});
		// check valid canvas
		var waitForCompletion = function(canvasID, appID) {
			Echo.Loader.override(canvasID, appID, {"ready": function() {
				this.destroy();
				count.valid--;
				if (!count.valid) {
					QUnit.ok(true, "[valid and invalid canvases] Checking if both controls (Stream and Submit) were initialized correctly after a page canvases lookup");
					if (!count.invalid) callback();
				}
			}});
		};
		waitForCompletion("js-sdk-tests/test-canvas-001", "submit");
		waitForCompletion("js-sdk-tests/test-canvas-001", "stream");
		Echo.Loader.init({"target": body});
	});
	var doubleInitializationPrevention = Echo.Tests.iframeTest(function(callback) {
		var body = $(this.document.body);
		body.append('<div class="echo-canvas" id="canvas" data-canvas-id="js-sdk-tests/test-canvas-001" data-canvas-appkey="echo.jssdk.tests.aboutecho.com"></div>');
		var count = {
			"valid": 2,
			"invalid": 3
		};
		var errors = {
			"canvas_already_initialized": [0, 3]
		};
		var eventsCountCheck = function(events) {
			var success = true;
			$.each(events, function(id, event) {
				if (event[0] != event[1]) {
					success = false;
					return false; // break
				}
			});
			return success;
		};
		// check invalid canvases
		var handlerId = Echo.Events.subscribe({
			"topic": "Echo.Canvas.onError",
			"handler": function(topic, args) {
				count.invalid--;
				errors[args.code][0]++;
				if (!count.invalid) {
					Echo.Events.unsubscribe({"handlerId": handlerId});
					QUnit.ok(eventsCountCheck(errors), "[double initialization prevention] Checking if the Loader indicated multiple initialization attempts");
					if (!count.valid) callback();
				}
			}
		});
		// check valid canvas
		var waitForCompletion = function(canvasID, appID) {
			Echo.Loader.override(canvasID, appID, {"ready": function() {
				this.destroy();
				count.valid--;
				if (!count.valid) {
					QUnit.ok(true, "[double initialization prevention] Checking if both controls (Stream and Submit) were initialized correctly after a page canvases lookup");
					if (!count.invalid) callback();
				}
			}});
		};
		waitForCompletion("js-sdk-tests/test-canvas-001", "submit");
		waitForCompletion("js-sdk-tests/test-canvas-001", "stream");
		// multiple initialization attempts,
		// we expect each canvas to be initialized only once
		Echo.Loader.init({"target": body});
		Echo.Loader.init({"canvases": this.document.getElementById("canvas")});
		Echo.Loader.init({"canvases": $("#canvas", body)});
		Echo.Loader.init({"canvases": $(".echo-canvas", body)});
	});

	Echo.Utils.sequentialCall([
		simpleValidCanvas,
		validAndInvalidCanvases,
		doubleInitializationPrevention
	], function() {
		QUnit.start();
	});
});

return;
// checking canvases initialization scenarios

suite.prototype.tests.canvasesInitializationTests = {
	"config": {
		"async": true,
		"testTimeout": 15000
	},
	"check": function() {
		var self = this;
		this.sequentialAsyncTests($.map([
			"different-initialization-schemas",
			"multiple-apps-canvas",
			"overrides-same-canvases",
			"app-config-overrides"
		], function(name) {
			return self.loaderIframeTest(name);
		}));
	}
};

/*
 * TODO fix relative URLs in tests/unit/loader/canvases/test.canvas.007.json
 * TODO: update it to new test infrastructure
suite.prototype.tests.canvasesScriptsLoadingTest = {
	"config": {
		"async": true,
		"testTimeout": 5000
	},
	"check": function() {
		var self = this;
		var debug = Echo.Loader.debug;

		$("#qunit-fixture").append("<div class=\"echo-canvas\" data-canvas-appkey=\"echo.jssdk.tests.aboutecho.com\" data-canvas-id=\"js-sdk-tests/test.canvas.007\"></div>");

		Echo.Loader.override("test.canvas.007", "test.apps.scripts", {"ready": function() {
			this.destroy();
			QUnit.ok(Echo.Variables.TestControl === "development", "Check if development version of application script was loaded");

			Echo.Loader.debug = false;
			delete window.Echo.Tests.Controls.TestControl;
			$("#qunit-fixture").empty().append("<div class=\"echo-canvas\" data-canvas-appkey=\"echo.jssdk.tests.aboutecho.com\" data-canvas-id=\"js-sdk-tests/test.canvas.007\"></div>");
			Echo.Loader.override("test.canvas.007", "test.apps.scripts", {"ready": function() {
				this.destroy();
				QUnit.ok(Echo.Variables.TestControl === "production", "Check if production version of application script was loaded");

				Echo.Loader.debug = debug;
				delete window.Echo.Tests.Controls.TestControl;

				QUnit.start();
			}});
			Echo.Loader.init({ "target": $("#qunit-fixture") });
		}});
		Echo.Loader.init({ "target": $("#qunit-fixture") });
	}
};
*/

// static interface with utils functions (to be accessible within nested iframes)

suite.eventsCountCheck = function(events) {
	var success = true;
	$.each(events, function(id, event) {
		if (event[0] != event[1]) {
			success = false;
			return false; // break
		}
	});
	return success;
};

})(Echo.jQuery);
