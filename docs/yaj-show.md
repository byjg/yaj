---
sidebar_position: 14
---

# yo(selector).show()

## yo(selector).show()

Show the element. If it is visible does nothing.

```javascript
// Show the element
yo('.myclass').show();
```

## yo(selector).show(callback)

The callback function will fired **once** only after the "show" action is ended.

```javascript
yo('.myclass').show(function () {
    // do something
})
```