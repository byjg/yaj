## yo(selector).text() 

Get the selector content as TEXT


```html
<div class="myclass"><span class="title">Some Text</span></div>
```

```javascript
// Will return "Some Text"
var content = yo('.myclass').text();
```

## yo(selector).text(data) 

Set the content of the selector with data without parse the HTML

```javascript
// Will set only the text "<p>Other Text</p>" without parse the HTML
yo('.myclass').text('<p>Other Text</p>');
```

Go to [index](index.md)