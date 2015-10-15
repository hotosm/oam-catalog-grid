#!/usr/bin/env bash

# Usage:
# curl api.openaerialmap.org/meta | ./build_grid.sh PREFIX
#
# Will put tiles at:
# s3://oam-catalog-grid/PREFIX/{z}/{x}/{y}.pbf

# exit on error
set -e

export BASE_ZOOM=12
MBTILES=temp/footz${BASE_ZOOM}.mbtiles

# use tippecanoe to build the base layer from footprint features
mkdir -p temp
cat - | node read-catalog.js | tippecanoe -l footprints -f -o $MBTILES -z $BASE_ZOOM -Z $BASE_ZOOM -b 0 -ps

# build the grid
node index.js $MBTILES $1
