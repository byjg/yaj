// Yaj - Yet Another jQuery Replacement
// http://yaj.byjg.com
// (c) 2017 byjg

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

if (!document.querySelector) {
    document.querySelector = function (selectors) {
        var elements = document.querySelectorAll(selectors);
        return (elements.length) ? elements[0] : null;
    };
}

if (typeof Yaj === "undefined") {

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
        if (null == obj || "object" != typeof obj) return obj;
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

        this.el = function () {
            return this.els(0);
        };

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

        this.eq = function (n) {
            return yo(this.els(n));
        };

        this.hasClass = function (className) {
            return this._base(function (el, className) {
                if (el.classList)
                    return el.classList.contains(className);
                return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
            }, className);
        };

        this.isVisible = function () {
            return this._base(function (el) {
                if (el === undefined || el === null) {
                    return false;
                }
                return !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length );
            });
        };

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

        this.show = function () {
            this.fadeIn(200);
            return this;
        };

        this.hide = function () {
            this.fadeOut(200);
            return this;
        };

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
                    return el.append(data);
                }

                for (var i=0; i<children.length; i++) {
                    el.append(children[i].cloneNode(true));
                }
            }, data);
            return this;
        };

        this.remove = function () {
            this._base(function (el) {
                el.parentNode.removeChild(el);
            });
            return this;
        };

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

        this.get = function (url, data, success, error) {
            this.request({
                method: 'GET',
                url: url,
                data: data,
                success: success,
                error: error
            });
        };

        this.post = function (url, data, success, error) {
            this.request({
                method: 'POST',
                url: url,
                data: data,
                success: success,
                error: error
            });
        };

        this.request = function (options) {
            var xhr = new yoXhr();
            xhr.open(options.method, options.url, true);
            if (options.headers) {
                for (var key in options.headers) {
                    xhr.setRequestHeader(key, options.headers[key]);
                }
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

        this.getJson = function (url, data, success, error) {
            this.get(url, data, function (result) {
                success(JSON.parse(result));
            }, error);
        };

        this.postJson = function (url, data, success, error) {
            this.post(url, data, function (result) {
                success(JSON.parse(result));
            }, error);
        };

        this.getScript = function (src, func) {
            var script = document.createElement('script');
            script.async = "async";
            script.src = src;
            if (func) {
                script.onload = func;
            }
            document.getElementsByTagName("head")[0].appendChild(script);
        };

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

        this.fadeIn = function (ms) {
            this.fade('in', ms);
            return this;
        };

        this.fadeOut = function (ms) {
            this.fade('out', ms);
            return this;
        };

        return this;
    }
}
