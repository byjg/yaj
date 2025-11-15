---
sidebar_position: 33
---

# Yaj.isElementInDocument(element)

Return true if the element is attached to the document or false otherwise.

```javascript
var newElement = yo('<div>').attr('id', 'myId');

// The code below will return false, because the element is detached
Yaj.isElementInDocument(newElement);

// The code below will return true:
yo('.someselector').append(newElement);
Yaj.isElementInDocument(yo('#myId'));
```