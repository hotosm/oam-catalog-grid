#!/usr/bin/env bash

# Usage
# cat catalog.json | ./build_grid.sh

# exit on error
set -e

# use tippecanoe to build the base layer from footprint features
mkdir -p temp
rm -f temp/footz.mbtiles
cat - | node read-catalog.js | tippecanoe -l footprints -o temp/footz.mbtiles -z 10 -Z 10 -b 0 -ps

# use tilelive-copy to copy over this tile set, because tippecanoe output
# doesn't play perfectly with node-mbtiles
node_modules/.bin/tilelive-copy temp/footz.mbtiles $1

# build the grid
node index.js $1
