# yo(selector).bind(event, fn) 

Attach a custom event to the selector. Different from the yo(selector).on()[ref](yaj-on.md)
this event must by triggered by the method yo(selector).trigger()[ref](yaj-trigger.md).

See the example:

```javascript
var myObj = yo('.myClass');

myObj.bind('some-user-event', function (e) {
    console.log('Triggered');
});

// Trigger the event:
myObj.trigger('some-user-event');
```


Go to [index](index.md)