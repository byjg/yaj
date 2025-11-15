---
sidebar_position: 35
---

# Yaj.getScript(src, func)

Loads a JavaScript dynamically. If successfully loaded call func.

```javascript
Yaj.getScript(
    'http://someurl/file.js',
    function () {
        console.log('Success!');
    }
);
```