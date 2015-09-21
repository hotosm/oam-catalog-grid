var pumpify = require('pumpify')
var parse = require('JSONStream').parse
var fc = require('geojson-stream').stringify

function parseCatalog () {
  var id = 0
  var featureStream = parse(['results', true], function (foot) {
    return {
      type: 'Feature',
      properties: {
        gsd: foot.gsd,
        tms: !!foot.properties.tms,
        acquisition_end: foot.acquisition_end,
        FID: id++
      },
      geometry: foot.geojson
    }
  })
  return pumpify(featureStream, fc())
}

module.exports = parseCatalog

if (require.main === module) {
  process.stdin.pipe(parseCatalog()).pipe(process.stdout)
}
