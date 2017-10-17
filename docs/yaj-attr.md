## yo(selector).attr(property) 

Get the property value of the selector

```javascript
// get the property src from .myclass
var prop = yo('.myclass').attr('src');
```

## yo(selector).attr(property, value) 

Set the property value into the selector;

```javascript
// set the value '/image.png' to property 'src'
yo('.myclass').attr('src', '/image.png');
```

## yo(selector).attr(property, value, convertHtmlEntity) 

If the value "convertHtmlEntity" is set to "true" then Yaj will try convert 
the html entity values into the proper value in the current code page

```javascript
// The example below will set 'f&eacute;' in the input value; 
yo('input').attr('value', 'f&eacute;')

// But this example will set 'fé' in the input value; 
yo('input').attr('value', 'ok&aacute;', true)
```

Go to [index](index.md)