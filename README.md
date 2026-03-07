---
tags: [node.js, javascript]
---

# Yaj.js - Yet Another jQuery Replacement

[![Build Status](https://github.com/byjg/yaj/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/byjg/yaj/actions/workflows/build.yml)
[![Opensource ByJG](https://img.shields.io/badge/opensource-byjg-success.svg)](http://opensource.byjg.com)
[![GitHub source](https://img.shields.io/badge/Github-source-informational?logo=github)](https://github.com/byjg/yaj/)
[![GitHub license](https://img.shields.io/github/license/byjg/yaj.svg)](https://opensource.byjg.com/opensource/licensing.html)
[![GitHub release](https://img.shields.io/github/release/byjg/yaj.svg)](https://github.com/byjg/yaj/releases/)
[![](https://data.jsdelivr.com/v1/package/npm/yaj/badge)](https://www.jsdelivr.com/package/npm/yaj)

## Basic usage

The Yaj library like jQuery and Zepto exposes the "yo" instead "$".

"yo" requires a selector and all methods are based on the element (or elements) returned.

```javascript
yo('selector').addClass('my-class');
```

The selector can be all valid HTML5 selector:

- Element Id (#name)
- Class (.name)
- Sequences ("#name #name2" OR ".name .name2" OR ".name #name2" and other combination)
- More than one on the same object (".name.name2")
- HTML Elements ("p", "div", etc)
- HTML Document (document)
- Window (window)
- HTML string (eg. "'<div>text</div>'")
- List of selectors (eg. "p, span, .class")

You can call more than one method in sequence:

```javascript
yo('selector').removeClass('oneclass').addClass('otherclass');
```

## Lightweight

Yaj is also lightweight. Yaj have less than 18kb uncompressed, 8kb minified and **3kb minified and gzipped**.

## Installation


### Yarn or NPM

```bash
yarn add yaj
```

or

```bash
npm i yaj
```

and then:

```html
<script src="node_modules/yaj/yaj.min.js" />
```

### CDN JSDELIVR

#### Latest version

```html
<script src="https://cdn.jsdelivr.net/npm/yaj@1/yaj.min.js" />
```

#### Specific version

```html
<script src="https://cdn.jsdelivr.net/npm/yaj@1.0.3/yaj.min.js" />
```


### CDN UNPKG

#### Latest version

```html
<script src="https://unpkg.com/yaj/yaj.min.js" />
```

#### Specific version

```html
<script src="https://unpkg.com/yaj@1.0.1/yaj.min.js" />
```

## Yo Events

- yoReady() [ref](yaj-yoready) - The ready method makes sure that code is only executed when all DOM elements are safe to be manipulated.

## Yo Dom Manipulation Reference

- yo(selector).el() [ref](yaj-el) - Get the first DOMElement defined by the selector
- yo(selector).els() [ref](yaj-els) - Get all DOMElements defined by the selector
- yo(selector).els(n) [ref](yaj-els) - Get the n-nth DOMElement defined by the selector
- yo(selector).eq(n) [ref](yaj-eq) - Get the n-nth Yaj object defined by the selector;
- yo(selector).first() [ref](yaj-first) - Get the first node returned by the selector;
- yo(selector).last() [ref](yaj-last) - Get the last node returned by the selector;
- yo(selector).hasClass(class) [ref](yaj-hasclass) - Check if the selector has the class.
- yo(selector).isVisible() [ref](yaj-isvisible) - Return true if the selector is visible.
- yo(selector).exists() [ref](yaj-exists) - Return true if the selector exists (or was found)
- yo(selector).addClass(class) [ref](yaj-addclass) - Add a class to the selector
- yo(selector).removeClass [ref](yaj-removeclass) - Remove all classes from the selector
- yo(selector).removeClass(class) [ref](yaj-removeclass) - Remove a class from the selector
- yo(selector).toggleClass(class) [ref](yaj-toggleclass) - Add a class from the selector if it does not exists or remove otherwise
- yo(selector).toggle() [ref](yaj-toggle) - Alternate between show and hide
- yo(selector).show() [ref](yaj-show) - Make the selector visible
- yo(selector).hide() [ref](yaj-hide) - Make the selector invisible
- yo(selector).append(data) [ref](yaj-append) - Append a HTML or DOMElement to the selector
- yo(selector).appendTo(selector2) [ref](yaj-appendto) - Append the selector one to the selector two
- yo(selector).remove() [ref](yaj-remove) - Remove the DOM Elements defined by the selector
- yo(selector).isCollideWith(data) [ref](yaj-iscollidewith) - Return true if the object collides/overlaps the object referenced by data
- yo(selector).attr(property) [ref](yaj-attr) - Get the property value of the selector
- yo(selector).attr(property, value) [ref](yaj-attr) - Set the property value into the selector;
- yo(selector).attr(property, value, convertHtmlEntity) [ref](yaj-attr) - Set the property value converting HTML Entity into the selector;
- yo(selector).css(property) [ref](yaj-css) - Get the CSS style value of the selector
- yo(selector).css(property, value) [ref](yaj-css) - Set the CSS style value of the selector
- yo(selector).html() [ref](yaj-html) - Get the selector content as HTML
- yo(selector).html(data) [ref](yaj-html) - Set the content of the selector with data
- yo(selector).text() [ref](yaj-text) - Get the selector content as TEXT
- yo(selector).text(data) [ref](yaj-text) - Set the content of the selector with data without parse the HTML
- yo(selector).children(data) [ref](yaj-children) - Return the first level child nodes of the current selector.
- yo(selector).find(data) [ref](yaj-find) - Find some element from the current selector.
- yo(selector).on(event, fn) [ref](yaj-on) - Attach an event to an element
- yo(selector).bind(event, fn) [ref](yaj-bind) - Attach a custom event to an element
- yo(selector).trigger(event) [ref](yaj-trigger) - Trigger a custom event
- yo(selector).off() [ref](yaj-off) - Remove all events attached to the element
- yo(selector).offset() [ref](yaj-offset) - Get the offset of the selector
- yo(selector).scrollTo(to, duration) [ref](yaj-scrollto) - Scroll the object.
- yo(selector).fadeIn(ms) [ref](yaj-fade) - Fade in the element
- yo(selector).fadeOut(ms) [ref](yaj-fade) - Fade out the element
- Yaj.isElementInDocument(element) [ref](yaj-iselementindocument) - Return true if the element is attached to the document

## Yo Ajax Reference

- Yaj.get(url, data, success, error) [ref](yaj-request) - Make an ajax GET request
- Yaj.post(url, data, success, error) [ref](yaj-request) - Make an ajax POST request
- Yaj.request(options) [ref](yaj-request) - Make an ajax request. You can choose the method
- Yaj.getJson(url, data, success, error) [ref](yaj-request) - Make an ajax GET request and returns a JSON object.
- Yaj.postJson(url, data, success, error) [ref](yaj-request) - Make an ajax POST request and returns a JSON object.
- Yaj.getScript(src, func) [ref](yaj-getscript) - Load a javascript dynamically
- Yaj.loadCss(href, rel, type) [ref](yaj-loadcss) - Loads a CSS dynamically and append it to the document.

## Yo Polyfill replacement

Yaj creates polyfill replacement for important DOM implementations like:

- document.querySelector
- document.querySelectorAll
- window.localStorage (in this case the fallback is cookie which have some limitations about size and quantity)
- Element.prototype.matches()

If you add the `yaj.js` or `yaj.min.js` to your page, you can instantly use this implementations. The code below will
work in the most modern browsers but also in browsers like IE8 and even IE7.

```html
<head>
    <script src="yaj.js"></script>
</head>

<script>
localStorage.setItem('key', 'value');
console.log(localStorage.getItem('key'));
</script>
```

## Yo Polyfill Utilities functions

- yoXhr() [ref](yaj-yoxhr) - Return a XmlHTTPRequest object for your current environment/browser;
- yoIsFunction(object) [ref](yaj-yois) - Check if the object is a function.
- yoIsWindow(object) [ref](yaj-yois) - Check if the object is the Window.
- yoIsArray(object) [ref](yaj-yois) - Check if the object is an Array.
- yoIsDocument(object) [ref](yaj-yois) - Check if the object is the HTMLDocument element.
- yoIsHtmlElement(object) [ref](yaj-yois) - Check if the object is a HTMLElement.
- yoIsYaj(object) [ref](yaj-yois) - Check if the object is an Yaj object
- yoIs(objectToCheck, type) [ref](yaj-yois) - Check if the object is of the defined type.
- yoCopy(source, dest) [ref](yaj-yocopy) - Copy the attributes from one object to another.
- yoClone(object) [ref](yaj-yoclone) - Clone an object;
- yoGetParameter(name) [ref](yaj-yogetparameter) - Get the value of the query parameter name;

## Yaj is FAST

Yaj is faster than jQuery. See [here](benchmark) the benchmark tests

## FAQ

[Click here](faq)

----
[Open source ByJG](http://opensource.byjg.com)
