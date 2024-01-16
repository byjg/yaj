# yo(selector).el()

Retrieve the HTML Element defined by the selector. 

If selector does not exists returns null;

If selector returns more than one, only the first will be returned.

```javascript
yo('.myclass').el().clientWidth;
yo('.myclass').el(n).clientWidth;  // return the n-nth element.
```

Go to [index](toc.md)