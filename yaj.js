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
 * Polyfill for window.localStorage
 */
try {
    var storage = window['localStorage'],
        x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
}
catch(e) {
    window.yajLocalStorage = 'yaj_';
    window.localStorage = {
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
    window.localStorage.length = (document.cookie.match(new RegExp(yajLocalStorage + '(.*?)\=', 'g')) || window.localStorage).length;
}

/**
 * Starting defining Yaj
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

    /**
     *
     * @returns {XMLHttpRequest}
     */
    window.yoXhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml3.XMLHTTP");
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {}
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
        throw new Error("This browser does not support XMLHttpRequest.");
    };

    window.yo = function(element) {
        return new Yaj(element);
    };

    window.yoCopy = function(source, dest) {
        for (var attrname in source) {
            dest[attrname] = source[attrname];
        }
    };

    window.yoClone = function(obj) {
        if (null === obj || "object" !== typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    };

    var Yaj = function (element) {

        if (typeof element === "string") {
            this.element = document.querySelectorAll(element);
        } else {
            this.element = [element];
        }

        this.result = [];

        /**
         * @returns {HTMLElement}
         */
        this.el = function () {
            return this.els(0);
        };

        /**
         *
         * @param n
         * @returns {HTMLElement}
         */
        this.els = function(n) {
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

        this._base = function (method, prop1, prop2, prop3) {
            var bool = false;
            this.result = [];
            for (var i=0; i<this.element.length; i++) {
                var r = method(this.element[i], prop1, prop2, prop3);
                this.result.push(r);
                bool = bool || r;
            }
            if (this.result.length === 0) {
                this.result = null;
            }
            else if (this.result.length === 1) {
                this.result = this.result[0];
            }

            return bool;
        };

        /**
         *
         * @param n
         * @returns {Yaj}
         */
        this.eq = function (n) {
            return yo(this.els(n));
        };

        /**
         *
         * @param className
         * @returns {boolean}
         */
        this.hasClass = function (className) {
            return this._base(function (el, className) {
                if (el.classList)
                    return el.classList.contains(className);
                return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
            }, className);
        };

        /**
         * @returns {boolean}
         */
        this.isVisible = function () {
            return this._base(function (el) {
                if (el === undefined || el === null) {
                    return false;
                }
                return !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length );
            });
        };

        /**
         *
         * @param className
         * @returns {Yaj}
         */
        this.addClass = function(className) {
            this._base(function(el, className) {
                if (el.classList) {
                    el.classList.add(className);
                } else if (!yo(el).hasClass(className)) {
                    el.className += " " + className;
                }
            }, className);
            return this;
        };

        /**
         *
         * @param className
         * @returns {Yaj}
         */
        this.removeClass = function(className) {
            this._base(function (el, className)
            {
                if (className === undefined || className === null) {
                    el.className = "";
                    return;
                }
                if (el.classList)
                    el.classList.remove(className);
                else if (yo(el).hasClass(className))
                {
                    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                    el.className = el.className.replace(reg, ' ');
                }
            }, className);
            return this;
        };

        /**
         *
         * @param className
         * @returns {Yaj}
         */
        this.toggleClass = function(className) {
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
        this.toggle = function() {
            this._base(function (el) {
                var me = yo(el);
                if (me.isVisible()) {
                    me.hide();
                } else {
                    me.show();
                }
            });
            return this;
        };

        /**
         *
         * @returns {Yaj}
         */
        this.show = function () {
            this.fadeIn(200);
            return this;
        };

        /**
         *
         * @returns {Yaj}
         */
        this.hide = function () {
            this.fadeOut(200);
            return this;
        };

        /**
         *
         * @param data
         * @returns {Yaj}
         */
        this.append = function (data) {
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

                for (var i=0; i<children.length; i++) {
                    el.appendChild(children[i].cloneNode(true));
                }
            }, data);
            return this;
        };

        /**
         *
         * @returns {Yaj}
         */
        this.remove = function () {
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
        this.isCollideWith = function (data) {
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
                for (var i=0; i<elDest.length; i++) {
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
         * @param value
         * @returns {*}
         */
        this.attr = function (property, value) {
            this._base(function (el, prop, value) {
                if (value === undefined || value === null) {
                    return el[prop];
                }
                el[prop] = value;
            }, property, value);

            if (value === undefined || value === null) {
                return this.result;
            }
            return this;
        };

        /**
         *
         * @param property
         * @param value
         * @returns {*}
         */
        this.css = function (property, value) {
            this._base(function (el, prop, value) {
                if (value === undefined || value === null) {
                    return el.style[prop];
                }
                el.style[prop] = value;
            }, property, value);

            if (value === undefined || value === null) {
                return this.result;
            }
            return this;
        };

        /**
         *
         * @param value
         * @returns {*}
         */
        this.html = function (value) {
            this._base(function (el, value) {
                if (value === undefined || value === null) {
                    return el.innerHTML;
                }
                el.innerHTML = value;
            }, value);

            if (value === undefined || value === null) {
                return this.result;
            }
            return this;
        };

        /**
         *
         * @param event
         * @param fn
         * @returns {Yaj}
         */
        this.on = function (event, fn) {
            this._base(function (el, event, fn) {
                if(el.attachEvent) {
                    el.attachEvent('on' + event, fn);
                }
                else if(el.addEventListener) {
                    el.addEventListener(event, fn, true);
                }
                else {
                    //The browser does not support Javascript event binding
                }
            }, event, fn);
            return this;
        };

        /**
         *
         * @returns {Array}
         */
        this.offset = function () {
            this._base(function (el) {
                var curleft = 0;
                var curtop = 0;
                if (el.offsetParent) {
                    do {
                        curleft += el.offsetLeft;
                        curtop += el.offsetTop;
                    } while (el = el.offsetParent);
                }
                return {left: curleft, top: curtop };
            });
            return this.result;
        };

        /**
         *
         * @param url
         * @param data
         * @param success
         * @param error
         */
        this.get = function (url, data, success, error) {
            this.request({
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
        this.post = function (url, data, success, error) {
            this.request({
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
         */
        this.request = function (options) {
            var xhr = new yoXhr();
            xhr.open(options.method, options.url, true);
            if (options.headers) {
                for (var key in options.headers) {
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
                if (this.readyState !== 4) return;
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
        this.getJson = function (url, data, success, error) {
            this.get(url, data, function (result) {
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
        this.postJson = function (url, data, success, error) {
            this.post(url, data, function (result) {
                success(JSON.parse(result));
            }, error);
        };

        /**
         *
         * @param src
         * @param func
         */
        this.getScript = function (src, func) {
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
         * @param to
         * @param duration
         * @returns {Yaj}
         */
        this.scrollTo = function (to, duration) {
            this._base(function (element, to, duration) {
                if (duration <= 0) return;
                var difference = to - element.scrollTop;
                var perTick = difference / duration * 10;

                setTimeout(function() {
                    element.scrollTop = element.scrollTop + perTick;
                    if (element.scrollTop === to) return;
                    yo(element).scrollTo(to, duration - 10);
                }, 10);
            }, to, duration);
            return this;
        };

        /**
         *
         * @param type
         * @param ms
         */
        this.fade = function (type, ms) {
            this._base(function (el, type, ms) {
                var isIn = type === 'in',
                    opacity = isIn ? 0 : 1,
                    interval = 50,
                    duration = ms,
                    gap = interval / duration;

                if (isIn) {
                    el.style.display = 'block';
                    el.style.opacity = opacity;
                }

                function func() {
                    opacity = isIn ? opacity + gap : opacity - gap;
                    el.style.opacity = opacity;

                    if (opacity <= 0) el.style.display = 'none';
                    if (opacity <= 0 || opacity >= 1) window.clearInterval(fading);
                }

                var fading = window.setInterval(func, interval);
            }, type, ms)
        };

        /**
         *
         * @param ms
         * @returns {Yaj}
         */
        this.fadeIn = function (ms) {
            this.fade('in', ms);
            return this;
        };

        /**
         *
         * @param ms
         * @returns {Yaj}
         */
        this.fadeOut = function (ms) {
            this.fade('out', ms);
            return this;
        };

        return this;
    }
}
