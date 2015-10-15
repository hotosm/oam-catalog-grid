var path = require('path')
var vtGrid = require('vt-grid')

var basezoom = process.env.BASE_ZOOM || 11
var gridsize = 1024
var key = process.argv[3]

var output = 's3://oam-catalog-grid/' + key + '/{z}/{x}/{y}.pbf'
// var output = 'mbtiles://' + path.resolve('out.mbtiles')

if (process.argv.length < 4) {
  console.log(process.argv[0], process.argv[1], 'path/to/mbtiles.mbtiles', 'path/in/bucket')
  process.exit(1)
}

console.log('Building first layer')
vtGrid({
  gridsize: gridsize,
  input: 'mbtiles://' + path.resolve(process.cwd(), process.argv[2]),
  output: output,
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
    input: output,
    output: output,
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
