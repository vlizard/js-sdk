Ext.data.JsonP.Echo_StreamServer_Controls_FacePile({
  "tagname": "class",
  "name": "Echo.StreamServer.Controls.FacePile",
  "extends": "Echo.Control",
  "mixins": [

  ],
  "alternateClassNames": [

  ],
  "aliases": {
  },
  "singleton": false,
  "requires": [

  ],
  "uses": [

  ],
  "enum": null,
  "override": null,
  "inheritable": null,
  "inheritdoc": null,
  "meta": {
  },
  "private": null,
  "id": "class-Echo.StreamServer.Controls.FacePile",
  "members": {
    "cfg": [
      {
        "name": "apiBaseURL",
        "tagname": "cfg",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "cfg-apiBaseURL"
      },
      {
        "name": "appkey",
        "tagname": "cfg",
        "owner": "Echo.Control",
        "meta": {
          "required": true
        },
        "id": "cfg-appkey"
      },
      {
        "name": "data",
        "tagname": "cfg",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
        },
        "id": "cfg-data"
      },
      {
        "name": "infoMessages",
        "tagname": "cfg",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
        },
        "id": "cfg-infoMessages"
      },
      {
        "name": "initialUsersCount",
        "tagname": "cfg",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
        },
        "id": "cfg-initialUsersCount"
      },
      {
        "name": "item",
        "tagname": "cfg",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
        },
        "id": "cfg-item"
      },
      {
        "name": "labels",
        "tagname": "cfg",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "cfg-labels"
      },
      {
        "name": "submissionProxyURL",
        "tagname": "cfg",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "cfg-submissionProxyURL"
      },
      {
        "name": "suffixText",
        "tagname": "cfg",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
        },
        "id": "cfg-suffixText"
      },
      {
        "name": "target",
        "tagname": "cfg",
        "owner": "Echo.Control",
        "meta": {
          "required": true
        },
        "id": "cfg-target"
      },
      {
        "name": "totalUsersCount",
        "tagname": "cfg",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
        },
        "id": "cfg-totalUsersCount"
      }
    ],
    "property": [
      {
        "name": "and",
        "tagname": "property",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
          "echo_label": true
        },
        "id": "property-and"
      },
      {
        "name": "more",
        "tagname": "property",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
          "echo_label": true
        },
        "id": "property-more"
      }
    ],
    "method": [
      {
        "name": "constructor",
        "tagname": "method",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
        },
        "id": "method-constructor"
      },
      {
        "name": "actors",
        "tagname": "method",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
          "echo_renderer": true
        },
        "id": "method-actors"
      },
      {
        "name": "dependent",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-dependent"
      },
      {
        "name": "destroy",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-destroy"
      },
      {
        "name": "extendTemplate",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-extendTemplate"
      },
      {
        "name": "get",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-get"
      },
      {
        "name": "getPlugin",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-getPlugin"
      },
      {
        "name": "getVisibleUsersCount",
        "tagname": "method",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
        },
        "id": "method-getVisibleUsersCount"
      },
      {
        "name": "log",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-log"
      },
      {
        "name": "more",
        "tagname": "method",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
          "echo_renderer": true
        },
        "id": "method-more"
      },
      {
        "name": "parentRenderer",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-parentRenderer"
      },
      {
        "name": "refresh",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-refresh"
      },
      {
        "name": "remove",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-remove"
      },
      {
        "name": "set",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-set"
      },
      {
        "name": "showError",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-showError"
      },
      {
        "name": "showMessage",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-showMessage"
      },
      {
        "name": "substitute",
        "tagname": "method",
        "owner": "Echo.Control",
        "meta": {
        },
        "id": "method-substitute"
      },
      {
        "name": "suffixText",
        "tagname": "method",
        "owner": "Echo.StreamServer.Controls.FacePile",
        "meta": {
          "echo_renderer": true
        },
        "id": "method-suffixText"
      }
    ],
    "event": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ]
  },
  "statics": {
    "cfg": [

    ],
    "property": [

    ],
    "method": [

    ],
    "event": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ]
  },
  "linenr": 3,
  "files": [
    {
      "filename": "facepile.js",
      "href": "facepile.html#Echo-StreamServer-Controls-FacePile"
    }
  ],
  "html_meta": {
  },
  "component": false,
  "superclasses": [
    "Echo.Control"
  ],
  "subclasses": [

  ],
  "mixedInto": [

  ],
  "parentMixins": [

  ],
  "html": "<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Echo.Control' rel='Echo.Control' class='docClass'>Echo.Control</a><div class='subclass '><strong>Echo.StreamServer.Controls.FacePile</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile' target='_blank'>facepile.js</a></div></pre><div class='doc-contents'><p>Echo FacePile control displays users (actors) returned in any activity stream.\nIt is either a static list formed by a predefined data set or live updated list constructed using the Echo Query Language.</p>\n\n<pre><code>new <a href=\"#!/api/Echo.StreamServer.Controls.FacePile\" rel=\"Echo.StreamServer.Controls.FacePile\" class=\"docClass\">Echo.StreamServer.Controls.FacePile</a>({\n    \"target\": document.getElementById(\"facepile\"),\n    \"appkey\": \"test.aboutecho.com\",\n    \"query\": \"childrenof:http://example.com/* itemsPerPage:2 children:0\",\n    \"suffixText\": \" commented on aboutecho.com\",\n    \"item\": {\"avatar\": true, \"text\": true}\n});\n</code></pre>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Required Config options</h3><div id='cfg-appkey' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-cfg-appkey' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-cfg-appkey' class='name expandable'>appkey</a><span> : String</span><strong class='required signature' >required</strong></div><div class='description'><div class='short'>Specifies the customer application key. ...</div><div class='long'><p>Specifies the customer application key. You can use the \"test.echoenabled.com\" appkey for testing purposes.</p>\n<p>Defaults to: <code>&quot;&quot;</code></p></div></div></div><div id='cfg-target' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-cfg-target' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-cfg-target' class='name not-expandable'>target</a><span> : String</span><strong class='required signature' >required</strong></div><div class='description'><div class='short'><p>Specifies the DOM element where the control will be displayed.</p>\n</div><div class='long'><p>Specifies the DOM element where the control will be displayed.</p>\n</div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Optional Config options</h3><div id='cfg-apiBaseURL' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-cfg-apiBaseURL' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-cfg-apiBaseURL' class='name expandable'>apiBaseURL</a><span> : String</span></div><div class='description'><div class='short'>URL prefix for all API requests ...</div><div class='long'><p>URL prefix for all API requests</p>\n<p>Defaults to: <code>&quot;api.echoenabled.com/v1/&quot;</code></p></div></div></div><div id='cfg-data' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-cfg-data' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-cfg-data' class='name expandable'>data</a><span> : Object</span></div><div class='description'><div class='short'>Specifies static data for the list. ...</div><div class='long'><p>Specifies static data for the list. It has the same format as returned by the search API endpoint. If the data parameter is provided then the query parameter should be omitted. If data and query parameters are both provided query takes precedence over data.</p>\n</div></div></div><div id='cfg-infoMessages' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-cfg-infoMessages' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-cfg-infoMessages' class='name expandable'>infoMessages</a><span> : String</span></div><div class='description'><div class='short'>Customizes the look and feel of info messages, for example \"loading\" and \"error\". ...</div><div class='long'><p>Customizes the look and feel of info messages, for example \"loading\" and \"error\".</p>\n<p>Defaults to: <code>{&quot;layout&quot;: &quot;compact&quot;}</code></p><p>Overrides: <a href='#!/api/Echo.Control-cfg-infoMessages' rel='Echo.Control-cfg-infoMessages' class='docClass'>Echo.Control.infoMessages</a></p></div></div></div><div id='cfg-initialUsersCount' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-cfg-initialUsersCount' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-cfg-initialUsersCount' class='name expandable'>initialUsersCount</a><span> : String</span></div><div class='description'><div class='short'>The number of users which will be shown when the FacePile is displayed for the first time. ...</div><div class='long'><p>The number of users which will be shown when the FacePile is displayed for the first time. Default value is the value of data.itemsPerPage parameter. Note that the parameter is actual only for the list created using data.</p>\n</div></div></div><div id='cfg-item' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-cfg-item' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-cfg-item' class='name expandable'>item</a><span> : Object</span></div><div class='description'><div class='short'>Customizes the FacePile item ...</div><div class='long'><p>Customizes the FacePile item</p>\n<p>Defaults to: <code>{&quot;avatar&quot;: true, &quot;text&quot;: true}</code></p><ul><li><span class='pre'>avatar</span> : Boolean<div class='sub-desc'><p>Specifies if user avatar should be rendered within the FacePile item.</p>\n</div></li><li><span class='pre'>text</span> : Boolean<div class='sub-desc'><p>Specifies if user name should be rendered within the FacePile item.</p>\n</div></li></ul></div></div></div><div id='cfg-labels' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-cfg-labels' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-cfg-labels' class='name expandable'>labels</a><span> : Object</span></div><div class='description'><div class='short'>Specifies the set of language variables defined for this particular control. ...</div><div class='long'><p>Specifies the set of language variables defined for this particular control.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='cfg-submissionProxyURL' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-cfg-submissionProxyURL' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-cfg-submissionProxyURL' class='name expandable'>submissionProxyURL</a><span> : String</span></div><div class='description'><div class='short'>URL prefix for requests to Echo Submission Proxy ...</div><div class='long'><p>URL prefix for requests to Echo Submission Proxy</p>\n<p>Defaults to: <code>&quot;apps.echoenabled.com/v2/esp/activity/&quot;</code></p></div></div></div><div id='cfg-suffixText' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-cfg-suffixText' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-cfg-suffixText' class='name expandable'>suffixText</a><span> : String</span></div><div class='description'><div class='short'>Specifies the text being appended to the end of Face Pile user's list. ...</div><div class='long'><p>Specifies the text being appended to the end of Face Pile user's list.</p>\n<p>Defaults to: <code>&quot;&quot;</code></p></div></div></div><div id='cfg-totalUsersCount' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-cfg-totalUsersCount' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-cfg-totalUsersCount' class='name expandable'>totalUsersCount</a><span> : String</span></div><div class='description'><div class='short'>The total number of users for the FacePile. ...</div><div class='long'><p>The total number of users for the FacePile. If it's not defined it defaults to the length of the provided data.entries field. Note that the parameter is actual only for the list created using data.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-and' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-property-and' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-property-and' class='name expandable'>and</a><span> : String</span><strong class='echo_label signature' >localization label</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;and&quot;</code></p></div></div></div><div id='property-more' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-property-more' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-property-more' class='name expandable'>more</a><span> : String</span><strong class='echo_label signature' >localization label</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;more&quot;</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Echo.StreamServer.Controls.FacePile-method-constructor' class='name expandable'>Echo.StreamServer.Controls.FacePile</a>( <span class='pre'>Object config</span> ) : Object</div><div class='description'><div class='short'>FacePile constructor initializing Echo.StreamServer.Controls.FacePile class ...</div><div class='long'><p>FacePile constructor initializing <a href=\"#!/api/Echo.StreamServer.Controls.FacePile\" rel=\"Echo.StreamServer.Controls.FacePile\" class=\"docClass\">Echo.StreamServer.Controls.FacePile</a> class</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Configuration options</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-actors' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-method-actors' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-method-actors' class='name expandable'>actors</a>( <span class='pre'>Object element</span> )<strong class='echo_renderer signature' >renderer</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-dependent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-dependent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-dependent' class='name expandable'>dependent</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Checks if control was initialized from another control. ...</div><div class='long'><p>Checks if control was initialized from another control.\nreturn {Boolean}</p>\n</div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-destroy' class='name expandable'>destroy</a>( <span class='pre'>Object config</span> )</div><div class='description'><div class='short'>Unified method to destroy control. ...</div><div class='long'><p>Unified method to destroy control.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-extendTemplate' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-extendTemplate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-extendTemplate' class='name expandable'>extendTemplate</a>( <span class='pre'>String action, String anchor, [String html]</span> )</div><div class='description'><div class='short'>Method to extend the template of particular control. ...</div><div class='long'><p>Method to extend the template of particular control.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>action</span> : String<div class='sub-desc'><p>(required) One of the following actions:</p>\n\n<ul>\n<li>\"insertBefore\"</li>\n<li>\"insertAfter\"</li>\n<li>\"insertAsFirstChild\"</li>\n<li>\"insertAsLastChild\"</li>\n<li>\"replace\"</li>\n<li>\"remove\"</li>\n</ul>\n\n</div></li><li><span class='pre'>anchor</span> : String<div class='sub-desc'><p>(required) Element name which is a subject of a transformation application.</p>\n</div></li><li><span class='pre'>html</span> : String (optional)<div class='sub-desc'><p>The content of a transformation to be applied. This param is required for all actions except \"remove\".</p>\n</div></li></ul></div></div></div><div id='method-get' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-get' class='name expandable'>get</a>( <span class='pre'>String key, [Object defaults]</span> ) : Mixed</div><div class='description'><div class='short'>Accessor method to get specific field. ...</div><div class='long'><p>Accessor method to get specific field.</p>\n\n<p>This function returns the corresponding value of the given key or the default value if specified in the second argument.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : String<div class='sub-desc'><p>Defines the key for data extraction.</p>\n\n</div></li><li><span class='pre'>defaults</span> : Object (optional)<div class='sub-desc'><p>Default value if no corresponding key was found in the config. Note: only the 'undefined' JS statement triggers the default value usage. The false, null, 0, [] are considered as a proper value.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'><p>Returns the corresponding value found in the object.</p>\n\n</div></li></ul></div></div></div><div id='method-getPlugin' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-getPlugin' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-getPlugin' class='name expandable'>getPlugin</a>( <span class='pre'>String name</span> ) : Object</div><div class='description'><div class='short'>Accessor function allowing to obtain the plugin by its name. ...</div><div class='long'><p>Accessor function allowing to obtain the plugin by its name.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>(required) Specifies plugin name.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>Instance of the corresponding plugin.</p>\n</div></li></ul></div></div></div><div id='method-getVisibleUsersCount' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-method-getVisibleUsersCount' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-method-getVisibleUsersCount' class='name expandable'>getVisibleUsersCount</a>( <span class='pre'></span> ) : Number</div><div class='description'><div class='short'>Method to get the visible users count ...</div><div class='long'><p>Method to get the visible users count</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>visible users count</p>\n</div></li></ul></div></div></div><div id='method-log' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-log' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-log' class='name expandable'>log</a>( <span class='pre'>Object data</span> )</div><div class='description'><div class='short'>Function to log info/error message to the browser console in a unified format ...</div><div class='long'><p>Function to log info/error message to the browser console in a unified format</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'><p>Defines the properties of the message which should be displayed</p>\n\n<ul><li><span class='pre'>message</span> : String<div class='sub-desc'><p>Text description of the message which should be logged</p>\n\n</div></li><li><span class='pre'>component</span> : String (optional)<div class='sub-desc'><p>Name of the component which produced the message</p>\n\n<p>Defaults to: <code>&quot;Echo SDK&quot;</code></p></div></li><li><span class='pre'>type</span> : String (optional)<div class='sub-desc'><p>Type/severity of the message</p>\n\n<p>Defaults to: <code>&quot;info&quot;</code></p></div></li><li><span class='pre'>args</span> : String (optional)<div class='sub-desc'><p>Extra arguments to log</p>\n\n</div></li></ul></div></li></ul></div></div></div><div id='method-more' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-method-more' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-method-more' class='name expandable'>more</a>( <span class='pre'>Object element</span> )<strong class='echo_renderer signature' >renderer</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-parentRenderer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-parentRenderer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-parentRenderer' class='name expandable'>parentRenderer</a>( <span class='pre'>String name, Object args</span> ) : HTMLElement</div><div class='description'><div class='short'>Method to call parent renderer function, which was extended using Echo.Control.extendRenderer function. ...</div><div class='long'><p>Method to call parent renderer function, which was extended using Echo.Control.extendRenderer function.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>(required) Renderer name.</p>\n\n</div></li><li><span class='pre'>args</span> : Object<div class='sub-desc'><p>(required) Arguments to be proxied to the parent renderer from the overriden one.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>HTMLElement</span><div class='sub-desc'><p>Result of parent renderer function call.</p>\n\n</div></li></ul></div></div></div><div id='method-refresh' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-refresh' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-refresh' class='name expandable'>refresh</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Basic method to reinitialize control. ...</div><div class='long'><p>Basic method to reinitialize control.</p>\n\n<p>Function can be overriden by class descendants implying specific logic.</p>\n</div></div></div><div id='method-remove' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-remove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-remove' class='name expandable'>remove</a>( <span class='pre'>String key</span> )</div><div class='description'><div class='short'>Method to remove specific object field. ...</div><div class='long'><p>Method to remove specific object field.</p>\n\n<p>This function allows to remove the value associated with the given key.\nIf the key contains a complex structure (such as objects or arrays), it will be removed as well.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : String<div class='sub-desc'><p>Defines the key which should be removed from the object.</p>\n\n</div></li></ul></div></div></div><div id='method-set' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-set' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-set' class='name expandable'>set</a>( <span class='pre'>String key, Mixed value</span> )</div><div class='description'><div class='short'>Setter method to define specific object value. ...</div><div class='long'><p>Setter method to define specific object value.</p>\n\n<p>This function allows to define the value for the corresponding object field.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : String<div class='sub-desc'><p>Defines the key where the given data should be stored.</p>\n\n</div></li><li><span class='pre'>value</span> : Mixed<div class='sub-desc'><p>The corresponding value which should be defined for the key.</p>\n\n</div></li></ul></div></div></div><div id='method-showError' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-showError' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-showError' class='name expandable'>showError</a>( <span class='pre'>Object data, Object options</span> )</div><div class='description'><div class='short'>Renders error message in the target container. ...</div><div class='long'><p>Renders error message in the target container.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'><p>(required) Object containing error message information.</p>\n</div></li><li><span class='pre'>options</span> : Object<div class='sub-desc'><p>(required) Object containing display options.</p>\n</div></li></ul></div></div></div><div id='method-showMessage' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-showMessage' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-showMessage' class='name expandable'>showMessage</a>( <span class='pre'>Object data</span> )</div><div class='description'><div class='short'>Renders info message in the target container. ...</div><div class='long'><p>Renders info message in the target container.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'><p>(required) Object containing info message information.</p>\n<ul><li><span class='pre'>layout</span> : String (optional)<div class='sub-desc'><p>Specifies the type of message layout. Can be set to \"compact\" or \"full\".</p>\n</div></li><li><span class='pre'>target</span> : HTMLElement (optional)<div class='sub-desc'><p>Specifies the target container.</p>\n</div></li></ul></div></li></ul></div></div></div><div id='method-substitute' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.Control' rel='Echo.Control' class='defined-in docClass'>Echo.Control</a><br/><a href='source/control.html#Echo-Control-method-substitute' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.Control-method-substitute' class='name expandable'>substitute</a>( <span class='pre'>Object args</span> ) : String</div><div class='description'><div class='short'>Templater function which compiles given template using the provided data. ...</div><div class='long'><p>Templater function which compiles given template using the provided data.</p>\n\n<p>Function can be used widely for html templates processing or any other action requiring string interspersion.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>args</span> : Object<div class='sub-desc'><p>(required) Specifies substitution process, contains control parameters.</p>\n<ul><li><span class='pre'>template</span> : String<div class='sub-desc'><p>(required) Template containing placeholders used for data interspersion.</p>\n</div></li><li><span class='pre'>data</span> : Object (optional)<div class='sub-desc'><p>Data used in the template compilation.</p>\n</div></li><li><span class='pre'>strict</span> : Boolean (optional)<div class='sub-desc'><p>Specifies whether the template should be replaced with the corresponding value, preserving replacement value type.</p>\n</div></li><li><span class='pre'>instructions</span> : Object (optional)<div class='sub-desc'><p>Object containing the list of extra instructions to be applied during template compilation.</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Compiled string value.</p>\n</div></li></ul></div></div></div><div id='method-suffixText' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.StreamServer.Controls.FacePile'>Echo.StreamServer.Controls.FacePile</span><br/><a href='source/facepile.html#Echo-StreamServer-Controls-FacePile-method-suffixText' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.StreamServer.Controls.FacePile-method-suffixText' class='name expandable'>suffixText</a>( <span class='pre'>Object element</span> )<strong class='echo_renderer signature' >renderer</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"
});