(function() {
var __webpack_modules__ = {
"./node_modules/.pnpm/@rspack+core@0.5.8/node_modules/@rspack/core/hot/dev-server.js": (function (module, __unused_webpack_exports, __webpack_require__) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/ /* globals __webpack_hash__ */ if (true) {
    /** @type {undefined|string} */ var lastHash;
    var upToDate = function upToDate() {
        return /** @type {string} */ lastHash.indexOf(__webpack_require__.h()) >= 0;
    };
    var log = __webpack_require__(/*! ./log */"./node_modules/.pnpm/@rspack+core@0.5.8/node_modules/@rspack/core/hot/log.js");
    var check = function check() {
        module.hot.check(true).then(function(updatedModules) {
            if (!updatedModules) {
                log("warning", "[HMR] Cannot find update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
                log("warning", "[HMR] (Probably because of restarting the webpack-dev-server)");
                if (typeof window !== "undefined") window.location.reload();
                return;
            }
            if (!upToDate()) check();
            __webpack_require__(/*! ./log-apply-result */"./node_modules/.pnpm/@rspack+core@0.5.8/node_modules/@rspack/core/hot/log-apply-result.js")(updatedModules, updatedModules);
            if (upToDate()) log("info", "[HMR] App is up to date.");
        }).catch(function(err) {
            var status = module.hot.status();
            if ([
                "abort",
                "fail"
            ].indexOf(status) >= 0) {
                log("warning", "[HMR] Cannot apply update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
                log("warning", "[HMR] " + log.formatError(err));
                if (typeof window !== "undefined") window.location.reload();
            } else log("warning", "[HMR] Update failed: " + log.formatError(err));
        });
    };
    var hotEmitter = __webpack_require__(/*! ./emitter */"./node_modules/.pnpm/@rspack+core@0.5.8/node_modules/@rspack/core/hot/emitter.js");
    hotEmitter.on("webpackHotUpdate", function(currentHash) {
        lastHash = currentHash;
        if (!upToDate() && module.hot.status() === "idle") {
            log("info", "[HMR] Checking for updates on the server...");
            check();
        }
    });
    log("info", "[HMR] Waiting for update signal from WDS...");
} else {}
}),
"./node_modules/.pnpm/@rspack+core@0.5.8/node_modules/@rspack/core/hot/emitter.js": (function (module, __unused_webpack_exports, __webpack_require__) {
var EventEmitter = __webpack_require__(/*! events */"./node_modules/.pnpm/events@3.3.0/node_modules/events/events.js");
module.exports = new EventEmitter();
}),
"./node_modules/.pnpm/@rspack+core@0.5.8/node_modules/@rspack/core/hot/log-apply-result.js": (function (module, __unused_webpack_exports, __webpack_require__) {
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/ /**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */ module.exports = function(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function(moduleId) {
        return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });
    var log = __webpack_require__(/*! ./log */"./node_modules/.pnpm/@rspack+core@0.5.8/node_modules/@rspack/core/hot/log.js");
    if (unacceptedModules.length > 0) {
        log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
        unacceptedModules.forEach(function(moduleId) {
            log("warning", "[HMR]  - " + moduleId);
        });
    }
    if (!renewedModules || renewedModules.length === 0) log("info", "[HMR] Nothing hot updated.");
    else {
        log("info", "[HMR] Updated modules:");
        renewedModules.forEach(function(moduleId) {
            if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
                var parts = moduleId.split("!");
                log.groupCollapsed("info", "[HMR]  - " + parts.pop());
                log("info", "[HMR]  - " + moduleId);
                log.groupEnd("info");
            } else log("info", "[HMR]  - " + moduleId);
        });
        var numberIds = renewedModules.every(function(moduleId) {
            return typeof moduleId === "number";
        });
        if (numberIds) log("info", '[HMR] Consider using the optimization.moduleIds: "named" for module names.');
    }
};
}),
"./node_modules/.pnpm/@rspack+core@0.5.8/node_modules/@rspack/core/hot/log.js": (function (module) {
/** @typedef {"info" | "warning" | "error"} LogLevel */ /** @type {LogLevel} */ var logLevel = "info";
function dummy() {}
/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */ function shouldLog(level) {
    var shouldLog = logLevel === "info" && level === "info" || [
        "info",
        "warning"
    ].indexOf(logLevel) >= 0 && level === "warning" || [
        "info",
        "warning",
        "error"
    ].indexOf(logLevel) >= 0 && level === "error";
    return shouldLog;
}
/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */ function logGroup(logFn) {
    return function(level, msg) {
        if (shouldLog(level)) logFn(msg);
    };
}
/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */ module.exports = function(level, msg) {
    if (shouldLog(level)) {
        if (level === "info") console.log(msg);
        else if (level === "warning") console.warn(msg);
        else if (level === "error") console.error(msg);
    }
};
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
module.exports.group = logGroup(group);
module.exports.groupCollapsed = logGroup(groupCollapsed);
module.exports.groupEnd = logGroup(groupEnd);
/**
 * @param {LogLevel} level log level
 */ module.exports.setLogLevel = function(level) {
    logLevel = level;
};
/**
 * @param {Error} err error
 * @returns {string} formatted error
 */ module.exports.formatError = function(err) {
    var message = err.message;
    var stack = err.stack;
    if (!stack) return message;
    else if (stack.indexOf(message) < 0) return message + "\n" + stack;
    else return stack;
};
}),
"./node_modules/.pnpm/events@3.3.0/node_modules/events/events.js": (function (module) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';
var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') ReflectOwnKeys = R.ownKeys;
else if (Object.getOwnPropertySymbols) ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
};
else ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
};
function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function EventEmitter() {
    EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
    if (typeof listener !== 'function') throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
        return defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
        defaultMaxListeners = arg;
    }
});
EventEmitter.init = function() {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for(var i = 1; i < arguments.length; i++)args.push(arguments[i]);
    var doError = type === 'error';
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0) er = args[0];
        if (er instanceof Error) // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
        // At least give some kind of context to the user
        var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined) return false;
    if (typeof handler === 'function') ReflectApply(handler, this, args);
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for(var i = 0; i < len; ++i)ReflectApply(listeners[i], this, args);
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit('newListener', type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === 'function') // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [
            listener,
            existing
        ] : [
            existing,
            listener
        ];
        else if (prepend) existing.unshift(listener);
        else existing.push(listener);
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
};
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
};
// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = Object.create(null);
        else {
            delete events[type];
            if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
        }
    } else if (typeof list !== 'function') {
        position = -1;
        for(i = list.length - 1; i >= 0; i--)if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
        }
        if (position < 0) return this;
        if (position === 0) list.shift();
        else spliceOne(list, position);
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
    }
    return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this;
    // not listening for removeListener, no need to emit
    if (events.removeListener === undefined) {
        if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0) this._events = Object.create(null);
            else delete events[type];
        }
        return this;
    }
    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for(i = 0; i < keys.length; ++i){
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
    }
    listeners = events[type];
    if (typeof listeners === 'function') this.removeListener(type, listeners);
    else if (listeners !== undefined) // LIFO order
    for(i = listeners.length - 1; i >= 0; i--)this.removeListener(type, listeners[i]);
    return this;
};
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === 'function') return unwrap ? [
        evlistener.listener || evlistener
    ] : [
        evlistener
    ];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') return emitter.listenerCount(type);
    else return listenerCount.call(emitter, type);
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === 'function') return 1;
        else if (evlistener !== undefined) return evlistener.length;
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
    var copy = new Array(n);
    for(var i = 0; i < n; ++i)copy[i] = arr[i];
    return copy;
}
function spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for(var i = 0; i < ret.length; ++i)ret[i] = arr[i].listener || arr[i];
    return ret;
}
function once(emitter, name) {
    return new Promise(function(resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === 'function') emitter.removeListener('error', errorListener);
            resolve([].slice.call(arguments));
        }
        eventTargetAgnosticAddListener(emitter, name, resolver, {
            once: true
        });
        if (name !== 'error') addErrorHandlerIfEventEmitter(emitter, errorListener, {
            once: true
        });
    });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
        if (flags.once) emitter.once(name, listener);
        else emitter.on(name, listener);
    } else if (typeof emitter.addEventListener === 'function') // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
        // IE does not have builtin `{ once: true }` support so we
        // have to do it manually.
        if (flags.once) emitter.removeEventListener(name, wrapListener);
        listener(arg);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
}
}),
"./node_modules/.pnpm/webpack-dev-server@4.13.1_webpack@5.91.0/node_modules/webpack-dev-server/client/clients/WebSocketClient.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return WebSocketClient; }
});
/* harmony import */var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */"./node_modules/.pnpm/webpack-dev-server@4.13.1_webpack@5.91.0/node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var WebSocket = __webpack_require__(/*! /Users/bytedance/rspack-provide-repro/src/WebSocket/index.js */"./src/WebSocket/index.js")["default"];
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}

var WebSocketClient = /*#__PURE__*/ function() {
    /**
   * @param {string} url
   */ function WebSocketClient(url) {
        _classCallCheck(this, WebSocketClient);
        this.client = new WebSocket(url);
        this.client.onerror = function(error) {
            _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
        };
    }
    /**
   * @param {(...args: any[]) => void} f
   */ _createClass(WebSocketClient, [
        {
            key: "onOpen",
            value: function onOpen(f) {
                this.client.onopen = f;
            }
        },
        {
            key: "onClose",
            value: function onClose(f) {
                this.client.onclose = f;
            }
        },
        {
            key: "onMessage",
            value: function onMessage(f) {
                this.client.onmessage = function(e) {
                    f(e.data);
                };
            }
        }
    ]);
    return WebSocketClient;
}();

}),
"./node_modules/.pnpm/webpack-dev-server@4.13.1_webpack@5.91.0/node_modules/webpack-dev-server/client/modules/logger/index.js": (function (module, exports) {
/******/ (function() {
    /******/ "use strict";
    /******/ var __webpack_modules__ = {
        /***/ "./client-src/modules/logger/SyncBailHookFake.js": /*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/ /***/ function(module) {
            /**
 * Client stub for tapable SyncBailHook
 */ module.exports = function clientTapableSyncBailHook() {
                return {
                    call: function call() {}
                };
            };
        /***/ },
        /***/ "./node_modules/webpack/lib/logging/Logger.js": /*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/ /***/ function(__unused_webpack_module, exports1) {
            /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/ function _toConsumableArray(arr) {
                return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
            }
            function _nonIterableSpread() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function _unsupportedIterableToArray(o, minLen) {
                if (!o) return;
                if (typeof o === "string") return _arrayLikeToArray(o, minLen);
                var n = Object.prototype.toString.call(o).slice(8, -1);
                if (n === "Object" && o.constructor) n = o.constructor.name;
                if (n === "Map" || n === "Set") return Array.from(o);
                if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
            }
            function _iterableToArray(iter) {
                if (typeof (typeof Symbol !== "undefined" ? Symbol : function(i) {
                    return i;
                }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function(i) {
                    return i;
                }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
            }
            function _arrayWithoutHoles(arr) {
                if (Array.isArray(arr)) return _arrayLikeToArray(arr);
            }
            function _arrayLikeToArray(arr, len) {
                if (len == null || len > arr.length) len = arr.length;
                for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
                return arr2;
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _defineProperties(target, props) {
                for(var i = 0; i < props.length; i++){
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
                }
            }
            function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                if (staticProps) _defineProperties(Constructor, staticProps);
                Object.defineProperty(Constructor, "prototype", {
                    writable: false
                });
                return Constructor;
            }
            function _toPropertyKey(arg) {
                var key = _toPrimitive(arg, "string");
                return typeof key === "symbol" ? key : String(key);
            }
            function _toPrimitive(input, hint) {
                if (typeof input !== "object" || input === null) return input;
                var prim = input[(typeof Symbol !== "undefined" ? Symbol : function(i) {
                    return i;
                }).toPrimitive];
                if (prim !== undefined) {
                    var res = prim.call(input, hint || "default");
                    if (typeof res !== "object") return res;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return (hint === "string" ? String : Number)(input);
            }
            var LogType = Object.freeze({
                error: /** @type {"error"} */ "error",
                // message, c style arguments
                warn: /** @type {"warn"} */ "warn",
                // message, c style arguments
                info: /** @type {"info"} */ "info",
                // message, c style arguments
                log: /** @type {"log"} */ "log",
                // message, c style arguments
                debug: /** @type {"debug"} */ "debug",
                // message, c style arguments
                trace: /** @type {"trace"} */ "trace",
                // no arguments
                group: /** @type {"group"} */ "group",
                // [label]
                groupCollapsed: /** @type {"groupCollapsed"} */ "groupCollapsed",
                // [label]
                groupEnd: /** @type {"groupEnd"} */ "groupEnd",
                // [label]
                profile: /** @type {"profile"} */ "profile",
                // [profileName]
                profileEnd: /** @type {"profileEnd"} */ "profileEnd",
                // [profileName]
                time: /** @type {"time"} */ "time",
                // name, time as [seconds, nanoseconds]
                clear: /** @type {"clear"} */ "clear",
                // no arguments
                status: /** @type {"status"} */ "status" // message, arguments
            });
            exports1.LogType = LogType;
            /** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */ var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function(i) {
                return i;
            })("webpack logger raw log method");
            var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function(i) {
                return i;
            })("webpack logger times");
            var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function(i) {
                return i;
            })("webpack logger aggregated times");
            var WebpackLogger = /*#__PURE__*/ function() {
                /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */ function WebpackLogger(log, getChildLogger) {
                    _classCallCheck(this, WebpackLogger);
                    this[LOG_SYMBOL] = log;
                    this.getChildLogger = getChildLogger;
                }
                _createClass(WebpackLogger, [
                    {
                        key: "error",
                        value: function error() {
                            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
                            this[LOG_SYMBOL](LogType.error, args);
                        }
                    },
                    {
                        key: "warn",
                        value: function warn() {
                            for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)args[_key2] = arguments[_key2];
                            this[LOG_SYMBOL](LogType.warn, args);
                        }
                    },
                    {
                        key: "info",
                        value: function info() {
                            for(var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)args[_key3] = arguments[_key3];
                            this[LOG_SYMBOL](LogType.info, args);
                        }
                    },
                    {
                        key: "log",
                        value: function log() {
                            for(var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)args[_key4] = arguments[_key4];
                            this[LOG_SYMBOL](LogType.log, args);
                        }
                    },
                    {
                        key: "debug",
                        value: function debug() {
                            for(var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++)args[_key5] = arguments[_key5];
                            this[LOG_SYMBOL](LogType.debug, args);
                        }
                    },
                    {
                        key: "assert",
                        value: function assert(assertion) {
                            if (!assertion) {
                                for(var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++)args[_key6 - 1] = arguments[_key6];
                                this[LOG_SYMBOL](LogType.error, args);
                            }
                        }
                    },
                    {
                        key: "trace",
                        value: function trace() {
                            this[LOG_SYMBOL](LogType.trace, [
                                "Trace"
                            ]);
                        }
                    },
                    {
                        key: "clear",
                        value: function clear() {
                            this[LOG_SYMBOL](LogType.clear);
                        }
                    },
                    {
                        key: "status",
                        value: function status() {
                            for(var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++)args[_key7] = arguments[_key7];
                            this[LOG_SYMBOL](LogType.status, args);
                        }
                    },
                    {
                        key: "group",
                        value: function group() {
                            for(var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++)args[_key8] = arguments[_key8];
                            this[LOG_SYMBOL](LogType.group, args);
                        }
                    },
                    {
                        key: "groupCollapsed",
                        value: function groupCollapsed() {
                            for(var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++)args[_key9] = arguments[_key9];
                            this[LOG_SYMBOL](LogType.groupCollapsed, args);
                        }
                    },
                    {
                        key: "groupEnd",
                        value: function groupEnd() {
                            for(var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++)args[_key10] = arguments[_key10];
                            this[LOG_SYMBOL](LogType.groupEnd, args);
                        }
                    },
                    {
                        key: "profile",
                        value: function profile(label) {
                            this[LOG_SYMBOL](LogType.profile, [
                                label
                            ]);
                        }
                    },
                    {
                        key: "profileEnd",
                        value: function profileEnd(label) {
                            this[LOG_SYMBOL](LogType.profileEnd, [
                                label
                            ]);
                        }
                    },
                    {
                        key: "time",
                        value: function time(label) {
                            this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
                            this[TIMERS_SYMBOL].set(label, process.hrtime());
                        }
                    },
                    {
                        key: "timeLog",
                        value: function timeLog(label) {
                            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
                            if (!prev) throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
                            var time = process.hrtime(prev);
                            this[LOG_SYMBOL](LogType.time, [
                                label
                            ].concat(_toConsumableArray(time)));
                        }
                    },
                    {
                        key: "timeEnd",
                        value: function timeEnd(label) {
                            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
                            if (!prev) throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
                            var time = process.hrtime(prev);
                            this[TIMERS_SYMBOL].delete(label);
                            this[LOG_SYMBOL](LogType.time, [
                                label
                            ].concat(_toConsumableArray(time)));
                        }
                    },
                    {
                        key: "timeAggregate",
                        value: function timeAggregate(label) {
                            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
                            if (!prev) throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
                            var time = process.hrtime(prev);
                            this[TIMERS_SYMBOL].delete(label);
                            this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
                            var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
                            if (current !== undefined) {
                                if (time[1] + current[1] > 1e9) {
                                    time[0] += current[0] + 1;
                                    time[1] = time[1] - 1e9 + current[1];
                                } else {
                                    time[0] += current[0];
                                    time[1] += current[1];
                                }
                            }
                            this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
                        }
                    },
                    {
                        key: "timeAggregateEnd",
                        value: function timeAggregateEnd(label) {
                            if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
                            var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
                            if (time === undefined) return;
                            this[TIMERS_AGGREGATES_SYMBOL].delete(label);
                            this[LOG_SYMBOL](LogType.time, [
                                label
                            ].concat(_toConsumableArray(time)));
                        }
                    }
                ]);
                return WebpackLogger;
            }();
            exports1.Logger = WebpackLogger;
        /***/ },
        /***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js": /*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/ /***/ function(module, __unused_webpack_exports, __webpack_require__) {
            /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/ function _toConsumableArray(arr) {
                return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
            }
            function _nonIterableSpread() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function _unsupportedIterableToArray(o, minLen) {
                if (!o) return;
                if (typeof o === "string") return _arrayLikeToArray(o, minLen);
                var n = Object.prototype.toString.call(o).slice(8, -1);
                if (n === "Object" && o.constructor) n = o.constructor.name;
                if (n === "Map" || n === "Set") return Array.from(o);
                if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
            }
            function _iterableToArray(iter) {
                if (typeof (typeof Symbol !== "undefined" ? Symbol : function(i) {
                    return i;
                }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function(i) {
                    return i;
                }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
            }
            function _arrayWithoutHoles(arr) {
                if (Array.isArray(arr)) return _arrayLikeToArray(arr);
            }
            function _arrayLikeToArray(arr, len) {
                if (len == null || len > arr.length) len = arr.length;
                for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
                return arr2;
            }
            var _require = __webpack_require__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"), LogType = _require.LogType;
            /** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */ /** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */ /** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */ /** @typedef {function(string): boolean} FilterFunction */ /**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */ /**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */ /**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */ var filterToFunction = function filterToFunction(item) {
                if (typeof item === "string") {
                    var regExp = new RegExp("[\\\\/]".concat(item.replace(// eslint-disable-next-line no-useless-escape
                    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
                    return function(ident) {
                        return regExp.test(ident);
                    };
                }
                if (item && typeof item === "object" && typeof item.test === "function") return function(ident) {
                    return item.test(ident);
                };
                if (typeof item === "function") return item;
                if (typeof item === "boolean") return function() {
                    return item;
                };
            };
            /**
 * @enum {number}
 */ var LogLevel = {
                none: 6,
                false: 6,
                error: 5,
                warn: 4,
                info: 3,
                log: 2,
                true: 2,
                verbose: 1
            };
            /**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */ module.exports = function(_ref) {
                var _ref$level = _ref.level, level = _ref$level === void 0 ? "info" : _ref$level, _ref$debug = _ref.debug, debug = _ref$debug === void 0 ? false : _ref$debug, console1 = _ref.console;
                var debugFilters = typeof debug === "boolean" ? [
                    function() {
                        return debug;
                    }
                ] : /** @type {FilterItemTypes[]} */ [].concat(debug).map(filterToFunction);
                /** @type {number} */ var loglevel = LogLevel["".concat(level)] || 0;
                /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */ var logger = function logger(name, type, args) {
                    var labeledArgs = function labeledArgs() {
                        if (Array.isArray(args)) {
                            if (args.length > 0 && typeof args[0] === "string") return [
                                "[".concat(name, "] ").concat(args[0])
                            ].concat(_toConsumableArray(args.slice(1)));
                            else return [
                                "[".concat(name, "]")
                            ].concat(_toConsumableArray(args));
                        } else return [];
                    };
                    var debug = debugFilters.some(function(f) {
                        return f(name);
                    });
                    switch(type){
                        case LogType.debug:
                            if (!debug) return;
                            // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            if (typeof console1.debug === "function") // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            console1.debug.apply(console1, _toConsumableArray(labeledArgs()));
                            else console1.log.apply(console1, _toConsumableArray(labeledArgs()));
                            break;
                        case LogType.log:
                            if (!debug && loglevel > LogLevel.log) return;
                            console1.log.apply(console1, _toConsumableArray(labeledArgs()));
                            break;
                        case LogType.info:
                            if (!debug && loglevel > LogLevel.info) return;
                            console1.info.apply(console1, _toConsumableArray(labeledArgs()));
                            break;
                        case LogType.warn:
                            if (!debug && loglevel > LogLevel.warn) return;
                            console1.warn.apply(console1, _toConsumableArray(labeledArgs()));
                            break;
                        case LogType.error:
                            if (!debug && loglevel > LogLevel.error) return;
                            console1.error.apply(console1, _toConsumableArray(labeledArgs()));
                            break;
                        case LogType.trace:
                            if (!debug) return;
                            console1.trace();
                            break;
                        case LogType.groupCollapsed:
                            if (!debug && loglevel > LogLevel.log) return;
                            if (!debug && loglevel > LogLevel.verbose) {
                                // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                if (typeof console1.groupCollapsed === "function") // eslint-disable-next-line node/no-unsupported-features/node-builtins
                                console1.groupCollapsed.apply(console1, _toConsumableArray(labeledArgs()));
                                else console1.log.apply(console1, _toConsumableArray(labeledArgs()));
                                break;
                            }
                        // falls through
                        case LogType.group:
                            if (!debug && loglevel > LogLevel.log) return;
                            // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            if (typeof console1.group === "function") // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            console1.group.apply(console1, _toConsumableArray(labeledArgs()));
                            else console1.log.apply(console1, _toConsumableArray(labeledArgs()));
                            break;
                        case LogType.groupEnd:
                            if (!debug && loglevel > LogLevel.log) return;
                            // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            if (typeof console1.groupEnd === "function") // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            console1.groupEnd();
                            break;
                        case LogType.time:
                            if (!debug && loglevel > LogLevel.log) return;
                            var ms = args[1] * 1000 + args[2] / 1000000;
                            var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");
                            if (typeof console1.logTime === "function") console1.logTime(msg);
                            else console1.log(msg);
                            break;
                        case LogType.profile:
                            // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            if (typeof console1.profile === "function") // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            console1.profile.apply(console1, _toConsumableArray(labeledArgs()));
                            break;
                        case LogType.profileEnd:
                            // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            if (typeof console1.profileEnd === "function") // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            console1.profileEnd.apply(console1, _toConsumableArray(labeledArgs()));
                            break;
                        case LogType.clear:
                            if (!debug && loglevel > LogLevel.log) return;
                            // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            if (typeof console1.clear === "function") // eslint-disable-next-line node/no-unsupported-features/node-builtins
                            console1.clear();
                            break;
                        case LogType.status:
                            if (!debug && loglevel > LogLevel.info) return;
                            if (typeof console1.status === "function") {
                                if (args.length === 0) console1.status();
                                else console1.status.apply(console1, _toConsumableArray(labeledArgs()));
                            } else if (args.length !== 0) console1.info.apply(console1, _toConsumableArray(labeledArgs()));
                            break;
                        default:
                            throw new Error("Unexpected LogType ".concat(type));
                    }
                };
                return logger;
            };
        /***/ },
        /***/ "./node_modules/webpack/lib/logging/runtime.js": /*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/ /***/ function(__unused_webpack_module, exports1, __webpack_require__) {
            /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/ function _extends() {
                _extends = Object.assign ? Object.assign.bind() : function(target) {
                    for(var i = 1; i < arguments.length; i++){
                        var source = arguments[i];
                        for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                    }
                    return target;
                };
                return _extends.apply(this, arguments);
            }
            var SyncBailHook = __webpack_require__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");
            var _require = __webpack_require__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"), Logger = _require.Logger;
            var createConsoleLogger = __webpack_require__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");
            /** @type {createConsoleLogger.LoggerOptions} */ var currentDefaultLoggerOptions = {
                level: "info",
                debug: false,
                console: console
            };
            var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
            /**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */ exports1.getLogger = function(name) {
                return new Logger(function(type, args) {
                    if (exports1.hooks.log.call(name, type, args) === undefined) currentDefaultLogger(name, type, args);
                }, function(childName) {
                    return exports1.getLogger("".concat(name, "/").concat(childName));
                });
            };
            /**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */ exports1.configureDefaultLogger = function(options) {
                _extends(currentDefaultLoggerOptions, options);
                currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
            };
            exports1.hooks = {
                log: new SyncBailHook([
                    "origin",
                    "type",
                    "args"
                ])
            };
        /***/ }
    };
    /************************************************************************/ /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/ /******/ // The require function
    /******/ function __nested_webpack_require_31311_32098__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) /******/ return cachedModule.exports;
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = __webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {}
        };
        /******/ /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_31311_32098__);
        /******/ /******/ // Return the exports of the module
        /******/ return module.exports;
    /******/ }
    /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ !function() {
        /******/ // define getter functions for harmony exports
        /******/ __nested_webpack_require_31311_32098__.d = function(exports1, definition) {
            /******/ for(var key in definition)/******/ if (__nested_webpack_require_31311_32098__.o(definition, key) && !__nested_webpack_require_31311_32098__.o(exports1, key)) /******/ Object.defineProperty(exports1, key, {
                enumerable: true,
                get: definition[key]
            });
        /******/ };
    /******/ }();
    /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ !function() {
        /******/ __nested_webpack_require_31311_32098__.o = function(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        };
    /******/ }();
    /******/ /******/ /* webpack/runtime/make namespace object */ /******/ !function() {
        /******/ // define __esModule on exports
        /******/ __nested_webpack_require_31311_32098__.r = function(exports1) {
            /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) /******/ Object.defineProperty(exports1, Symbol.toStringTag, {
                value: 'Module'
            });
            /******/ Object.defineProperty(exports1, '__esModule', {
                value: true
            });
        /******/ };
    /******/ }();
    /******/ /************************************************************************/ var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    !function() {
        /*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/ __nested_webpack_require_31311_32098__.r(__webpack_exports__);
        /* harmony export */ __nested_webpack_require_31311_32098__.d(__webpack_exports__, {
            /* harmony export */ "default": function() {
                return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__;
            }
        });
        /* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_31311_32098__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");
    }();
    var __webpack_export_target__ = exports;
    for(var i in __webpack_exports__)__webpack_export_target__[i] = __webpack_exports__[i];
    if (__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", {
        value: true
    });
/******/ })();
}),
"./node_modules/.pnpm/webpack-dev-server@4.13.1_webpack@5.91.0/node_modules/webpack-dev-server/client/utils/log.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  log: function() { return log; },
  logEnabledFeatures: function() { return logEnabledFeatures; },
  setLogLevel: function() { return setLogLevel; }
});
/* harmony import */var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */"./node_modules/.pnpm/webpack-dev-server@4.13.1_webpack@5.91.0/node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";
// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */ function setLogLevel(level) {
    _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
        level: level
    });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);
var logEnabledFeatures = function logEnabledFeatures(features) {
    var enabledFeatures = Object.keys(features);
    if (!features || enabledFeatures.length === 0) return;
    var logString = "Server started:";
    // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
    for(var i = 0; i < enabledFeatures.length; i++){
        var key = enabledFeatures[i];
        logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
    }
    // replace last comma with a period
    logString = logString.slice(0, -1).concat(".");
    log.info(logString);
};

}),
"./src/WebSocket/WebSocket.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WebSocket: function() { return WebSocket; }
});
/* provided dependency */ var WebSocket = __webpack_require__(/*! /Users/bytedance/rspack-provide-repro/src/WebSocket/index.js */"./src/WebSocket/index.js")["default"];
function _define_property(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
class WebSocket {
}
_define_property(WebSocket, "CONNECTING", 0);
}),
"./src/WebSocket/index.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WebSocket: function() { return _WebSocket_js__WEBPACK_IMPORTED_MODULE_0__.WebSocket; }
});
/* harmony import */var _WebSocket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebSocket.js */"./src/WebSocket/WebSocket.js");


/* harmony default export */ __webpack_exports__["default"] = (_WebSocket_js__WEBPACK_IMPORTED_MODULE_0__.WebSocket);
}),
"./src/client.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
});
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! /Users/bytedance/rspack-provide-repro/node_modules/.pnpm/webpack-dev-server@4.13.1_webpack@5.91.0/node_modules/webpack-dev-server/client/clients/WebSocketClient.js */"./node_modules/.pnpm/webpack-dev-server@4.13.1_webpack@5.91.0/node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
const Client = typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : null;
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    let client = new Client();
    return client;
}
}),
"./src/entry.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */var _client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client.js */"./src/client.js");

(0, _client_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
}),
"./src/index.js": (function () {
console.log(42);
}),

}
// The module cache
 var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
// Check if module is in cache
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
      return cachedModule.exports;
      }
      // Create a new module (and put it into the cache)
      var module = (__webpack_module_cache__[moduleId] = {
      id: moduleId,
 exports: {}
      });
      // Execute the module function
      var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
            __webpack_require__.i.forEach(function(handler) { handler(execOptions); });
            module = execOptions.module;
            if (!execOptions.factory) {
              console.error("undefined factory", moduleId)
            }
            execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
            // Return the exports of the module
 return module.exports;

}
// expose the module cache
 __webpack_require__.c = __webpack_module_cache__;
// expose the module execution interceptor
 __webpack_require__.i = [];
// webpack/runtime/compat_get_default_export
!function() {
// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = function (module) {
	var getter = module && module.__esModule ?
		function () { return module['default']; } :
		function () { return module; };
	__webpack_require__.d(getter, { a: getter });
	return getter;
};




}();
// webpack/runtime/define_property_getters
!function() {
__webpack_require__.d = function(exports, definition) {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
}();
// webpack/runtime/get_full_hash
!function() {
__webpack_require__.h = function () {
	return "08b86b4ef34ffedb6c0e";
};

}();
// webpack/runtime/has_own_property
!function() {
__webpack_require__.o = function (obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

}();
// webpack/runtime/hot_module_replacement
!function() {
var currentModuleData = {};
var installedModules = __webpack_require__.c;

// module and require creation
var currentChildModule;
var currentParents = [];

// status
var registeredStatusHandlers = [];
var currentStatus = "idle";

// while downloading
// TODO: not needed in rspack temporary,
// TODO: because we transfer all changed modules.
var blockingPromises = 0;
var blockingPromisesWaiting = [];

// The update info
var currentUpdateApplyHandlers;
var queuedInvalidatedModules;

__webpack_require__.hmrD = currentModuleData;
__webpack_require__.i.push(function (options) {
	var module = options.module;
	var require = createRequire(options.require, options.id);
	module.hot = createModuleHotObject(options.id, module);
	module.parents = currentParents;
	module.children = [];
	currentParents = [];
	options.require = require;
});

__webpack_require__.hmrC = {};
__webpack_require__.hmrI = {};

function createRequire(require, moduleId) {
	var me = installedModules[moduleId];
	if (!me) return require;
	var fn = function (request) {
		if (me.hot.active) {
			if (installedModules[request]) {
				var parents = installedModules[request].parents;
				if (parents.indexOf(moduleId) === -1) {
					parents.push(moduleId);
				}
			} else {
				currentParents = [moduleId];
				currentChildModule = request;
			}
			if (me.children.indexOf(request) === -1) {
				me.children.push(request);
			}
		} else {
			console.warn(
				"[HMR] unexpected require(" +
				request +
				") from disposed module " +
				moduleId
			);
			currentParents = [];
		}
		return require(request);
	};
	var createPropertyDescriptor = function (name) {
		return {
			configurable: true,
			enumerable: true,
			get: function () {
				return require[name];
			},
			set: function (value) {
				require[name] = value;
			}
		};
	};
	for (var name in require) {
		if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
			Object.defineProperty(fn, name, createPropertyDescriptor(name));
		}
	}

	fn.e = function (chunkId, fetchPriority) {
		return trackBlockingPromise(require.e(chunkId, fetchPriority));
	};

	return fn;
}

function createModuleHotObject(moduleId, me) {
	var _main = currentChildModule !== moduleId;
	var hot = {
		_acceptedDependencies: {},
		_acceptedErrorHandlers: {},
		_declinedDependencies: {},
		_selfAccepted: false,
		_selfDeclined: false,
		_selfInvalidated: false,
		_disposeHandlers: [],
		_main: _main,
		_requireSelf: function () {
			currentParents = me.parents.slice();
			currentChildModule = _main ? undefined : moduleId;
			__webpack_require__(moduleId);
		},
		active: true,
		accept: function (dep, callback, errorHandler) {
			if (dep === undefined) hot._selfAccepted = true;
			else if (typeof dep === "function") hot._selfAccepted = dep;
			else if (typeof dep === "object" && dep !== null) {
				for (var i = 0; i < dep.length; i++) {
					hot._acceptedDependencies[dep[i]] = callback || function () { };
					hot._acceptedErrorHandlers[dep[i]] = errorHandler;
				}
			} else {
				hot._acceptedDependencies[dep] = callback || function () { };
				hot._acceptedErrorHandlers[dep] = errorHandler;
			}
		},
		decline: function (dep) {
			if (dep === undefined) hot._selfDeclined = true;
			else if (typeof dep === "object" && dep !== null)
				for (var i = 0; i < dep.length; i++)
					hot._declinedDependencies[dep[i]] = true;
			else hot._declinedDependencies[dep] = true;
		},
		dispose: function (callback) {
			hot._disposeHandlers.push(callback);
		},
		addDisposeHandler: function (callback) {
			hot._disposeHandlers.push(callback);
		},
		removeDisposeHandler: function (callback) {
			var idx = hot._disposeHandlers.indexOf(callback);
			if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
		},
		invalidate: function () {
			this._selfInvalidated = true;
			switch (currentStatus) {
				case "idle":
					currentUpdateApplyHandlers = [];
					Object.keys(__webpack_require__.hmrI).forEach(function (key) {
						__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
					});
					setStatus("ready");
					break;
				case "ready":
					Object.keys(__webpack_require__.hmrI).forEach(function (key) {
						__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
					});
					break;
				case "prepare":
				case "check":
				case "dispose":
				case "apply":
					(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
						moduleId
					);
					break;
				default:
					break;
			}
		},
		check: hotCheck,
		apply: hotApply,
		status: function (l) {
			if (!l) return currentStatus;
			registeredStatusHandlers.push(l);
		},
		addStatusHandler: function (l) {
			registeredStatusHandlers.push(l);
		},
		removeStatusHandler: function (l) {
			var idx = registeredStatusHandlers.indexOf(l);
			if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
		},
		data: currentModuleData[moduleId]
	};
	currentChildModule = undefined;
	return hot;
}

function setStatus(newStatus) {
	currentStatus = newStatus;
	var results = [];
	for (var i = 0; i < registeredStatusHandlers.length; i++)
		results[i] = registeredStatusHandlers[i].call(null, newStatus);

	return Promise.all(results);
}

function unblock() {
	if (--blockingPromises === 0) {
		setStatus("ready").then(function () {
			if (blockingPromises === 0) {
				var list = blockingPromisesWaiting;
				blockingPromisesWaiting = [];
				for (var i = 0; i < list.length; i++) {
					list[i]();
				}
			}
		});
	}
}

function trackBlockingPromise(promise) {
	switch (currentStatus) {
		case "ready":
			setStatus("prepare");
		case "prepare":
			blockingPromises++;
			promise.then(unblock, unblock);
			return promise;
		default:
			return promise;
	}
}

function waitForBlockingPromises(fn) {
	if (blockingPromises === 0) return fn();
	return new Promise(function (resolve) {
		blockingPromisesWaiting.push(function () {
			resolve(fn());
		});
	});
}

function hotCheck(applyOnUpdate) {
	if (currentStatus !== "idle") {
		throw new Error("check() is only allowed in idle status");
	}
	return setStatus("check")
		.then(__webpack_require__.hmrM)
		.then(function (update) {
			if (!update) {
				return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
					function () {
						return null;
					}
				);
			}

			return setStatus("prepare").then(function () {
				var updatedModules = [];
				currentUpdateApplyHandlers = [];

				return Promise.all(
					Object.keys(__webpack_require__.hmrC).reduce(function (
						promises,
						key
					) {
						__webpack_require__.hmrC[key](
							update.c,
							update.r,
							update.m,
							promises,
							currentUpdateApplyHandlers,
							updatedModules
						);
						return promises;
					},
						[])
				).then(function () {
					return waitForBlockingPromises(function () {
						if (applyOnUpdate) {
							return internalApply(applyOnUpdate);
						} else {
							return setStatus("ready").then(function () {
								return updatedModules;
							});
						}
					});
				});
			});
		});
}

function hotApply(options) {
	if (currentStatus !== "ready") {
		return Promise.resolve().then(function () {
			throw new Error(
				"apply() is only allowed in ready status (state: " + currentStatus + ")"
			);
		});
	}
	return internalApply(options);
}

function internalApply(options) {
	options = options || {};
	applyInvalidatedModules();
	var results = currentUpdateApplyHandlers.map(function (handler) {
		return handler(options);
	});
	currentUpdateApplyHandlers = undefined;
	var errors = results
		.map(function (r) {
			return r.error;
		})
		.filter(Boolean);

	if (errors.length > 0) {
		return setStatus("abort").then(function () {
			throw errors[0];
		});
	}

	var disposePromise = setStatus("dispose");

	results.forEach(function (result) {
		if (result.dispose) result.dispose();
	});

	var applyPromise = setStatus("apply");

	var error;
	var reportError = function (err) {
		if (!error) error = err;
	};

	var outdatedModules = [];
	results.forEach(function (result) {
		if (result.apply) {
			var modules = result.apply(reportError);
			if (modules) {
				for (var i = 0; i < modules.length; i++) {
					outdatedModules.push(modules[i]);
				}
			}
		}
	});

	return Promise.all([disposePromise, applyPromise]).then(function () {
		if (error) {
			return setStatus("fail").then(function () {
				throw error;
			});
		}

		if (queuedInvalidatedModules) {
			return internalApply(options).then(function (list) {
				outdatedModules.forEach(function (moduleId) {
					if (list.indexOf(moduleId) < 0) list.push(moduleId);
				});
				return list;
			});
		}

		return setStatus("idle").then(function () {
			return outdatedModules;
		});
	});
}

function applyInvalidatedModules() {
	if (queuedInvalidatedModules) {
		if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
		Object.keys(__webpack_require__.hmrI).forEach(function (key) {
			queuedInvalidatedModules.forEach(function (moduleId) {
				__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
			});
		});
		queuedInvalidatedModules = undefined;
		return true;
	}
}

}();
// webpack/runtime/make_namespace_object
!function() {
// define __esModule on exports
__webpack_require__.r = function(exports) {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};

}();
__webpack_require__("./src/entry.js");
__webpack_require__("./node_modules/.pnpm/@rspack+core@0.5.8/node_modules/@rspack/core/hot/dev-server.js");
var __webpack_exports__ = __webpack_require__("./src/index.js");
})()

//# sourceMappingURL=main.js.map