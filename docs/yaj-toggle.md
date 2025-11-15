---
sidebar_position: 13
---

# yo(selector).toggle()

## yo(selector).toggle()

Show the element if it is visible or hide if not.

```html
<div class="myclass"></div>
```

```javascript
// Hide the element
yo('.myclass').toggle();

// call it again to show it
yo('.myclass').toggle();
```

## yo(selector).toggle(callback)

The callback function will fired **once** only after the "toggle" action is ended.

```javascript
yo('.myclass'.toggle(function () {
    // do something
}))
```