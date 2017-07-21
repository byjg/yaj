## yo(selector).append(data)

Append a element or string to the element.  

```javascript
// Add a string HTML 
yo('.myclass').append('<div>teste</div>');

// Add another yaj element.
yo('.myclass').append(yo('.other'));

// Add HTML5 Element
yo('.myclass').append(document.body);
yo('.myclass').append(document.getElementById('element'));
```

Go to [index](index.md)