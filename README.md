# Tooltips for Chartist.js

NPM package: https://www.npmjs.com/package/chartist-logscale-plugin-tooltips
Supported all types of charts.

## Available options and their defaults

```javascript
var defaultOptions = {
  class: undefined, // accecpts 'class1', 'class1 class2', etc.
  tooltipFnc: undefined //accepts function
};
```

## Sample usage in Chartist.js

`npm i chartist-logscale-plugin-tooltips --save`

With descriptive text:
```js
var chart = new Chartist.Line('.ct-chart', {
  labels: [1, 2, 3],
  series: [
    [
      {meta: 'description', value: 1},
      {meta: 'description', value: 5},
      {meta: 'description', value: 3}
    ],
    [
      {meta: 'other description', value: 2},
      {meta: 'other description', value: 4},
      {meta: 'other description', value: 2}
    ]
  ]
}, {
  plugins: [
    Chartist.plugins.tooltip()
  ]
});
```