# Yaj - Yet Another jQuery Replacement

## Basic usage

The Yaj library like jQuery and Zepto exposes the "yo" instead "$".
 
"yo" requires a selector and all methods are based on the element (or elements) returned.

```javascript
yo('selector').addClass('my-class');
```

The selector can be all valid HTML5:

- ID (#name)
- Class (.name)
- Sequences ("#name #name2" OR ".name .name2" OR ".name #name2" and others)
- More than one on the same object (".name.name2")
- HTML Elements ("p", "div", etc)
- HTML Document (document)
- Window (window)

You can call more than one method in sequence:

```javascript
yo('selector').removeClass('oneclass').addClass('otherclass');
```

## Installation

By adding to your browser "yaj.min.js" or through "npm" or "yarn add yaj"

## Yo Reference

- yo(selector).el() [ref](yaj-el.md) - Get the DOMElement defined by the selector
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
- yo(selector).attr(property) [ref](yaj-attr.md) - Get the property value of the selector
- yo(selector).attr(property, value) [ref](yaj-attr.md) - Set the property value into the selector;
- yo(selector).css(property) [ref](yaj-css.md) - Get the CSS style value of the selector
- yo(selector).css(property, value) [ref](yaj-css.md) - Set the CSS style value of the selector
- yo(selector).html() [ref](yaj-html.md) - Get the selector as HTML
- yo(selector).html(data) [ref](yaj-html.md) - Set the content of the selector with data
- yo(selector).on(event, fn) [ref](yaj-on.md) - Defines an event 
- yo(selector).offset() [ref](yaj-offset.md) - Get the offset of the selector
- yo().get(url, data, success, error) [ref](yaj-request.md) - Make an ajax GET request
- yo().post(url, data, success, error) [ref](yaj-request.md) - Make an ajax POST request
- yo().request(method, url, data, success, error) [ref](yaj-request.md) - Make an ajax request. You can choose the method  
- yo().getJson(url, data, success, error) [ref](yaj-request.md) - Make an ajax GET request and returns a JSON object.
- yo().postJson(url, data, success, error) [ref](yaj-request.md) - Make an ajax POST request and returns a JSON object.
- yo().getScript(src, func) [ref](yaj-getscript.md) - Load a javascript
- yo(selector).scrollTo(to, duration) [ref](yaj-scrollto.md) - Scroll the object.
- yo(selector).fadeIn(ms) [ref](yaj-fade.md) - Fade in the element
- yo(selector).fadeOut(ms) [ref](yaj-fade.md) - Fade out the element


## Utilities functions

- yoXhr() [ref](yaj-yoxhr.md) - Return a XmlHTTPRequest object for your current environment/browser;
- yoIsFunction(object) [ref](yaj-yois.md) - Check if the object is a function. 
- yoIsWindow(object) [ref](yaj-yois.md) - Check if the object is the Window.
- yoIsArray(object) [ref](yaj-yois.md) - Check if the object is an Array.
- yoIsDocument(object) [ref](yaj-yois.md) - Check if the object is the HTMLDocument element.
- yoIsHtmlElement(object) [ref](yaj-yois.md) - Check if the object is a HTMLElement.
- yoIs(objectToCheck, type) [ref](yaj-yois.md) - Check if the object is of the defined type.

## FAQ

[Click here](faq.md)
