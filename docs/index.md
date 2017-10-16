# Yaj.js - Yet Another jQuery Replacement

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

Yaj is also lightweigth. Yaj have less than 18kb uncompressed, 8kb minified and **3kb minified and gzipped**. 

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

### CDN

#### Latest version

```html
<script src="https://unpkg.com/yaj/yaj.min.js" />
```

#### Specific version
 
```html
<script src="https://unpkg.com/yaj@0.1.9/yaj.min.js" />
```


## Yo Dom Manipulation Reference

- yo(selector).el() [ref](yaj-el.md) - Get the DOMElement defined by the selector
- yo(selector).els() [ref](yaj-els.md) - Get all DOMElements defined by the selector
- yo(selector).els(n) [ref](yaj-els.md) - Get the n-nth DOMElement defined by the selector
- yo(selector).eq(n) [ref](yaj-eq.md) - Get the n-nth Yaj object defined by the selector;
- yo(selector).hasClass(class) [ref](yaj-hasclass.md) - Check if the selector has the class.
- yo(selector).isVisible() [ref](yaj-isvisible.md) - Return true if the 'selector exists.
- yo(selector).addClass(class) [ref](yaj-addclass.md) - Add a class to the selector
- yo(selector).removeClass [ref](yaj-removeclass.md) - Remove all classes from the selector
- yo(selector).removeClass(class) [ref](yaj-removeclass.md) - Remove a class from the selector
- yo(selector).toggleClass(clsss) [ref](yaj-toggleclass.md) - Add a class from the selector if it does not exists or remove otherwise
- yo(selector).toggle() [ref](yaj-toggle.md) - Alternate between show and hide
- yo(selector).show() [ref](yaj-show.md) - Make the selector visible
- yo(selector).hide() [ref](yaj-hide.md) - Make the selector invsible
- yo(selector).append(data) [ref](yaj-append.md) - Append a HTML or DOMElement to the selector
- yo(selector-one).appendTo(selector-two) [ref](yaj-appendto.md) - Append the selector one to the selector two
- yo(selector).remove() [ref](yaj-remove.md) - Remove the DOM Elements defined by the selector
- yo(selector).isCollideWith(data) [ref](yaj-iscollidewith.md) - Return true if the object collides/overlaps the object referenced by data
- yo(selector).attr(property) [ref](yaj-attr.md) - Get the property value of the selector
- yo(selector).attr(property, value) [ref](yaj-attr.md) - Set the property value into the selector;
- yo(selector).css(property) [ref](yaj-css.md) - Get the CSS style value of the selector
- yo(selector).css(property, value) [ref](yaj-css.md) - Set the CSS style value of the selector
- yo(selector).html() [ref](yaj-html.md) - Get the selector as HTML
- yo(selector).html(data) [ref](yaj-html.md) - Set the content of the selector with data
- yo(selector).on(event, fn) [ref](yaj-on.md) - Defines an event 
- yo(selector).offset() [ref](yaj-offset.md) - Get the offset of the selector
- yo(selector).scrollTo(to, duration) [ref](yaj-scrollto.md) - Scroll the object.
- yo(selector).fadeIn(ms) [ref](yaj-fade.md) - Fade in the element
- yo(selector).fadeOut(ms) [ref](yaj-fade.md) - Fade out the element

## Yo Ajax Reference

- yo().get(url, data, success, error) [ref](yaj-request.md) - Make an ajax GET request
- yo().post(url, data, success, error) [ref](yaj-request.md) - Make an ajax POST request
- yo().request(options) [ref](yaj-request.md) - Make an ajax request. You can choose the method  
- yo().getJson(url, data, success, error) [ref](yaj-request.md) - Make an ajax GET request and returns a JSON object.
- yo().postJson(url, data, success, error) [ref](yaj-request.md) - Make an ajax POST request and returns a JSON object.
- yo().getScript(src, func) [ref](yaj-getscript.md) - Load a javascript

## Yo Polyfill replacement

Yaj creates polyfill replacement for important DOM implementations like:

- document.querySelector
- document.querySelectorAll
- window.localStorage (in this case the fallback is cookie which have some limitations about size and quantity)

If you add the `yaj.js` or `yaj.min.js` to your page, you can instantly use this implementations. The code below will
work in the most modern broswers but also in browsers like IE8 and even IE7. 

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

- yoXhr() [ref](yaj-yoxhr.md) - Return a XmlHTTPRequest object for your current environment/browser;
- yoIsFunction(object) [ref](yaj-yois.md) - Check if the object is a function. 
- yoIsWindow(object) [ref](yaj-yois.md) - Check if the object is the Window.
- yoIsArray(object) [ref](yaj-yois.md) - Check if the object is an Array.
- yoIsDocument(object) [ref](yaj-yois.md) - Check if the object is the HTMLDocument element.
- yoIsHtmlElement(object) [ref](yaj-yois.md) - Check if the object is a HTMLElement.
- yoIsYaj(object) [ref](yaj-yois.md) - Check if the object is an Yaj object
- yoIs(objectToCheck, type) [ref](yaj-yois.md) - Check if the object is of the defined type.
- yoCopy(source, dest) [ref](yaj-yocopy.md) - Copy the attributes from one object to another.
- yoClone(object) [ref](yaj-yoclone.md) - Clone an object;
- yoGetParameter(name) [ref](yaj-yogetparameter.md) - Get the value of the query parameter name;

## Yaj is FAST

Yaj is faster than JQuey. See [here](benchmark.md) the benchmark tests

## FAQ

[Click here](faq.md)
