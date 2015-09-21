var fs = require('fs')
var test = require('tape')
var aggregate = require('geojson-polygon-aggregate')
var features = require('geojson-stream').parse
var catalog = require('../read-catalog')
var aggs = require('../first-layer')

test(function (t) {
  fs.createReadStream(__dirname + '/fixture/catalog.json')
  .pipe(catalog())
  .pipe(features())
  .pipe(aggregate(aggs.aggregations.footprints))
  .on('data', function (results) {
    var expected = JSON.parse(fs.readFileSync(__dirname + '/fixture/aggregated.json'))
    t.same(results, expected)
    t.end()
  })
})
