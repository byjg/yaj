---
sidebar_position: 4
---

# yo(selector).eq(n)

Retrieve the n-nth Yaj object defined by the selector.

If selector does not exists or if it is higher than the last one it will return null;

`0 <= n < length`

```javascript
yo('p').eq(2).html('changed only the third');
```