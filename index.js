var featureCollection = require('turf-featurecollection');

/**
 * Filters a {@link FeatureCollection} by a  property key-value combination
 *
 * @module turf/filter
 * @param {FeatureCollection} features input FeatureCollection
 * @param {String} key the property on which to filter
 * @param {String} value the value of that property on which to filter
 * @return {FeatureCollection} a filtered collection with only features that match input `key` and `value`
 * @example
 * var trees = turf.featurecollection([
 *  turf.point([-72.581777, 44.260875], {species: 'oak'}),
 *  turf.point([-72.570018, 44.260691], {species: 'birch'}),
 *  turf.point([-72.576284, 44.257925], {species: 'oak'}),
 *  turf.point([-72.56916, 44.254605], {species: 'redwood'}),
 *  turf.point([-72.581691, 44.24858], {species: 'maple'}),
 *  turf.point([-72.583837, 44.255773], {species: 'oak'})
 * ]);
 *
 * var filtered = turf.filter(trees, 'species', 'oak');
 *
 * //=trees
 *
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
