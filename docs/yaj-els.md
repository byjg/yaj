# yo(selector).els()

## yo(selector).els()

Retrieve all the HTML Elements defined by the selector. 

If selector does not exists returns null;

```javascript
var elements = yo('.myclass').els();
console.log(elements.length);
```

## yo(selector).els(n)

Retrieve the n-nth HTML Element defined by the selector. 

If the n-nth does not exists or if it is higher than the last one it will return null;

`0 <= n < length`

```javascript
yo('.myclass').els(3).clientWidth;
```


Go to [index](index.md)