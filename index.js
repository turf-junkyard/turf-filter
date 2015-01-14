var featureCollection = require('turf-featurecollection');

/**
 * Filters a {@link FeatureCollection} by a  property key-value combination
 *
 * @module turf/filter
 * @param {FeatureCollection} features
 * @param {string} key the key in a feature's properties property
 * @param {string} value the desired value of that property
 * @return {FeatureCollection} a filtered collection with only features that match.
 * @example
 * var trees = turf.featurecollection([
 *  turf.point(1,2, {species: 'oak'}),
 *  turf.point(2,1, {species: 'birch'}),
 *  turf.point(3,1, {species: 'oak'}),
 *  turf.point(2,2, {species: 'redwood'}),
 *  turf.point(2,3, {species: 'maple'}),
 *  turf.point(4,2, {species: 'oak'})
 * ]);
 * //=trees
 * var filtered = turf.filter(trees, 'species', 'oak');
 * //=filtered
*/
module.exports = function(collection, key, val) {
  var newFC = featureCollection([]);
  for(var i = 0; i < collection.features.length; i++) {
    if(collection.features[i].properties[key] === val) {
      newFC.features.push(collection.features[i]);
    }
  }
  return newFC;
};
