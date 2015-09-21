var filters = require('oam-browser-filters')
var aggregate = require('geojson-polygon-aggregate')

var d
module.exports = d = {
  aggregations: {
    footprints: {}
  },
  postAggregations: {
    footprints: {}
  }
}

filters.getAllCombinations().forEach(function (combo) {
  d.aggregations.footprints[combo.key] = aggregate.union(combo.key)
  d.postAggregations.footprints[combo.key + '_count'] = function (feature) {
    var val = feature.properties[combo.key]
    try {
      return val ? JSON.parse(val).length : 0
    } catch (e) { return 0 }
  }
})

