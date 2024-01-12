# yo(selector).fadeIn()/.fadeOut()

## yo(selector).fadeIn(ms) 

Fade in (show) the element taking "ms" mileseconds 

```javascript
yo('.myclass').fadeIn(1000);
```

## yo(selector).fadeIn(ms, callback)

The callback function will fired **once** only after the "fadeIn" action is ended.

```javascript
yo('.myclass'.fadeIn(500, function () {
    // do something
}))
```

## yo(selector).fadeOut(ms) 

Fade out (hide) the element taking "ms" mileseconds 

```javascript
yo('.myclass').fadeOut(1000);
```

## yo(selector).fadeOut(ms, callback)

The callback function will fired **once** only after the "fadeOut" action is ended.

```javascript
yo('.myclass'.fadeOut(500, function () {
    // do something
}))
```

Go to [index](index.md)