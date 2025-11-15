---
sidebar_position: 22
---

# yo(selector).html()

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
yo('.myclass').html('<b>text</b>');
```