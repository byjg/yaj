---
sidebar_position: 27
---

# yo(selector).bind(event, fn)

Attach a custom event to the selector. Different from [yo(selector).on()](yaj-on.md),
this event must by triggered by the method [yo(selector).trigger()](yaj-trigger.md).

See the example:

```javascript
var myObj = yo('.myClass');

myObj.bind('some-user-event', function (e) {
    console.log('Triggered');
});

// Trigger the event:
myObj.trigger('some-user-event');
```