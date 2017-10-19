//! Yaj - Yet Another jQuery Replacement
//! http://opensource.byjg.com/yaj

/**
 * Polyfill for querySelectorAll
 */
if (!document.querySelectorAll) {
    document.querySelectorAll = function (selectors) {
        var style = document.createElement('style'), elements = [], element;
        document.documentElement.firstChild.appendChild(style);
        document._qsa = [];

        style.styleSheet.cssText = selectors +
            '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
        window.scrollBy(0, 0);
        style.parentNode.removeChild(style);

        while (document._qsa.length) {
            element = document._qsa.shift();
            element.style.removeAttribute('x-qsa');
            elements.push(element);
        }
        document._qsa = null;
        return elements;
    };
}

/**
 * Polyfill for document.querySelector
 */
if (!document.querySelector) {
    document.querySelector = function (selectors) {
        var elements = document.querySelectorAll(selectors);
        return (elements.length) ? elements[0] : null;
    };
}


/**
 * Polyfill for Matches
 * @global Element
 */
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {
                // Try find. Empty loop;
            }
            return i > -1;
        };
}

/**
 * Polyfill for window.localStorage
 * @global yajLocalStorage
 */
try {
    var storage = window['localStorage'],
        x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
}
catch(e) {
    window.yajLocalStorage = 'yaj_';
    window['localStorage'] = {
        getItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
            return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + yajLocalStorage + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        key: function (nKeyId) {
            var regex = new RegExp(yajLocalStorage + '(.*?)\=', 'g');
            var keys = document.cookie.match(regex);
            return unescape(keys[nKeyId]).replace(regex, '$1');
        },
        setItem: function (sKey, sValue) {
            if(!sKey) { return; }
            document.cookie = yajLocalStorage + escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
            this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) { return; }
            document.cookie = yajLocalStorage + escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            this.length--;
        },
        hasOwnProperty: function (sKey) {
            return (new RegExp("(?:^|;\\s*)" + yajLocalStorage + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
    };
    window['localStorage'].length = (document.cookie.match(new RegExp(yajLocalStorage + '(.*?)\=', 'g')) || window.localStorage).length;
}

/**
 * Starting defining Yaj
 * @global Yaj
 */
if (typeof Yaj === "undefined") {

    /**
     * @param objectToCheck
     * @param type
     * @returns {boolean}
     */
    window.yoIs = function (objectToCheck, type) {
        var getType = {};
        return objectToCheck
            && (getType.toString.call(objectToCheck).match(new RegExp('\\[object ' + type + '\\]')) !== null
                || objectToCheck.constructor.name.match(new RegExp(type)) !== null
            );
    };

    window.yoIsFunction = function (object) {
        return yoIs(object, 'Function');
    };

    window.yoIsWindow = function (object) {
        return yoIs(object, 'Window');
    };

    window.yoIsArray = function (object) {
        return yoIs(object, 'Array');
    };

    window.yoIsDocument = function (object) {
        return yoIs(object, 'HTML.*Document');
    };

    window.yoIsHtmlElement = function (object) {
        return yoIs(object, 'HTML.*Element');
    };

    window.yoIsYaj = function (object) {
        return yoIs(object, 'Yaj');
    };

    window.yoGetParameter = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    /**
     * @global ActiveXObject
     * @returns {XMLHttpRequest|ActiveXObject}
     */
    window.yoXhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {
            // There is no exists Xhr object. Try next.
        }
        try {
            return new ActiveXObject("Msxml3.XMLHTTP");
        } catch (e) {
            // There is no exists Xhr object. Try next.
        }
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (e) {
            // There is no exists Xhr object. Try next.
        }
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        } catch (e) {
            // There is no exists Xhr object. Try next.
        }
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            // There is no exists Xhr object. Try next.
        }
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            // There is no Xhr compatible element existing here.
            // Fallback to default error message
        }
        throw new Error("This browser does not support XMLHttpRequest.");
    };

    window.yo = function(element) {
        return new Yaj(element);
    };

    /**
     * @global yoReady
     * @param fn
     */
    window.yoReady = function(fn) {
        /in/.test(document.readyState)?setTimeout(yoReady,9,fn):fn()
    };

    window.yoCopy = function(source, dest) {
        for (var attrname in source) {
            if (! source.hasOwnProperty(attrname)) {
                continue;
            }
            dest[attrname] = source[attrname];
        }
    };

    window.yoClone = function(obj) {
        if (null === obj || "object" !== typeof obj) {
            return obj;
        }
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    };

    var Yaj = (function() {

        var _result = [];
        var _events = {};

        function Yaj(element) {
            _result = [];
            if (typeof element === "string") {
                try {
                    this.element = document.querySelectorAll(element);
                } catch (e) {
                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = element;
                    this.element = [];
                    for (var i = 0; i < wrapper.childNodes.length; i++) {
                        this.element.push(wrapper.childNodes[i]);
                    }
                    // this.element = wrapper.childNodes;
                }
            } else if (yoIsArray(element)) {
                this.element = element;
            } else {
                this.element = [element];
            }
        }

        function _isVisible(el) {
            if (el === undefined || el === null) {
                return false;
            }
            return !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length );
        }

        Yaj.prototype._base = function (method, prop1, prop2, prop3) {
            var bool = false;
            var results = [];
            for (var i = 0; i < this.element.length; i++) {
                var r = method(this.element[i], prop1, prop2, prop3);
                results.push(r);
                bool = bool || r;
            }
            if (results.length === 0) {
                _result = null;
            }
            else if (results.length === 1) {
                _result = results[0];
            }
            else {
                _result = results;
            }

            return bool;
        };

        /**
         * @returns {HTMLElement}
         */
        Yaj.prototype.el = function (n) {
            return this.els(!n ? 0 : n);
        };

        /**
         *
         * @param [n]
         * @returns {HTMLElement}
         */
        Yaj.prototype.els = function (n) {
            if (this.element === null || this.element === undefined) {
                return null;
            }
            if (n === undefined) {
                return this.element;
            }
            if (n >= this.element.length) {
                return null;
            }
            return this.element[n];
        };

        /**
         *
         * @param n
         * @returns {Yaj}
         */
        Yaj.prototype.eq = function (n) {
            return yo(this.els(n));
        };

        /**
         *
         * @param className
         * @returns {boolean}
         */
        Yaj.prototype.hasClass = function (className) {
            return this._base(function (el, className) {
                if (el.classList) {
                    return el.classList.contains(className);
                }
                return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
            }, className);
        };

        /**
         * @returns {boolean}
         */
        Yaj.prototype.isVisible = function () {
            return this._base(_isVisible);
        };

        /**
         *
         * @return {boolean}
         */
        Yaj.prototype.exists = function () {
            return this.element && this.element.length > 0;
        };

        /**
         *
         * @param className
         * @returns {Yaj}
         */
        Yaj.prototype.addClass = function (className) {
            var classAr = className.split(' ');
            for (var i = 0; i < classAr.length; i++) {
                this._base(function (el, className) {
                    if (el.classList) {
                        el.classList.add(className);
                    } else if (!yo(el).hasClass(className)) {
                        el.className += " " + className;
                    }
                }, classAr[i]);
            }
            return this;
        };

        /**
         *
         * @param {String} [className]
         * @returns {Yaj}
         */
        Yaj.prototype.removeClass = function (className) {
            if (className === undefined || className === null) {
                className = "";
            }
            var classAr = className.split(' ');
            for (var i = 0; i < classAr.length; i++) {
                this._base(function (el, className) {
                    if (className.trim() === "") {
                        el.className = "";
                        return;
                    }
                    if (el.classList) {
                        el.classList.remove(className);
                    }
                    else if (yo(el).hasClass(className)) {
                        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                        el.className = el.className.replace(reg, ' ');
                    }
                }, classAr[i]);
            }
            return this;
        };

        /**
         *
         * @param className
         * @returns {Yaj}
         */
        Yaj.prototype.toggleClass = function (className) {
            this._base(function (el, className) {
                var me = yo(el);
                if (me.hasClass(className)) {
                    me.removeClass(className)
                } else {
                    me.addClass(className)
                }
            }, className);
            return this;
        };

        /**
         *
         * @returns {Yaj}
         */
        Yaj.prototype.toggle = function (callback) {
            this._base(function (el) {
                var me = yo(el);
                if (me.isVisible()) {
                    me.hide(callback);
                } else {
                    me.show(callback);
                }
            });
            return this;
        };

        /**
         *
         * @returns {Yaj}
         */
        Yaj.prototype.show = function (callback) {
            this.fadeIn(200, callback);
            return this;
        };

        /**
         *
         * @returns {Yaj}
         */
        Yaj.prototype.hide = function (callback) {
            this.fadeOut(200, callback);
            return this;
        };

        /**
         *
         * @param data
         * @returns {Yaj}
         */
        Yaj.prototype.append = function (data) {
            this._base(function (el, data) {
                var children;
                if (typeof data === "string") {
                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = data;
                    children = wrapper.childNodes;
                } else if (yoIsYaj(data)) {
                    children = data.element;
                } else {
                    return el.appendChild(data);
                }

                for (var i = 0; i < children.length; i++) {
                    el.appendChild(children[i].cloneNode(true));
                }
                return undefined;
            }, data);
            return this;
        };

        /**
         *
         * @returns {Yaj}
         */
        Yaj.prototype.appendTo = function (data) {
            if (typeof data === "string") {
                yo(data).append(this);
            } else if (yoIsYaj(data)) {
                data.append(this);
            } else {
                this._base(function (el, data) {
                    data.appendChild(el.cloneNode(true));
                }, data);
            }
            return this;
        };

        /**
         *
         * @returns {Yaj}
         */
        Yaj.prototype.children = function (data) {
            var newElement = [];
            for (var i = 0; i < this.element.length; i++) {
                var findR = this.element[i].children;
                for (var j = 0; j < findR.length; j++) {
                    if (!data || findR[j].matches(data)) {
                        newElement.push(findR[j]);
                    }
                }
            }

            return yo(newElement);
        };

        /**
         *
         * @returns {Yaj}
         */
        Yaj.prototype.find = function (data) {
            var newElement = [];
            for (var i = 0; i < this.element.length; i++) {
                var findR = this.element[i].querySelectorAll(data);
                for (var j = 0; j < findR.length; j++) {
                    newElement.push(findR[j]);
                }
            }

            return yo(newElement);
        };

        /**
         * @returns {Yaj}
         */
        Yaj.prototype.first = function () {
            if (!this.exists()) {
                return null;
            }
            return yo(this.els(0));
        };

        /**
         * @returns {Yaj}
         */
        Yaj.prototype.last = function () {
            if (!this.exists()) {
                return null;
            }
            return yo(this.els(this.element.length - 1));
        };

        /**
         *
         * @returns {Yaj}
         */
        Yaj.prototype.remove = function () {
            this._base(function (el) {
                el.parentNode.removeChild(el);
            });
            return this;
        };

        /**
         *
         * @param data
         * @returns {boolean}
         */
        Yaj.prototype.isCollideWith = function (data) {
            return this._base(function (elSrc, elDest) {
                if (elSrc !== undefined || elDest !== undefined) {
                    return false;
                }

                if (!yoIsYaj(elDest)) {
                    elDest = [elDest];
                } else {
                    elDest = elDest.element;
                }

                var rect1 = elSrc.getBoundingClientRect();
                var result = false;
                for (var i = 0; i < elDest.length; i++) {
                    var rect2 = elDest.getBoundingClientRect();
                    result = result || !(rect1.top > rect2.bottom
                        || rect1.right < rect2.left
                        || rect1.bottom < rect2.top
                        || rect1.left > rect2.right
                    );
                }
                return result;
            }, data);
        };

        /**
         *
         * @param property
         * @param [value]
         * @param [convertHtmlEntity]
         * @returns {Array|string|Yaj}
         */
        Yaj.prototype.attr = function (property, value, convertHtmlEntity) {
            if (property === "for") {
                property = "htmlFor";
            }
            this._base(function (el, prop, value) {
                if (value === undefined || value === null) {
                    return el[prop];
                }
                if (prop === "style") {   // hack for setup attribute 'style'.
                    var list = value.split(';');
                    for (var i = 0; i < list.length; i++) {
                        var parts = list[i].split(':');
                        if (parts.length === 2) {
                            el.style[parts[0].replace(/^\s+|\s+$/g, '')] = parts[1].replace(/^\s+|\s+$/g, '');
                        }
                    }
                } else {
                    if (convertHtmlEntity === true) {
                        var d = document.createElement('div');
                        d.innerHTML = value;
                        value = d.innerText;
                    }
                    el[prop] = value;
                }
                return undefined;
            }, property, value);

            if (value === undefined || value === null) {
                return _result;
            }
            return this;
        };

        /**
         *
         * @param property
         * @param [value]
         * @returns {Array|string|Yaj}
         */
        Yaj.prototype.css = function (property, value) {
            this._base(function (el, prop, value) {
                if (value === undefined || value === null) {
                    return el.style[prop];
                }
                el.style[prop] = value;
                return undefined;
            }, property, value);

            if (value === undefined || value === null) {
                return _result;
            }
            return this;
        };

        /**
         *
         * @param [value]
         * @returns {Array|string|Yaj}
         */
        Yaj.prototype.html = function (value) {
            this._base(function (el, value) {
                if (value === undefined || value === null) {
                    return el.innerHTML;
                }
                el.innerHTML = value;
                return undefined;
            }, value);

            if (value === undefined || value === null) {
                return _result;
            }
            return this;
        };

        /**
         *
         * @param [value]
         * @returns {Array|string|Yaj}
         */
        Yaj.prototype.text = function (value) {
            this._base(function (el, value) {
                if (value === undefined || value === null) {
                    return el.innerText;
                }
                el.innerText = value;
                return undefined;
            }, value);

            if (value === undefined || value === null) {
                return _result;
            }
            return this;
        };

        /**
         *
         * @param event
         * @param fn
         * @returns {Yaj}
         */
        Yaj.prototype.on = function (event, fn) {
            this._base(function (el, event, fn) {
                if (el.attachEvent) {
                    el.attachEvent('on' + event, fn);
                }
                else if (el.addEventListener) {
                    el.addEventListener(event, fn, true);
                }
                else {
                    //The browser does not support Javascript event binding
                }
            }, event, fn);
            return this;
        };

        Yaj.prototype.off = function () {
            this._base(function (element) {
                var clone = element.cloneNode();
                while (element.firstChild) {
                    clone.appendChild(element.firstChild);
                }
                element.parentNode.replaceChild(clone, element);
            });
        };

        /**
         *
         * @param event
         * @param fn
         * @return {Yaj}
         */
        Yaj.prototype.bind = function (event, fn) {
            if (!_events[event]) {
                if (Event) {
                    _events[event] = new Event(event);
                } else {
                    // Create the event.
                    _events[event] = document.createEvent(event);
                    // Define that the event name is event.
                    _events[event].initEvent(event, true, true);
                }
            }
            this.on(event, fn);
            return this;
        };

        /**
         *
         * @param event
         * @return {Yaj}
         */
        Yaj.prototype.trigger = function (event) {
            if (!_events[event]) {
                // None event is defined!
                return this;
            }
            this._base(function (el, event) {
                // Dispatch the event.
                el.dispatchEvent(_events[event]);
            }, event);
            return this;
        };

        /**
         *
         * @returns {Array}
         */
        Yaj.prototype.offset = function () {
            this._base(function (el) {
                var curleft = 0;
                var curtop = 0;
                if (el.offsetParent) {
                    var elParent = el;
                    do {
                        curleft += elParent.offsetLeft;
                        curtop += elParent.offsetTop;
                    } while (elParent = elParent.offsetParent);
                }
                return {left: curleft, top: curtop, width: el.offsetWidth, height: el.offsetHeight};
            });
            return _result;
        };

        /**
         *
         * @param url
         * @param data
         * @param success
         * @param error
         */
        Yaj.get = function (url, data, success, error) {
            Yaj.request({
                method: 'GET',
                url: url,
                data: data,
                success: success,
                error: error
            });
        };

        /**
         *
         * @param url
         * @param data
         * @param success
         * @param error
         */
        Yaj.post = function (url, data, success, error) {
            Yaj.request({
                method: 'POST',
                url: url,
                data: data,
                success: success,
                error: error
            });
        };

        /**
         *
         * @param options
         * @global yoXhr
         */
        Yaj.request = function (options) {
            var xhr = new yoXhr();
            xhr.open(options.method, options.url, true);
            if (options.headers) {
                for (var key in options.headers) {
                    // Skip keys from the prototype.
                    if (!options.headers.hasOwnProperty(key)) {
                        continue;
                    }
                    xhr.setRequestHeader(key, options.headers[key]);
                }
            }
            if (options.uploadProgress) {
                xhr.upload.onprogress = options.uploadProgress;
            }
            if (options.downloadProgress) {
                xhr.onprogress = options.downloadProgress;
            }
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status !== 200) {
                    yoIsFunction(options.error) && options.error(this.responseText, this.statusText, this)
                } else {
                    yoIsFunction(options.success) && options.success(this.responseText, this.statusText, this)
                }
            };
            xhr.send(options.data);
        };

        /**
         *
         * @param url
         * @param data
         * @param success
         * @param error
         */
        Yaj.getJson = function (url, data, success, error) {
            Yaj.get(url, data, function (result) {
                success(JSON.parse(result));
            }, error);
        };

        /**
         *
         * @param url
         * @param data
         * @param success
         * @param error
         */
        Yaj.postJson = function (url, data, success, error) {
            Yaj.post(url, data, function (result) {
                success(JSON.parse(result));
            }, error);
        };

        /**
         *
         * @param element
         * @return {boolean}
         */
        Yaj.isElementInDocument = function (element) {
            if (yoIsYaj(element)) {
                element = element.el();
            }
            if (element === document) {
                return true;
            }
            element = element.parentNode;
            if (element) {
                return Yaj.isElementInDocument(element);
            }
            return false;
        };

        /**
         *
         * @param src
         * @param func
         */
        Yaj.getScript = function (src, func) {
            var script = document.createElement('script');
            script.async = "async";
            script.src = src;
            if (func) {
                script.onload = func;
            }
            document.getElementsByTagName("head")[0].appendChild(script);
        };

        /**
         *
         * @param {String|Array} href required. The CSS location
         * @param {String} [rel] optional. The rel attribute. Defaults to "stylesheet"
         * @param {String} [type] optional. The type attribute. Defaults to "text/css"
         */
        Yaj.loadCss = function (href, rel, type) {
            if (!yoIsArray(href)) {
                href = [href];
            }
            for (var i=0; i<href.length; i++) {
                var css = document.createElement('link');
                css.rel = (rel ? rel : 'stylesheet');
                css.type = (type ? type : 'text/css');
                css.href = href[i];
                document.head.appendChild(css);
            }
        };

        /**
         *
         * @param to
         * @param duration
         * @returns {Yaj}
         */
        Yaj.prototype.scrollTo = function (to, duration) {
            this._base(function (element, to, duration) {
                if (duration <= 0) {
                    return;
                }
                var difference = to - element.scrollTop;
                var perTick = difference / duration * 10;

                setTimeout(function () {
                    element.scrollTop = element.scrollTop + perTick;
                    if (element.scrollTop === to) {
                        return;
                    }
                    yo(element).scrollTo(to, duration - 10);
                }, 10);
            }, to, duration);
            return this;
        };

        /**
         *
         * @param type
         * @param ms
         * @param callback
         */
        Yaj.prototype.fade = function (type, ms, callback) {

            // None element was found
            if (!this.element) {
                return;
            }

            // Check if is fadeIn or fadeOut and set default variables
            var isIn = type === 'in',
                interval = 50,
                duration = ms,
                gap = interval / duration;

            var count = 0;
            var total = this.element.length;

            // Recursive function to do the fade
            function func(el, opacity, checkEnd) {
                opacity = isIn ? opacity + gap : opacity - gap;
                el.style.opacity = opacity;
                if (opacity <= 0) {
                    el.style.display = 'none';
                }

                if (opacity <= 0 || opacity >= 1) {
                    checkEnd();
                } else {
                    window.setTimeout(function () {
                        func(el, opacity, checkEnd);
                    }, interval);
                }
            }

            // Check when ALL elements finish the transformation and call the callback
            function checkEnd() {
                count++;
                if (count >= total) {
                    if (callback) {
                        callback();
                    }
                }
            }

            // Prepare the fade. Define the start situation and call the recursive function
            for (var i = 0; i < this.element.length; i++) {
                var opacity = isIn ? 0 : 1;
                if (isIn) {
                    if (_isVisible(this.element[i])) {
                        checkEnd();
                        continue;
                    }
                    this.element[i].style.display = this.element[i]['yo-original-display'] || "block";
                    this.element[i].style.opacity = opacity;
                } else if (!_isVisible(this.element[i])) {
                    checkEnd();
                    continue;
                } else {
                    this.element[i]['yo-original-display'] = this.element[i].style.display;
                }
                (function (el, opacity) {
                    setTimeout(function () {
                        func(el, opacity, checkEnd)
                    }, 1);
                }(this.element[i], opacity))
            }
        };

        /**
         *
         * @param ms
         * @param callback
         * @returns {Yaj}
         */
        Yaj.prototype.fadeIn = function (ms, callback) {
            this.fade('in', ms, callback);
            return this;
        };

        /**
         *
         * @param ms
         * @param callback
         * @returns {Yaj}
         */
        Yaj.prototype.fadeOut = function (ms, callback) {
            this.fade('out', ms, callback);
            return this;
        };

        return Yaj;

    })();
}
