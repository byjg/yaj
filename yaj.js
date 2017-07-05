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

if (!window.yoSel) {
    window.yoSel = function (selectors) {
        if (typeof selectors === "string") {
            return document.querySelector(selectors);
        }
        return selectors;
    };

    window.yoSelAll = function (selectors) {
        if (typeof selectors === "string") {
            return document.querySelectorAll(selectors);
        }
        return [selectors];
    };

    window.yoHasClass = function (el, className)
    {
        if (el.classList)
            return el.classList.contains(className);
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    };

    window.yoAddClass = function (el, className)
    {
        if (el.classList)
            el.classList.add(className);
        else if (!yoHasClass(el, className))
            el.className += " " + className;
    };

    window.yoRemoveClass = function (el, className)
    {
        if (className === undefined || className === null) {
            el.className = "";
            return;
        }
        if (el.classList)
            el.classList.remove(className);
        else if (yoHasClass(el, className))
        {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    };

    window.yoToggleClass = function (el, className)
    {
        if (yoHasClass(el, className)) {
            yoRemoveClass(el, className)
        } else {
            yoAddClass(el, className)
        }
    };

    window.yoToggle = function (el)
    {
        if (yoIsVisible(el)) {
            el.style.display = 'none';
        } else {
            el.style.display = 'block';
        }
    };

    window.yoIs = function (objectToCheck, type) {
        var getType = {};
        return objectToCheck
            && getType.toString.call(objectToCheck).match(new RegExp('\\[object ' + type + '\\]')) !== null;
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

    window.yoIsVisible = function (el) {
        if (el === undefined || el === null) {
            return false;
        }
        return !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length );
    };

    window.yoOn = function (el, event, fn) {
        if(el.attachEvent) {
            el.attachEvent('on' + event, fn);
        }
        else if(el.addEventListener) {
            el.addEventListener(event, fn, true);
        }
        else {
            //The browser does not support Javascript event binding
        }
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

    window.yoAppend = function (el, str) {
        if (typeof str !== "string") {
            if (typeof str === Yaj) {
                return el.append(str.el());
            }
            return el.append(str);
        }

        var wrapper = document.createElement('div');
        wrapper.innerHTML = str;
        var children = wrapper.childNodes;
        for (var i=0; i<children.length; i++) {
            el.append(children[i]);
        }
    };

    window.yoOffset = function (el) {
        var curleft = curtop = 0;
        if (el.offsetParent) {
            do {
                curleft += el.offsetLeft;
                curtop += el.offsetTop;
            } while (el = el.offsetParent);
        }
        return {left: curleft, top: curtop };
    };

    window.yoScrollTo = function (element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            yoScrollTo(element, to, duration - 10);
        }, 10);
    };

    window.yoFade = function (el, type, ms) {
        var isIn = type === 'in',
            opacity = isIn ? 0 : 1,
            interval = 50,
            duration = ms,
            gap = interval / duration;

        if(isIn) {
            el.style.display = 'block';
            el.style.opacity = opacity;
        }

        function func() {
            opacity = isIn ? opacity + gap : opacity - gap;
            el.style.opacity = opacity;

            if(opacity <= 0) el.style.display = 'none';
            if(opacity <= 0 || opacity >= 1) window.clearInterval(fading);
        }

        var fading = window.setInterval(func, interval);
    };

    window.yoHide = function (element) {
        yoFade(element, 'out', 500);
    };

    window.yoShow = function (element) {
        yoFade(element, 'in', 500);
    };

    window.yoAttr = function (el, prop, value) {
        if (value === undefined || value === null) {
            return el[prop];
        }
        el[prop] = value;
    };

    window.yoStyle = function (el, prop, value) {
        if (value === undefined || value === null) {
            return el.style[prop];
        }
        el.style[prop] = value;
    };

    window.yoHtml = function (el, value) {
        if (value === undefined || value === null) {
            return el.innerHTML;
        }
        el.innerHTML = value;
    };

    window.yo = function(element) {
        return new Yaj(element);
    };

    var Yaj = function (element) {

        if (typeof element === "string") {
            this.element = document.querySelectorAll(element);
        } else {
            this.element = [element];
        }

        this.result = [];

        this.el = function () {
            if (this.element === null || this.element === undefined) {
                return null;
            }
            return this.element[0];
        };

        this._base = function (method, prop1, prop2, prop3) {
            var bool = false;
            this.result = [];
            for (var i=0; i<this.element.length; i++) {
                var r = window["yo" + method](this.element[i], prop1, prop2, prop3);
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

        this.hasClass = function (className) {
            return this._base('HasClass', className);
        };

        this.isVisible = function () {
            return this._base('IsVisible');
        };

        this.addClass = function(className) {
            this._base('AddClass', className);
            return this;
        };

        this.removeClass = function(className) {
            this._base('RemoveClass', className);
            return this;
        };

        this.toggleClass = function(className) {
            this._base('ToggleClass', className);
            return this;
        };

        this.toggle = function(className) {
            this._base('Toggle');
            return this;
        };

        this.show = function () {
            this._base('Show');
            return this;
        };

        this.hide = function () {
            this._base('Hide');
            return this;
        };

        this.append = function (data) {
            this._base('Append', data);
            return this;
        };

        this.attr = function (property, value) {
            this._base('Attr', property, value);
            if (value === undefined || value === null) {
                return this.result;
            }
            return this;
        };

        this.css = function (property, value) {
            this._base('Style', property, value);
            if (value === undefined || value === null) {
                return this.result;
            }
            return this;
        };

        this.html = function (value) {
            this._base('Html', value);
            if (value === undefined || value === null) {
                return this.result;
            }
            return this;
        };

        this.on = function (event, fn) {
            this._base('On', event, fn);
            return this;
        };

        this.offset = function () {
            this._base('Offset');
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
            this._base('ScrollTo', to, duration);
            return this;
        };

        this.fadeIn = function (ms) {
            this._base('Fade', 'in', ms);
            return this;
        };

        this.fadeOut = function (ms) {
            this._base('Fade', 'out', ms);
            return this;
        };

        return this;
    }
}
