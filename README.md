# Yaj.js
[![](https://data.jsdelivr.com/v1/package/npm/yaj/badge?style=rounded)](https://www.jsdelivr.com/package/npm/yaj)
[![](https://readthedocs.org/projects/yaj/badge/?version=latest)](https://yaj.readthedocs.io/)
[![npm](https://img.shields.io/npm/v/yaj.svg)](http://opensource.byjg.com/yaj)
[![Build Status](https://travis-ci.org/byjg/yaj.svg?branch=master)](https://travis-ci.org/byjg/yaj)
[![Documentation Status](https://readthedocs.org/projects/yaj/badge/?version=latest)](http://yaj.readthedocs.io/en/latest/?badge=latest)


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

The documentation is hosted on Read the Docs at [yaj.readthedocs.io](http://yaj.readthedocs.io)

