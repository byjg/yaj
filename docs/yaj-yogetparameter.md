## yoGetParameter(name)

Get the value of the query parameter 'name'.

If the page was called:

```
http://yoursite.com/page?query1=test&query2=anothertest
```

You can retrive using:

```javascript
var q = yoGetParameter('query1'); // Will return 'test'
var t = yoGetParameter('query2'); // will retorn 'anothertest'
```

Go to [index](index.md)