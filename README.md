# Yaj 

## Description

Yaj is a achronymous of "Yet Another jQuery Replacement". This intend to be a very lightweigth script 
(less than 3kb minified and gzipped) and have the most used jQuery methods as a polyfill class supporting 
since IE6 to the modern browsers. 

This is not intended to fully replace or even to be compatible with jQuery and Zepto. 
But can be used to avoid conflits with previous jQuery implementations or as an alternative.  
 
Yaj main class is not "$" or "_". Instead we use "yo" (because yaj is also spin quickly in a pirouette and then snap 
and point at a person, uttering the greeting, "yo.")

For example:

```javascript
yo('#some .selector').addClass('class').removeClass('otherclass').show();
```

## Documentation

See the page [docs](docs/README.md) for a detailed documentation about yaj class.

