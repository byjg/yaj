## yo(selector).html() 

Get the selector content as HTML


```html
<div class="myclass"><span class="title"></span></div>
```

```javascript
// Will return <span class="title"></span>
var content = yo('.myclass').html();
```

## yo(selector).html(data) 

Set the content of the selector with data

```javascript
// call it again remove the class "name"
yo('.myclass').html('<b>text</b>');
```

Go to [index](index.md)