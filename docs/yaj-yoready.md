---
sidebar_position: 1
---

# yoReady(fn)

The ready method makes sure that code is only executed when all DOM elements are safe to be manipulated.

```javascript
yoReady(function () {
    console.log('Fired only when the document is ready');
})
```