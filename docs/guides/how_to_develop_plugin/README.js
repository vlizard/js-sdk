Ext.data.JsonP.how_to_develop_plugin({
  "guide": "<h1>How to develop a plugin</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/how_to_develop_plugin-section-1'>Introduction</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-2'>Creating the plugin skeleton</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-3'>Plugin configuration</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-4'>Adding helper methods</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-5'>Labels</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-6'>Extending control template</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-7'>Adding renderers</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-8'>CSS rules</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-9'>Plugin state management</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-10'>Events</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-11'>Dependencies</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-12'>Plugin installation</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-13'>Complete plugin source code</a></li>\n<li><a href='#!/guide/how_to_develop_plugin-section-14'>More examples</a></li>\n</ol>\n</div>\n\n<p>Echo JS SDK provides the ability to extend the functionality of any Echo Control or an Application using the Plugins approach. This page will guide you through the steps of custom plugins creation.</p>\n\n<h2 id='how_to_develop_plugin-section-1'>Introduction</h2>\n\n<p>Plugin is an object with the predefined structure which extends the default functionality of an application or its components.</p>\n\n<p>Let's imagine that we want to add the dropdown with the possible sorting options into the Stream control UI. As soon as the sorting order is selected, the Stream should be refreshed to reflect the user action.</p>\n\n<h2 id='how_to_develop_plugin-section-2'>Creating the plugin skeleton</h2>\n\n<p>First of all, let's prepare the JavaScript closure to allocate a separate namespace for our plugin's code. This step is common for all plugins, controls and apps built on top of the JS SDK. You can find the detailed information on how to create the JS closure in the <a href=\"#!/guide/terminology-section-3\">\"Terminology and dev tips\" guide</a>. So we have the following code as a starting point:</p>\n\n<pre class='inline-example '><code>(function(jQuery) {\n\"use strict\";\n\nvar $ = jQuery;\n\n// component code goes here\n\n})(Echo.jQuery);\n</code></pre>\n\n<p>Now let's add the plugin definition. Echo JS SDK contains a special <a href=\"#!/api/Echo.Plugin\">Echo.Plugin</a> class to facilitate the plugin creation, we'll use some functions to add the plugin definition:</p>\n\n<pre class='inline-example '><code>(function(jQuery) {\n\"use strict\";\n\nvar $ = jQuery;\n\nvar plugin = <a href=\"#!/api/Echo.Plugin-static-method-manifest\" rel=\"Echo.Plugin-static-method-manifest\" class=\"docClass\">Echo.Plugin.manifest</a>(\"StreamSortingSelector\", \"<a href=\"#!/api/Echo.StreamServer.Controls.Stream\" rel=\"Echo.StreamServer.Controls.Stream\" class=\"docClass\">Echo.StreamServer.Controls.Stream</a>\");\n\nif (<a href=\"#!/api/Echo.Plugin-static-method-isDefined\" rel=\"Echo.Plugin-static-method-isDefined\" class=\"docClass\">Echo.Plugin.isDefined</a>(plugin)) return;\n\n<a href=\"#!/api/Echo.Plugin-static-method-create\" rel=\"Echo.Plugin-static-method-create\" class=\"docClass\">Echo.Plugin.create</a>(plugin);\n\n})(Echo.jQuery);\n</code></pre>\n\n<p>So we've called the <a href=\"#!/api/Echo.Plugin-static-method-manifest\">\"Echo.Plugin.manifest\"</a> function, passed the name of the plugin and the type of the control as arguments. We checked whether the plugin was already initialized or not, to avoid multiple plugin re-definitions in case the plugin script was included into the page source several times. After that we passed the manifest into the <a href=\"#!/api/Echo.Plugin-static-method-create\">Echo.Plugin.create</a> function to generate the plugin JS class out of the static declaration.</p>\n\n<p>At that point we can consider the plugin skeleton ready and start adding the business logic into it.</p>\n\n<h2 id='how_to_develop_plugin-section-3'>Plugin configuration</h2>\n\n<p>Let's assume that we need a configuration parameter for our plugin to define the list of the sorting options we want to expose in the dropdown. Also we want to define a default value of the parameter in case it is omitted in the plugin configuration while installing it into the necessary Stream control. In order to do it we add the \"config\" object to the plugin manifest with the name of the config field as a key and a default as its value, so the code of the plugin will look like:</p>\n\n<pre class='inline-example '><code>(function(jQuery) {\n\"use strict\";\n\nvar $ = jQuery;\n\nvar plugin = <a href=\"#!/api/Echo.Plugin-static-method-manifest\" rel=\"Echo.Plugin-static-method-manifest\" class=\"docClass\">Echo.Plugin.manifest</a>(\"StreamSortingSelector\", \"<a href=\"#!/api/Echo.StreamServer.Controls.Stream\" rel=\"Echo.StreamServer.Controls.Stream\" class=\"docClass\">Echo.StreamServer.Controls.Stream</a>\");\n\nif (<a href=\"#!/api/Echo.Plugin-static-method-isDefined\" rel=\"Echo.Plugin-static-method-isDefined\" class=\"docClass\">Echo.Plugin.isDefined</a>(plugin)) return;\n\nplugin.config = {\n    \"orders\": [\n        \"reverseChronological\",\n        \"chronological\",\n        \"likesDescending\",\n        \"flagsDescending\",\n        \"repliesDescending\"\n    ]\n};\n\n<a href=\"#!/api/Echo.Plugin-static-method-create\" rel=\"Echo.Plugin-static-method-create\" class=\"docClass\">Echo.Plugin.create</a>(plugin);\n\n})(Echo.jQuery);\n</code></pre>\n\n<p>If we need more options in future, they can be appended as additional fields into the \"config\" hash.</p>\n\n<p>Now everywhere in the plugin's code we'll be able to use the following call:</p>\n\n<pre class='inline-example '><code>this.config.get(\"orders\"); // assuming that \"this\" points to the plugin instance\n</code></pre>\n\n<p>to get the value of the \"order\" config parameter defined during the plugin installation or to access the default value otherwise. Note: the \"this\" var should point to the plugin instance.</p>\n\n<h2 id='how_to_develop_plugin-section-4'>Adding helper methods</h2>\n\n<p>Before we add the dropdown we need to understand which option should be marked as \"active\". For these purposes let's define the function which will extract the sort order out of the search query defined for the Stream control. There is a special place for the helper functions in the plugin definition: it's called the \"methods\" object. The method to extract the sorting order might look like:</p>\n\n<pre class='inline-example '><code>plugin.methods._getSortOrder = function() {\n    var stream = this.component;\n    var regex = new RegExp(\"sortOrder:(\" + this.config.get(\"orders\").join(\"|\") + \")\");\n    var result = stream.config.get(\"query\").match(regex);\n    return result &amp;&amp; result[1];\n};\n</code></pre>\n\n<p>Few important notes here:</p>\n\n<ul>\n<li><p>we added the underscore before the name of the function to indicate that this function is private and nobody should call it outside the plugin's code</p></li>\n<li><p>we refer to the Stream control using the \"this.component\" field. The reference to the parent component is always available inside the plugin</p></li>\n<li><p>the \"_getSortOrder\" function will be available in the plugin's code as \"this._getSortOrder()\", assuming that \"this\" points to the plugin instance</p></li>\n</ul>\n\n\n<p>The function assembles the regular expression and parses the stream query using it to extract the value of the sorting order. The \"_getSortOrder\" function returns 'undefined' in case no \"sortOrder\" predicate was found in the search query.</p>\n\n<p>It makes sense to add the related helper function to define the new sorting order for the Stream. The code of the function may look like:</p>\n\n<pre class='inline-example '><code>plugin.methods._setSortOrder = function(order) {\n    var stream = this.component;\n    var _query = stream.config.get(\"query\");\n    var _order = this._getSortOrder();\n    var query = _order\n        ? _query.replace(new RegExp(\"sortOrder:\" + _order), \"sortOrder:\" + order)\n        : \"sortOrder:\" + order + \" \" + _query;\n    stream.config.set(\"query\", query);\n    stream.refresh();\n};\n</code></pre>\n\n<p>The function looks a bit more complicated, but the main idea is to either replace the value of the \"sortOrder\" predicate or add the predicate with the necessary value to the beginning of the search query in case the \"sortOrder\" predicate was not defined. After the query update, the \"refresh\" function is called for the Stream control to fetch the data based on the new search query and rerender the UI.</p>\n\n<h2 id='how_to_develop_plugin-section-5'>Labels</h2>\n\n<p>One more step before starting to work with the templates in order to add the dropdown: we need to define the labels which we are going to be used in the UI. Keeping the labels as a separate set has some benefits:</p>\n\n<ul>\n<li><p>ability for the publisher to update a certain label without touching the template</p></li>\n<li><p>followup from the previous point: ability to translate the UI to any foreign language without dealing with the code</p></li>\n</ul>\n\n\n<p>The plugin manifest provides a special location for the labels: it's the \"labels\" hash with the label key as the field name and the label text as a value. We need the labels for the sort orders and one more label to add the text before the dropdown, so the \"labels\" hash might look like:</p>\n\n<pre class='inline-example '><code>plugin.labels = {\n    \"sortOrderSelection\": \"Sorting order:\",\n    \"chronologicalSortOrder\": \"Chronological\",\n    \"reverseChronologicalSortOrder\": \"Reverse chronological\",\n    \"likesDescendingSortOrder\": \"Likes count\",\n    \"flagsDescendingSortOrder\": \"Flags count\",\n    \"repliesDescendingSortOrder\": \"Replies count\"\n};\n</code></pre>\n\n<p>The label text will be available in the plugin's code using the following construction:</p>\n\n<pre class='inline-example '><code>this.labels.get(\"sortOrderSelection\"); // assuming that \"this\" points to the plugin instance\n</code></pre>\n\n<h2 id='how_to_develop_plugin-section-6'>Extending control template</h2>\n\n<p>Ok, now it's time to add the dropdown itself into the Stream control UI.</p>\n\n<p>The first steps is to prepare a template which should be appended into the Stream UI. Due to the fact that the template for our plugin is quite complex, we'll wrap the code to generate it into the function, for example as shown below:</p>\n\n<pre class='inline-example '><code>plugin.template = function() {\n    var plugin = this;\n    var current = this._getSortOrder() || \"reverseChronological\";\n    var options = $.map(plugin.config.get(\"orders\"), function(order) {\n        return plugin.substitute({\n            \"template\": '&lt;option value=\"{data:order}\" {data:selected}&gt;{data:label}&lt;/option&gt;',\n            \"data\": {\n                \"order\": order,\n                \"label\": plugin.labels.get(order + \"SortOrder\"),\n                \"selected\": current === order ? \"selected\" : \"\"\n            }\n        });\n    }).join(\"\");\n    return '&lt;div class=\"{plugin.class:wrapper}\"&gt;' +\n        '&lt;span class=\"{plugin.class:label}\"&gt;{plugin.label:sortOrderSelection}&lt;/span&gt;' +\n        '&lt;select class=\"{plugin.class:selector}\"&gt;' + options + '&lt;/select&gt;' +\n    '&lt;/div&gt;';\n};\n</code></pre>\n\n<p>Here is what's going on in the function:</p>\n\n<ul>\n<li><p>we extract the current sort order and defaults to the \"reverseChronological\" one (which is a default sorting order for the \"search\" API endpoint) if it was not defined in the search query</p></li>\n<li><p>we assemble the list of options for the dropdown, based on the \"options\" config parameter value and the current sorting order</p></li>\n<li><p>the function returns the string with HTML representation of the dropdown.</p></li>\n</ul>\n\n\n<p>Important note: as you can see, the final template contains the placeholders such as: \"{plugin.class:wrapper}\" and \"{plugin.label:sortOrderSelection}\". These placeholders will be processed by the templating engine before the template is inserted into the Stream UI. You can find the general description of the rendering engine in the <a href=\"#!/guide/terminology\">\"Terminology and dev tips\" guide</a>. In addition to the basic placeholders supported by the rendering engine, the base plugins functionality also provides the ability to define the following placeholders:</p>\n\n<ul>\n<li>{plugin.class:KEY} - the placeholder will be replaced with the CSS class name + the KEY value</li>\n<li>{plugin.label:KEY} - the placeholder to access the corresponding label text using the KEY as a key</li>\n<li>{plugin.config:KEY} - the placeholder to access the config value using the KEY as a key</li>\n<li>{plugin.self:KEY} - provides the ability to access the plugin field using the KEY as a key</li>\n</ul>\n\n\n<p>In our example, we instructed the rendering engine to append the \"sortOrderSelection\" label text and to insert the necessary CSS classes.</p>\n\n<p>The second step to make the dropdown appear in the UI is to define the rules to append the template.</p>\n\n<p>In order to specify the rules for the plugin template addition, we should call the <a href=\"#!/api/Echo.Plugin-method-extendTemplate\">\"extendTemplate\"</a> function of the plugin instance. Due to the fact that the final control view assembling is happening during its initialization, we need to call the function inside the \"plugin.init\" function as shown below:</p>\n\n<pre class='inline-example '><code>plugin.init = function() {\n    this.extendTemplate(\"insertAsFirstChild\", \"header\", plugin.template);\n};\n</code></pre>\n\n<p>So we passed the \"insertAsFirstChild\" directive as the first argument, the anchor element as the second one and the template (which might be represented as a function) as the third argument.</p>\n\n<p>More information about the <a href=\"#!/api/Echo.Plugin-method-extendTemplate\">\"extendTemplate\"</a> function can be found <a href=\"#!/api/Echo.Plugin-method-extendTemplate\">here</a>.</p>\n\n<h2 id='how_to_develop_plugin-section-7'>Adding renderers</h2>\n\n<p>Now we have our dropdown in place, but we still don't have the logic to trigger the Stream refresh when the new sorting order is selected in the dropdown. It's a perfect task for the Renderers, so let's add one. Plugin manifest specifies the location for the renderers, it's the \"renderers\" hash. The renderer for the dropdowm may look like:</p>\n\n<pre class='inline-example '><code>plugin.renderers.selector = function(element) {\n    var plugin = this, stream = plugin.component;\n    return element.on(\"change\", function() {\n        plugin._setSortOrder($(this).val());\n    });\n};\n</code></pre>\n\n<p>The code of the function is simple: we attach the \"onchange\" event to the dropdown and update the Stream sort order with the right value inside the callback.</p>\n\n<p>Note: the \"renderers\" hash contains the renderers for the elements added within the plugin. If you want to access the renderers of the parent component (for example, to attach some additional logic), the renderers can be places inside the \"renderers.component\" hash, for example:</p>\n\n<pre class='inline-example '><code>plugin.component.renderers.state = function(element) {\n    // ... some code ...\n    this.parentRenderer(\"state\", arguments);\n    return element;\n};\n</code></pre>\n\n<p>In this example we've accessed the \"state\" renderer of the Stream control.</p>\n\n<p>One more important note to keep in mind while overriding the existing renderers: you can control the order in which the renderer logic is executed, i.e. you can call the parent renderer and apply specific logic after that or you can add some manipulations and call the parent renderer. Calling the <a href=\"#!/api/Echo.Plugin-method-parentRenderer\">\"parentRenderer\"</a> function is extremely important when you extend some existing renderer to allow other plugins to execute their renderer extensions as well (in case multiple plugins extend the same renderer).</p>\n\n<h2 id='how_to_develop_plugin-section-8'>CSS rules</h2>\n\n<p>To make the UI look nice, we should add some CSS rules. There is a special placeholder for the CSS rules in the plugin definition. The field is called \"css\". The value of this field is a CSS string. Here are CSS rules for our plugin:</p>\n\n<pre class='inline-example '><code>plugin.css =\n    '.{plugin.class:label} { margin-right: 5px; }' +\n    '.{plugin.class:wrapper} { float: left; }';\n</code></pre>\n\n<p>Note that you can use the same placeholders inside the CSS definition string.</p>\n\n<p>That's all, the plugin is ready!</p>\n\n<p>However there are few more handy things which can be used during the plugin development (see below).</p>\n\n<h2 id='how_to_develop_plugin-section-9'>Plugin state management</h2>\n\n<p>There are cases where the plugin should not be active/inactive according to some condition, for example if any mandatory plugin params are missing in the config or the plugin was written for a given type of items in the stream (for Tweets or FaceBook items). In this case you can control the state of the plugin using the \"enabled\" function in the plugin definition. The function should be synchronous and return 'true' to enable or 'false' to disable the plugin. Example:</p>\n\n<pre class='inline-example '><code>plugin.enabled = function() {\n    return !!this.config.get(\"myMandatoryParameter\");\n};\n</code></pre>\n\n<p>Note: the function is executed within the plugin context, i.e. the \"this\" points to the current plugin instance.</p>\n\n<h2 id='how_to_develop_plugin-section-10'>Events</h2>\n\n<p>Another important aspect is events.</p>\n\n<p>Each Echo component is an independent part of the system and can communicate with each other on subscribe-publish basis. One application can subscribe to the expected event and the other application can publish it and the event data will be delivered to the subscribed applications. This model is very similar to the DOM events model when you can add event listener and perform some actions when a certain event is fired. All the events are powered by the <a href=\"#!/api/Echo.Events\">Echo.Events library</a>.</p>\n\n<p>There are lots of events going on during the control and plugin life. The list of the events for each component can be found on the respective page in the documentation. The plugin definition structure provides the interface to subscribe to the necessary events. The events subscriptions should be defined inside the \"events\" hash using the event name as a key and the event handler as a value, for example:</p>\n\n<pre class='inline-example '><code>plugin.events = {\n    \"<a href=\"#!/api/Echo.StreamServer.Controls.Stream-event-onDataReceive\" rel=\"Echo.StreamServer.Controls.Stream-event-onDataReceive\" class=\"docClass\">Echo.StreamServer.Controls.Stream.onDataReceive</a>\": function(topic, args) {\n        // ... some actions ...\n    }\n};\n</code></pre>\n\n<h2 id='how_to_develop_plugin-section-11'>Dependencies</h2>\n\n<p>If the plugin depends on some other external component/library, it's possible to define the dependencies list for the plugin. In this case the engine will download the dependencies first and launch the plugin after that. The dependency is an object with the \"url\" and one of the \"control\", \"plugin\", \"app\" or \"loaded\" fields. In the \"control\", \"plugin\", \"app\" fields you should specify the component name. If the component you have specified is not loaded yet, resource you have specified in the \"url\" will be downloaded. If you need to specify more complex conditions to load resource, you can use the \"loaded\" field instead. The \"loaded\" field should be defined as a function which returns 'true' or 'false' and indicate whether the resource should be downloaded or not. Example:</p>\n\n<pre class='inline-example '><code>plugin.dependencies = [{\n    \"loaded\": function() { return !!window.twttr; },\n    \"url\": \"http://platform.twitter.com/widgets.js\"\n}];\n</code></pre>\n\n<p>You can define the CSS stylesheets as a dependency as well, in this case the \"loaded\" (\"control\", \"plugin\" or \"app\") parameter might be omitted.</p>\n\n<h2 id='how_to_develop_plugin-section-12'>Plugin installation</h2>\n\n<p>In order to install the plugin into the necessary control, the following steps should be taken:</p>\n\n<ul>\n<li><p>the plugin script should be delivered to the client side (for example, using the &lt;script&gt; tag inclusion)</p></li>\n<li><p>the plugin should be added into the \"plugins\" array, for example as shown below:</p></li>\n</ul>\n\n\n<p>&nbsp;</p>\n\n<pre class='inline-example '><code>new <a href=\"#!/api/Echo.StreamServer.Controls.Stream\" rel=\"Echo.StreamServer.Controls.Stream\" class=\"docClass\">Echo.StreamServer.Controls.Stream</a>({\n    ...\n    \"plugins\": [{\n        \"name\": \"StreamSortingSelector\",\n        \"orders\": [\"repliesDescending\", \"likesDescending\", \"chronological\"]\n    }],\n    ...\n});\n</code></pre>\n\n<p>Note: the plugin name should be specified as the \"name\" parameter value. Other plugin parameters should go in the same hash.</p>\n\n<h2 id='how_to_develop_plugin-section-13'>Complete plugin source code</h2>\n\n<pre class='inline-example '><code>(function(jQuery) {\n\"use strict\";\n\nvar $ = jQuery;\n\nvar plugin = <a href=\"#!/api/Echo.Plugin-static-method-manifest\" rel=\"Echo.Plugin-static-method-manifest\" class=\"docClass\">Echo.Plugin.manifest</a>(\"StreamSortingSelector\", \"<a href=\"#!/api/Echo.StreamServer.Controls.Stream\" rel=\"Echo.StreamServer.Controls.Stream\" class=\"docClass\">Echo.StreamServer.Controls.Stream</a>\");\n\nif (<a href=\"#!/api/Echo.Plugin-static-method-isDefined\" rel=\"Echo.Plugin-static-method-isDefined\" class=\"docClass\">Echo.Plugin.isDefined</a>(plugin)) return;\n\nplugin.config = {\n    \"orders\": [\n        \"reverseChronological\",\n        \"chronological\",\n        \"likesDescending\",\n        \"flagsDescending\",\n        \"repliesDescending\"\n    ]\n};\n\nplugin.init = function() {\n    this.extendTemplate(\"insertAsFirstChild\", \"header\", plugin.template);\n};\n\nplugin.labels = {\n    \"sortOrderSelection\": \"Sorting order:\",\n    \"chronologicalSortOrder\": \"Chronological\",\n    \"reverseChronologicalSortOrder\": \"Reverse chronological\",\n    \"likesDescendingSortOrder\": \"Likes count\",\n    \"flagsDescendingSortOrder\": \"Flags count\",\n    \"repliesDescendingSortOrder\": \"Replies count\"\n};\n\nplugin.template = function() {\n    var plugin = this;\n    var current = this._getSortOrder() || \"reverseChronological\";\n    var options = $.map(plugin.config.get(\"orders\"), function(order) {\n        return plugin.substitute({\n            \"template\": '&lt;option value=\"{data:order}\" {data:selected}&gt;{data:label}&lt;/option&gt;',\n            \"data\": {\n                \"order\": order,\n                \"label\": plugin.labels.get(order + \"SortOrder\"),\n                \"selected\": current === order ? \"selected\" : \"\"\n            }\n        });\n    }).join(\"\");\n    return '&lt;div class=\"{plugin.class:wrapper}\"&gt;' +\n        '&lt;span class=\"{plugin.class:label}\"&gt;{plugin.label:sortOrderSelection}&lt;/span&gt;' +\n        '&lt;select class=\"{plugin.class:selector}\"&gt;' + options + '&lt;/select&gt;' +\n    '&lt;/div&gt;';\n};\n\nplugin.renderers.selector = function(element) {\n    var plugin = this, stream = plugin.component;\n    return element.on(\"change\", function() {\n        plugin._setSortOrder($(this).val());\n    });\n};\n\nplugin.methods._getSortOrder = function() {\n    var stream = this.component;\n    var regex = new RegExp(\"sortOrder:(\" + this.config.get(\"orders\").join(\"|\") + \")\");\n    var result = stream.config.get(\"query\").match(regex);\n    return result &amp;&amp; result[1];\n};\n\nplugin.methods._setSortOrder = function(order) {\n    var stream = this.component;\n    var _query = stream.config.get(\"query\");\n    var _order = this._getSortOrder();\n    var query = _order\n        ? _query.replace(new RegExp(\"sortOrder:\" + _order), \"sortOrder:\" + order)\n        : \"sortOrder:\" + order + \" \" + _query;\n    stream.config.set(\"query\", query);\n    stream.refresh();\n};\n\nplugin.css =\n    '.{plugin.class:label} { margin-right: 5px; }' +\n    '.{plugin.class:wrapper} { float: left; }';\n\n<a href=\"#!/api/Echo.Plugin-static-method-create\" rel=\"Echo.Plugin-static-method-create\" class=\"docClass\">Echo.Plugin.create</a>(plugin);\n\n})(Echo.jQuery);\n</code></pre>\n\n<h2 id='how_to_develop_plugin-section-14'>More examples</h2>\n\n<p>Each bundled Echo plugin uses the same mechanisms described in this guide. Bundled Echo plugins are good examples which you can use as a pattern for your own plugins:</p>\n\n<ul>\n<li><a href=\"http://cdn.echoenabled.com/sdk/v3/streamserver/plugins/community-flag.js\">CommunityFlag</a></li>\n<li><a href=\"http://cdn.echoenabled.com/sdk/v3/streamserver/plugins/edit.js\">Edit</a></li>\n<li><a href=\"http://cdn.echoenabled.com/sdk/v3/streamserver/plugins/like.js\">Like</a></li>\n<li><a href=\"http://cdn.echoenabled.com/sdk/v3/streamserver/plugins/reply.js\">Reply</a></li>\n<li><a href=\"http://cdn.echoenabled.com/sdk/v3/streamserver/plugins/janrain-sharing.js\">JanrainSharing</a></li>\n<li>and more (please look at Echo controls documentation pages)</li>\n</ul>\n\n",
  "title": "How to develop a plugin"
});