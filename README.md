turf-filter
===========
[![Build Status](https://travis-ci.org/Turfjs/turf-filter.svg)](https://travis-ci.org/Turfjs/turf-filter)

Keeps any features from a feature collection that match a property value.

###Install

```sh
npm install turf-filter
```

###Parameters

|name|description|
|---|---|
|fc|A FeatureCollection|
|property|Property to check|
|value|Value for features to keep|

###Usage

```js
filter(fc, property, value)
```

###Example

```js
var filter = require('turf-filter')
var point = require('turf-point')
var featurecollection = require('turf-featurecollection')

var trees = featurecollection([
	  point(1,2, {species: 'oak'}),
	  point(2,1, {species: 'birch'}),
	  point(3,1, {species: 'oak'}),
	  point(2,2, {species: 'redwood'}),
	  point(2,3, {species: 'maple'}),
	  point(4,2, {species: 'oak'})
  ])

var filtered = filter(trees, 'species', 'oak')
  
console.log(filtered)
```