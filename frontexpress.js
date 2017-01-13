var frontexpress = (function () {
'use strict';

/**
 * HTTP method list
 * @private
 */

var HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
// not supported yet
// HEAD', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Module dependencies.
 * @private
 */

var Requester = function () {
    function Requester() {
        classCallCheck(this, Requester);
    }

    createClass(Requester, [{
        key: 'fetch',


        /**
         * Make an ajax request.
         *
         * @param {Object} request
         * @param {Function} success callback
         * @param {Function} failure callback
         * @private
         */

        value: function fetch(request, resolve, reject) {
            var method = request.method,
                uri = request.uri,
                headers = request.headers,
                data = request.data;


            var success = function success(responseText) {
                resolve(request, {
                    status: 200,
                    statusText: 'OK',
                    responseText: responseText
                });
            };

            var fail = function fail(_ref) {
                var status = _ref.status,
                    statusText = _ref.statusText,
                    errorThrown = _ref.errorThrown;

                // Removed for reducing size of frontexpress
                // const errors = this._analyzeErrors({status, statusText, errorThrown});
                reject(request, {
                    status: status,
                    statusText: statusText,
                    errorThrown: errorThrown,
                    errors: 'HTTP ' + status + ' ' + (statusText ? statusText : '')
                });
            };

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 200) {
                        success(xmlhttp.responseText);
                    } else {
                        fail({ status: xmlhttp.status, statusText: xmlhttp.statusText });
                    }
                }
            };
            try {
                xmlhttp.open(method, uri, true);
                if (headers) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = Object.keys(headers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var header = _step.value;

                            xmlhttp.setRequestHeader(header, headers[header]);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                if (data) {
                    xmlhttp.send(data);
                } else {
                    xmlhttp.send();
                }
            } catch (errorThrown) {
                fail({ errorThrown: errorThrown });
            }
        }

        // Removed for reducing size of frontexpress
        // /**
        //  * Analyse response errors.
        //  *
        //  * @private
        //  */

        // _analyzeErrors(response) {
        //     // manage exceptions
        //     if (response.errorThrown) {
        //         if (response.errorThrown.name === 'SyntaxError') {
        //             return 'Problem during data decoding [JSON]';
        //         }
        //         if (response.errorThrown.name === 'TimeoutError') {
        //             return 'Server is taking too long to reply';
        //         }
        //         if (response.errorThrown.name === 'AbortError') {
        //             return 'Request cancelled on server';
        //         }
        //         if (response.errorThrown.name === 'NetworkError') {
        //             return 'A network error occurred';
        //         }
        //         throw response.errorThrown;
        //     }

        //     // manage status
        //     if (response.status === 0) {
        //         return 'Server access problem. Check your network connection';
        //     }
        //     if (response.status === 401) {
        //         return 'Your session has expired, Please reconnect. [code: 401]';
        //     }
        //     if (response.status === 404) {
        //         return 'Page not found on server. [code: 404]';
        //     }
        //     if (response.status === 500) {
        //         return 'Internal server error. [code: 500]';
        //     }
        //     return `Unknown error. ${response.statusText?response.statusText:''}`;
        // }

    }]);
    return Requester;
}();

/**
 * Module dependencies.
 * @private
 */

/**
 * Settings object.
 * @private
 */

var Settings = function () {

    /**
     * Initialize the settings.
     *
     *   - setup default configuration
     *
     * @private
     */

    function Settings() {
        classCallCheck(this, Settings);

        // default settings
        this.settings = {
            'http requester': new Requester(),

            'http GET transformer': {
                uri: function uri(_ref) {
                    var _uri = _ref.uri,
                        headers = _ref.headers,
                        data = _ref.data;

                    if (!data) {
                        return _uri;
                    }
                    var uriWithoutAnchor = _uri,
                        anchor = '';

                    var match = /^(.*)(#.*)$/.exec(_uri);
                    if (match) {
                        var _$exec = /^(.*)(#.*)$/.exec(_uri);

                        var _$exec2 = slicedToArray(_$exec, 3);

                        uriWithoutAnchor = _$exec2[1];
                        anchor = _$exec2[2];
                    }
                    uriWithoutAnchor = Object.keys(data).reduce(function (gUri, d, index) {
                        gUri += '' + (index === 0 && gUri.indexOf('?') === -1 ? '?' : '&') + d + '=' + data[d];
                        return gUri;
                    }, uriWithoutAnchor);
                    return uriWithoutAnchor + anchor;
                }
            }
        };

        this.rules = {
            'http requester': function httpRequester(requester) {
                if (typeof requester.fetch !== 'function') {
                    throw new TypeError('setting http requester has no fetch method');
                }
            }
        };
    }

    /**
     * Assign `setting` to `val`
     *
     * @param {String} setting
     * @param {*} [val]
     * @private
     */

    createClass(Settings, [{
        key: 'set',
        value: function set$$1(name, value) {
            var checkRules = this.rules[name];
            if (checkRules) {
                checkRules(value);
            }
            this.settings[name] = value;
        }

        /**
         * Return `setting`'s value.
         *
         * @param {String} setting
         * @private
         */

    }, {
        key: 'get',
        value: function get$$1(name) {
            return this.settings[name];
        }
    }]);
    return Settings;
}();

/**
 * Middleware object.
 * @public
 */

var Middleware = function () {

  /**
   * Middleware initialization
   *
   * @param {String} middleware name
   */

  function Middleware() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    classCallCheck(this, Middleware);

    this.name = name;
  }

  /**
   * Invoked by the app before an ajax request is sent or
   * during the DOM loading (document.readyState === 'loading').
   * See Application#_callMiddlewareEntered documentation for details.
   *
   * Override this method to add your custom behaviour
   *
   * @param {Object} request
   * @public
   */

  // entered(request) { }


  /**
   * Invoked by the app before a new ajax request is sent or before the DOM is unloaded.
   * See Application#_callMiddlewareExited documentation for details.
   *
   * Override this method to add your custom behaviour
   *
   * @param {Object} request
   * @public
   */

  // exited(request) { }


  /**
   * Invoked by the app after an ajax request has responded or on DOM ready
   * (document.readyState === 'interactive').
   * See Application#_callMiddlewareUpdated documentation for details.
   *
   * Override this method to add your custom behaviour
   *
   * @param {Object} request
   * @param {Object} response
   * @public
   */

  // updated(request, response) { }


  /**
   * Invoked by the app when an ajax request has failed.
   *
   * Override this method to add your custom behaviour
   *
   * @param {Object} request
   * @param {Object} response
   * @public
   */
  // failed(request, response) { }


  /**
   * Allow the hand over to the next middleware object or function.
   *
   * Override this method and return `false` to break execution of
   * middleware chain.
   *
   * @return {Boolean} `true` by default
   *
   * @public
   */

  createClass(Middleware, [{
    key: 'next',
    value: function next() {
      return true;
    }
  }]);
  return Middleware;
}();

/**
 * Module dependencies.
 * @private
 */

/**
 * Route object.
 * @private
 */

var Route = function () {

    /**
     * Initialize the route.
     *
     * @private
     */

    function Route(router, uriPart, method, middleware) {
        classCallCheck(this, Route);

        this.router = router;
        this.uriPart = uriPart;
        this.method = method;
        this.middleware = middleware;
        this.visited = false;
    }

    /**
     * Return route's uri.
     *
     * @private
     */

    createClass(Route, [{
        key: 'uri',
        get: function get$$1() {
            if (!this.uriPart && !this.method) {
                return undefined;
            }

            if (this.uriPart instanceof RegExp) {
                return this.uriPart;
            }

            if (this.router.baseUri instanceof RegExp) {
                return this.router.baseUri;
            }

            if (this.router.baseUri && this.uriPart) {
                return (this.router.baseUri.trim() + this.uriPart.trim()).replace(/\/{2,}/, '/');
            }

            if (this.router.baseUri) {
                return this.router.baseUri.trim();
            }

            return this.uriPart;
        }
    }]);
    return Route;
}();

/**
 * Router object.
 * @public
 */

var Router = function () {

    /**
     * Initialize the router.
     *
     * @private
     */

    function Router(uri) {
        classCallCheck(this, Router);

        if (uri) {
            this._baseUri = uri;
        }
        this._routes = [];
    }

    /**
     * Do some checks and set _baseUri.
     *
     * @private
     */

    createClass(Router, [{
        key: '_add',


        /**
         * Add a route to the router.
         *
         * @private
         */

        value: function _add(route) {
            this._routes.push(route);
            return this;
        }

        /**
         * Gather routes from routers filtered by _uri_ and HTTP _method_.
         *
         * @private
         */

    }, {
        key: 'routes',
        value: function routes(uri, method) {
            return this._routes.filter(function (route) {
                if (!route.uri && !route.method) {
                    return true;
                }
                if (route.method !== method) {
                    return false;
                }

                if (!route.uri) {
                    return true;
                }

                var uriToCheck = uri;

                //remove query string from uri to test
                var questionMarkIndex = uriToCheck.indexOf('?');
                if (questionMarkIndex >= 0) {
                    uriToCheck = uriToCheck.slice(0, questionMarkIndex);
                }

                //remove anchor from uri to test
                var hashIndex = uriToCheck.indexOf('#');
                if (hashIndex >= 0) {
                    uriToCheck = uriToCheck.slice(0, hashIndex);
                }

                if (route.uri instanceof RegExp) {
                    return uriToCheck.match(route.uri);
                }

                return route.uri === uriToCheck;
            });
        }

        /**
         * Gather visited routes from routers.
         *
         * @private
         */

    }, {
        key: 'visited',
        value: function visited() {
            return this._routes.filter(function (route) {
                return route.visited;
            });
        }

        /**
         * Use the given middleware function or object on this router.
         *
         *    // middleware function
         *    router.use((req, res, next) => {console.log('Hello')});
         *
         *    // middleware object
         *    router.use(new Middleware());
         *
         * @param {Middleware|Function} middleware object or function
         * @return {Router} for chaining
         *
         * @public
         */

    }, {
        key: 'use',
        value: function use(middleware) {
            if (!(middleware instanceof Middleware) && typeof middleware !== 'function') {
                throw new TypeError('use method takes at least a middleware');
            }

            this._add(new Route(this, undefined, undefined, middleware));

            return this;
        }

        /**
         * Use the given middleware function or object on this router for
         * all HTTP methods.
         *
         *    // middleware function
         *    router.all((req, res, next) => {console.log('Hello')});
         *
         *    // middleware object
         *    router.all(new Middleware());
         *
         * @param {Middleware|Function} middleware object or function
         * @return {Router} for chaining
         *
         * @public
         */

    }, {
        key: 'all',
        value: function all() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (args.length === 0) {
                throw new TypeError('use all method takes at least a middleware');
            }
            var middleware = void 0;

            if (args.length === 1) {
                middleware = args[0];
            } else {
                middleware = args[1];
            }

            if (!(middleware instanceof Middleware) && typeof middleware !== 'function') {
                throw new TypeError('use all method takes at least a middleware');
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = HTTP_METHODS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var method = _step.value;

                    this[method.toLowerCase()].apply(this, args);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return this;
        }
    }, {
        key: 'baseUri',
        set: function set$$1(uri) {
            if (!uri) {
                return;
            }

            if (!this._baseUri) {
                this._baseUri = uri;
                return;
            }

            if (this._baseUri instanceof RegExp) {
                throw new TypeError('the router already contains a regexp uri ' + this._baseUri.toString() + ' It cannot be mixed with ' + uri.toString());
            }

            if (uri instanceof RegExp) {
                throw new TypeError('the router already contains an uri ' + this._baseUri.toString() + ' It cannot be mixed with regexp ' + uri.toString());
            }
        }

        /**
         * Return router's _baseUri.
         *
         * @private
         */

        ,
        get: function get$$1() {
            return this._baseUri;
        }
    }]);
    return Router;
}();

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    var _loop = function _loop() {
        var method = _step2.value;


        /**
         * Use the given middleware function or object, with optional _uri_ on
         * HTTP methods: get, post, put, delete...
         * Default _uri_ is "/".
         *
         *    // middleware function will be applied on path "/"
         *    router.get((req, res, next) => {console.log('Hello')});
         *
         *    // middleware object will be applied on path "/" and
         *    router.get(new Middleware());
         *
         *    // middleware function will be applied on path "/user"
         *    router.post('/user', (req, res, next) => {console.log('Hello')});
         *
         *    // middleware object will be applied on path "/user" and
         *    router.post('/user', new Middleware());
         *
         * @param {String} uri
         * @param {Middleware|Function} middleware object or function
         * @return {Router} for chaining
         * @public
         */

        var methodName = method.toLowerCase();
        Router.prototype[methodName] = function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            if (args.length === 0) {
                throw new TypeError('use ' + methodName + ' method takes at least a middleware');
            }
            var uri = void 0,
                middleware = void 0;

            if (args.length === 1) {
                middleware = args[0];
            } else {
                uri = args[0];
                middleware = args[1];
            }

            if (!(middleware instanceof Middleware) && typeof middleware !== 'function') {
                throw new TypeError('use ' + methodName + ' method takes at least a middleware');
            }

            if (uri && this._baseUri && this._baseUri instanceof RegExp) {
                throw new TypeError('router contains a regexp cannot mix with route uri/regexp');
            }

            this._add(new Route(this, uri, method, middleware));

            return this;
        };
    };

    for (var _iterator2 = HTTP_METHODS[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
    }
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

/**
 * Module dependencies.
 * @private
 */

/**
 * Application class.
 */

var Application = function () {

    /**
     * Initialize the application.
     *
     *   - setup default configuration
     *
     * @private
     */

    function Application() {
        classCallCheck(this, Application);

        this.routers = [];
        this.isDOMLoaded = false;
        this.isDOMReady = false;
        this.settings = new Settings();
    }

    /**
     * Assign `setting` to `val`, or return `setting`'s value.
     *
     *    app.set('foo', 'bar');
     *    app.set('foo');
     *    // => "bar"
     *
     * @param {String} setting
     * @param {*} [val]
     * @return {app} for chaining
     * @public
     */

    createClass(Application, [{
        key: 'set',
        value: function set$$1() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            // get behaviour
            if (args.length === 1) {
                return this.settings.get([args]);
            }

            // set behaviour
            var name = args[0],
                value = args[1];

            this.settings.set(name, value);

            return this;
        }

        /**
         * Listen for DOM initialization and history state changes.
         *
         * The callback function is called once the DOM has
         * the `document.readyState` equals to 'interactive'.
         *
         *    app.listen(()=> {
         *        console.log('App is listening requests');
         *        console.log('DOM is ready!');
         *    });
         *
         *
         * @param {Function} callback
         * @public
         */

    }, {
        key: 'listen',
        value: function listen(callback) {
            var _this = this;

            window.onbeforeunload = function () {
                _this._callMiddlewareMethod('exited');
            };

            window.onpopstate = function (event) {
                if (event.state) {
                    var _event$state = event.state,
                        request = _event$state.request,
                        response = _event$state.response;

                    var currentRoutes = _this._routes(request.uri, request.method);

                    _this._callMiddlewareMethod('entered', currentRoutes, request);
                    _this._callMiddlewareMethod('updated', currentRoutes, request, response);
                }
            };

            document.onreadystatechange = function () {
                var request = { method: 'GET', uri: window.location.pathname + window.location.search };
                var response = { status: 200, statusText: 'OK' };
                var currentRoutes = _this._routes();
                // DOM state
                if (document.readyState === 'loading' && !_this.isDOMLoaded) {
                    _this.isDOMLoaded = true;
                    _this._callMiddlewareMethod('entered', currentRoutes, request);
                } else if (document.readyState === 'interactive' && !_this.isDOMReady) {
                    if (!_this.isDOMLoaded) {
                        _this.isDOMLoaded = true;
                        _this._callMiddlewareMethod('entered', currentRoutes, request);
                    }
                    _this.isDOMReady = true;
                    _this._callMiddlewareMethod('updated', currentRoutes, request, response);
                    if (callback) {
                        callback(request, response);
                    }
                }
            };
        }

        /**
         * Returns a new `Router` instance for the _uri_.
         * See the Router api docs for details.
         *
         *    app.route('/');
         *    // =>  new Router instance
         *
         * @param {String} uri
         * @return {Router} for chaining
         *
         * @public
         */

    }, {
        key: 'route',
        value: function route(uri) {
            var router = new Router(uri);
            this.routers.push(router);
            return router;
        }

        /**
         * Use the given middleware function or object, with optional _uri_.
         * Default _uri_ is "/".
         *
         *    // middleware function will be applied on path "/"
         *    app.use((req, res, next) => {console.log('Hello')});
         *
         *    // middleware object will be applied on path "/"
         *    app.use(new Middleware());
         *
         * @param {String} uri
         * @param {Middleware|Function} middleware object or function
         * @return {app} for chaining
         *
         * @public
         */

    }, {
        key: 'use',
        value: function use() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var errorMsg = 'use method takes at least a middleware or a router';
            var baseUri = void 0,
                middleware = void 0,
                router = void 0,
                which = void 0;
            if (!args || args.length === 0) {
                throw new TypeError(errorMsg);
            } else if (args.length === 1) {
                which = args[0];
            } else {
                baseUri = args[0];
                which = args[1];
            }

            if (which instanceof Router) {
                router = which;
                router.baseUri = baseUri;
            } else if (which instanceof Middleware || typeof which === 'function') {
                middleware = which;
                router = new Router(baseUri);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = HTTP_METHODS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var method = _step.value;

                        router[method.toLowerCase()](middleware);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            } else {
                throw new TypeError(errorMsg);
            }
            this.routers.push(router);

            return this;
        }

        /**
         * Gather routes from all routers filtered by _uri_ and HTTP _method_.
         * See Router#routes() documentation for details.
         *
         * @private
         */

    }, {
        key: '_routes',
        value: function _routes() {
            var uri = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.pathname + window.location.search;
            var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';

            var currentRoutes = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.routers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var router = _step2.value;

                    currentRoutes.push.apply(currentRoutes, toConsumableArray(router.routes(uri, method)));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return currentRoutes;
        }

        /**
         * Call `Middleware` method or middleware function on _currentRoutes_.
         *
         * @private
         */

    }, {
        key: '_callMiddlewareMethod',
        value: function _callMiddlewareMethod(meth, currentRoutes, request, response) {
            if (meth === 'exited') {
                // currentRoutes, request, response params not needed
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.routers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var router = _step3.value;
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = router.visited()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var route = _step4.value;

                                if (route.middleware.exited) {
                                    route.middleware.exited(route.visited);
                                    route.visited = null;
                                }
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return;
            }

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = currentRoutes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _route = _step5.value;

                    if (meth === 'updated') {
                        _route.visited = request;
                    }

                    if (_route.middleware[meth]) {
                        _route.middleware[meth](request, response);
                        if (_route.middleware.next && !_route.middleware.next()) {
                            break;
                        }
                    } else if (meth !== 'entered') {
                        // calls middleware method
                        var breakMiddlewareLoop = true;
                        var next = function next() {
                            breakMiddlewareLoop = false;
                        };
                        _route.middleware(request, response, next);
                        if (breakMiddlewareLoop) {
                            break;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }

        /**
         * Make an ajax request. Manage History#pushState if history object set.
         *
         * @private
         */

    }, {
        key: '_fetch',
        value: function _fetch(request, resolve, reject) {
            var _this2 = this;

            var method = request.method,
                uri = request.uri,
                headers = request.headers,
                data = request.data,
                history = request.history;


            var httpMethodTransformer = this.get('http ' + method + ' transformer');
            if (httpMethodTransformer) {
                uri = httpMethodTransformer.uri ? httpMethodTransformer.uri({ uri: uri, headers: headers, data: data }) : uri;
                headers = httpMethodTransformer.headers ? httpMethodTransformer.headers({ uri: uri, headers: headers, data: data }) : headers;
                data = httpMethodTransformer.data ? httpMethodTransformer.data({ uri: uri, headers: headers, data: data }) : data;
            }

            // calls middleware exited method
            this._callMiddlewareMethod('exited');

            // gathers all routes impacted by the uri
            var currentRoutes = this._routes(uri, method);

            // calls middleware entered method
            this._callMiddlewareMethod('entered', currentRoutes, request);

            // invokes http request
            this.settings.get('http requester').fetch(request, function (req, res) {
                if (history) {
                    window.history.pushState({ request: req, response: res }, history.title, history.uri);
                }
                _this2._callMiddlewareMethod('updated', currentRoutes, req, res);
                if (resolve) {
                    resolve(req, res);
                }
            }, function (req, res) {
                _this2._callMiddlewareMethod('failed', currentRoutes, req, res);
                if (reject) {
                    reject(req, res);
                }
            });
        }
    }]);
    return Application;
}();

HTTP_METHODS.reduce(function (reqProto, method) {

    /**
     * Use the given middleware function or object, with optional _uri_ on
     * HTTP methods: get, post, put, delete...
     * Default _uri_ is "/".
     *
     *    // middleware function will be applied on path "/"
     *    app.get((req, res, next) => {console.log('Hello')});
     *
     *    // middleware object will be applied on path "/" and
     *    app.get(new Middleware());
     *
     *    // get a setting value
     *    app.set('foo', 'bar');
     *    app.get('foo');
     *    // => "bar"
     *
     * @param {String} uri or setting
     * @param {Middleware|Function} middleware object or function
     * @return {app} for chaining
     * @public
     */

    var middlewareMethodName = method.toLowerCase();
    reqProto[middlewareMethodName] = function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        var baseUri = void 0,
            middleware = void 0,
            which = void 0;
        if (!args || args.length === 0) {
            throw new TypeError(middlewareMethodName + ' method takes at least a middleware ' + (middlewareMethodName === 'get' ? 'or a string' : ''));
        } else if (args.length === 1) {
            which = args[0];

            if (middlewareMethodName === 'get' && typeof which === 'string') {
                return this.settings.get(which);
            }
        } else {
            baseUri = args[0];
            which = args[1];
        }

        if (!(which instanceof Middleware) && typeof which !== 'function') {
            throw new TypeError(middlewareMethodName + ' method takes at least a middleware');
        }

        middleware = which;
        var router = new Router();
        router[middlewareMethodName](baseUri, middleware);

        this.routers.push(router);

        return this;
    };

    /**
     * Ajax request (get, post, put, delete...).
     *
     *   // HTTP GET method
     *   httpGet('/route1');
     *
     *   // HTTP GET method
     *   httpGet({uri: '/route1', data: {'p1': 'val1'});
     *   // uri invoked => /route1?p1=val1
     *
     *   // HTTP GET method with browser history management
     *   httpGet({uri: '/api/users', history: {state: {foo: "bar"}, title: 'users page', uri: '/view/users'});
     *
     *   Samples above can be applied on other HTTP methods.
     *
     * @param {String|Object} uri or object containing uri, http headers, data, history
     * @param {Function} success callback
     * @param {Function} failure callback
     * @public
     */
    var httpMethodName = 'http' + method.charAt(0).toUpperCase() + method.slice(1).toLowerCase();
    reqProto[httpMethodName] = function (request, resolve, reject) {
        var uri = request.uri,
            headers = request.headers,
            data = request.data,
            history = request.history;

        if (!uri) {
            uri = request;
        }
        return this._fetch({
            uri: uri,
            method: method,
            headers: headers,
            data: data,
            history: history
        }, resolve, reject);
    };

    return reqProto;
}, Application.prototype);

/**
 * Module dependencies.
 */

/**
 * Create a frontexpress application.
 *
 * @return {Function}
 * @api public
 */

var frontexpress = function frontexpress() {
  return new Application();
};

/**
 * Expose Router, Middleware constructors.
 */
frontexpress.Router = function (baseUri) {
  return new Router(baseUri);
};
frontexpress.Middleware = Middleware;

return frontexpress;

}());
