# yo(selector).appendTo(selector2)

Append the element defined by the selector to the element defined by selector2.  

**Append one element to another:**

```html
<div id="one">one</div>
<div id="two"></div>

<script>
yo('#one').appendTo(yo('#two'));
// or just
// yo('#one').appendTo('#two');
</script>
```

**Create element and append to another** 

```javascript
yo('<span>text</span>').appendTo('#someElement');
```

Go to [index](toc.md)