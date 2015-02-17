var test = require('tape');
var filter = require('./');
var featureCollection = require('turf-featurecollection');
var point = require('turf-point');

test('remove', function(t){
  t.plan(2);

  var points = featureCollection(
    [point([1,2], {team: 'Red Sox'}),
    point([2,1], {team: 'Yankees'}),
    point([3,1], {team: 'Nationals'}),
    point([2,2], {team: 'Yankees'}),
    point([2,3], {team: 'Red Sox'}),
    point([4,2], {team: 'Yankees'})]);

  newFC = filter(points, 'team', 'Nationals');

  t.equal(newFC.features.length, 1, 'should filter all but 1 feature');
  t.equal(newFC.features[0].properties.team, 'Nationals', 'feature team property should be Nationals');
});

test('supports key-based complex filtering', function(t) {
  var features = featureCollection([
    point([1, 1], {elevation: 100}),
    point([2, 2], {elevation: 200}),
    point([3, 3], {elevation: 300}),
    point([4, 4], {elevation: 400}),
    point([5, 5], {elevation: 500})
  ]);

  // We still use the 'key' argument, and the value of that property for each feature
  // is passed into the filter callback.
  newFC = filter(features, 'elevation', function(elev) {
    return elev > 200 && elev < 400;
  });

  t.equal(newFC.features.length, 1, 'should filter all but 1 feature');
  t.equal(newFC.features[0].properties.elevation, 300, 'elevation should be 300');
  t.end();
});

test('supports complex filtering with access to all properties', function (t) {
  var features = featureCollection([
    point([1, 1], {elevation: 100, accuracy: 0.8}),
    point([2, 2], {elevation: 200, accuracy: 0.9}),
    point([3, 3], {elevation: 300, accuracy: 0.7}),
    point([4, 4], {elevation: 400, accuracy: 0.9}),
    point([5, 5], {elevation: 500, accuracy: 0.8})
  ]);

  // In cases where we need to filter by more than one key, no 'key'
  // argument is used, and the callback receives all properties (as well as
  // the feature itself, just in case it's needed)
  newFC = filter(features, function(props, feature) {
    return props.elevation > 200 && props.accuracy >  0.8;
  });

  t.equal(newFC.features.length, 1, 'should filter all but 1 feature');
  t.equal(newFC.features[0].properties.elevation, 400, 'elevation should be 400');
  t.equal(newFC.features[0].properties.accuracy, 0.9, 'accuracy should be 0.9');

  t.end();
});
