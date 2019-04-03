# Dynamic graph renderer for tallbags

## Proof of concept

Use this sink as a replacement for `forEach`, and it will automatically dump a graph visualization on the DOM that updates as the tallbag chain delivers data. Hacky implementation.

## Example use

```js
const forEach = require('tallbag-for-each-poc-dynamic-graph');

pipe(
  combine(interval(1000), interval(1500)),
  map(([x, y]) => `a${x} b${y}`),
  take(5),
  forEach(console.log)
);
```



