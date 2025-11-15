---
sidebar_position: 38
---

# yoIs()

## yoIs(objectToCheck, type)

yoIs() is a function (not object) and can check any type of object.
Return true, if the object is the type expected, and false otherwise.

There are a several shortcuts for use it, as see below.

## yoIsFunction(object)

Check if the object is a function.
This is a shortcut for `yoIs(object, 'Function')`;

```javascript
if (yoIsFunction(object)) {
    // do something
}
```

## yoIsWindow(object)

Check if the object is the HTML window.
This is a shortcut for `yoIs(object, 'Window')`;

```javascript
if (yoIsWindow(object)) {
    // do something
}
```

## yoIsArray(object)

Check if the object is an Array.
This is a shortcut for `yoIs(object, 'Array')`;

```javascript
if (yoIsArray(object)) {
    // do something
}
```

## yoIsDocument(object)

Check if the object is the HTMLDocument.
This is a shortcut for `yoIs(object, 'HTML.*Document')`;

```javascript
if (yoIsDocument(object)) {
    // do something
}
```

## yoIsHtmlElement(object)

Check if the object is a HTMLElement.
This is a shortcut for `yoIs(object, 'HTML.*Element')`;

```javascript
if (yoIsHtmlElement(object)) {
    // do something
}
```

## yoIsYaj(object)

Check if the object is a Yaj object.
This is a shortcut for `yoIs(object, 'Yaj')`;

```javascript
if (yoIsYaj(object)) {
    // do something
}
```