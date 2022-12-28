# Yaj.js

[![Build Status](https://github.com/byjg/yaj/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/byjg/yaj/actions/workflows/build.yml)
[![Opensource ByJG](https://img.shields.io/badge/opensource-byjg-success.svg)](http://opensource.byjg.com)
[![GitHub source](https://img.shields.io/badge/Github-source-informational?logo=github)](https://github.com/byjg/yaj/)
[![GitHub license](https://img.shields.io/github/license/byjg/yaj.svg)](https://opensource.byjg.com/opensource/licensing.html)
[![GitHub release](https://img.shields.io/github/release/byjg/yaj.svg)](https://github.com/byjg/yaj/releases/)
[![](https://data.jsdelivr.com/v1/package/npm/yaj/badge)](https://www.jsdelivr.com/package/npm/yaj)

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

## Testing

```shell
yarn test
```

## Documentation

[opensource.byjg.com/js/yaj](https://opensource.byjg.com/js/yaj/)

----
[Open source ByJG](http://opensource.byjg.com)
