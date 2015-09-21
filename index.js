var path = require('path')
var vtGrid = require('vt-grid')

console.log('Building first layer')
vtGrid({
  gridsize: 64,
  input: 'mbtiles://' + path.resolve(process.cwd(), process.argv[2]),
  minzoom: 9,
  basezoom: 10,
  aggregations: __dirname + '/first-layer.js',
  postAggregations: __dirname + '/first-layer.js'
}, function (err) {
  if (err) {
    console.log(err, err.stack)
    console.trace(err)
    throw err
  }
  console.log('Finished first layer.')
  vtGrid({
    input: 'mbtiles://' + path.resolve(process.cwd(), process.argv[2]),
    minzoom: 1,
    basezoom: 9,
    aggregations: __dirname + '/grid-layers.js',
    postAggregations: __dirname + '/grid-layers.js'
  }, function (err) {
    if (err) { throw err }
    console.log('Finished!')
  })
})
