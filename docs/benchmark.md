---
sidebar_position: 42
---

# Benchmarking

Yaj is faster than jQuery on query select elements.

For the benchmark tests we use the node.js package "[benchmark](https://www.npmjs.com/package/benchmark)".

## QuerySelector

Code for test:

```javascript
var suite = new Benchmark.Suite;

// add tests
suite.add('Yaj', function() {
  yo("#main ul:first-child").css('display', 'none');
  teardown();
})
.add('Yaj 2', function() {
  var el = yo("#main ul:first-child").el(0).style.display = 'none';
  teardown();
})
.add('document.querySelector', function() {
  var el = document.querySelector("#main ul:first-child");
  el.style.display = 'none';
  teardown();
})
.add('jQuery', function() {
  $("#main ul:first-child").css('display', 'none');
  teardown();
})
```

Test results:

**Chrome**

- Environment: Linux
- Version: 58.0.3029.81 (64-bit)
- Results:

```
Yaj x 86,428 ops/sec ±5.33% (52 runs sampled)
Yaj 2 x 100,793 ops/sec ±5.13% (54 runs sampled)
document.querySelector x 510,361 ops/sec ±0.86% (58 runs sampled)
jQuery x 70,284 ops/sec ±1.14% (59 runs sampled)
```

The native querySelector is the fastest and the Yaj is the second on line.

**Firefox**

- Environment: Linux
- Version: 56.0 (64-bit)
- Results:

```
Yaj x 59,225 ops/sec ±1.77% (59 runs sampled)
Yaj 2 x 59,725 ops/sec ±0.53% (63 runs sampled)
document.querySelector x 92,737 ops/sec ±1.64% (59 runs sampled)
jQuery x 37,486 ops/sec ±1.43% (59 runs sampled)
Fastest is document.querySelector
```

The native querySelector is the fastest and the Yaj is the second on line.
