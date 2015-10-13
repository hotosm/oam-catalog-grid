var path = require('path')
var vtGrid = require('vt-grid')

var basezoom = 13
var gridsize = 64
var key = 'tiles-test1'

console.log('Building first layer')
vtGrid({
  gridsize: gridsize,
  input: 'mbtiles://' + path.resolve(process.cwd(), process.argv[2]),
  output: 's3://oam-catalog-grid/' + key + '/{z}/{x}/{y}.pbf',
  minzoom: basezoom - 1,
  basezoom: basezoom,
  aggregations: __dirname + '/first-layer.js',
  postAggregations: __dirname + '/first-layer.js'
}, function (err, nextTiles) {
  if (err) {
    console.log(err, err.stack)
    console.trace(err)
    throw err
  }
  console.log('Finished first layer.')
  vtGrid({
    input: 's3://oam-catalog-grid/' + key + '/{z}/{x}/{y}.pbf',
    output: 's3://oam-catalog-grid/' + key + '/{z}/{x}/{y}.pbf',
    inputTiles: nextTiles,
    minzoom: 1,
    basezoom: basezoom - 1,
    aggregations: __dirname + '/grid-layers.js',
    postAggregations: __dirname + '/grid-layers.js'
  }, function (err) {
    if (err) { throw err }
    console.log('Finished!')
  })
})
