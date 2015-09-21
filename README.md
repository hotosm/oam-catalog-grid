# oam-catalog-grid

Generate a vector tile grid from the OAM catalog

## Install

Install [tippecanoe](https://github.com/mapbox/tippecanoe).
Run
    npm install

## Usage

    curl api.openaerialmap.org | ./build_grid.sh oam-grid.mbtiles

Builds a set of vector tiles `oam-grid.mbtiles`, which can be uploaded to
Mapbox at https://mapbox.com/studio
