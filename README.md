# southparkjs
An unofficial library/API for southpark.cc.com

## Installation
1. Using npm
`npm install southpark`

## Usage
southparkjs gives global `southpark` variable.
```
southpark.episodes(function(places){
	console.log(places);
});
```
Gives
```
[
  { wikilink: '/wiki/Cartman_Gets_an_Anal_Probe',
    name: 'Cartman Gets an Anal Probe' },
  { wikilink: '/wiki/Weight_Gain_4000', name: 'Weight Gain 4000' },
  { wikilink: '/wiki/Volcano', name: 'Volcano' },
  { wikilink: '/wiki/Big_Gay_Al%27s_Big_Gay_Boat_Ride',
    name: 'Big Gay Al\'s Big Gay Boat Ride' },
  { wikilink: '/wiki/An_Elephant_Makes_Love_to_a_Pig',
    name: 'An Elephant Makes Love to a Pig' },
  { wikilink: '/wiki/Death_(episode)', name: 'Death (episode)' },
  { wikilink: '/wiki/Pinkeye', name: 'Pinkeye' },
  { wikilink: '/wiki/Damien', name: 'Damien' },
  { wikilink: '/wiki/Starvin%27_Marvin_(episode)',
    name: 'Starvin\' Marvin (episode)' },
    ....
```
And also
```
southpark.locations(function(places){
	console.log(places);
});
southpark.characters(function(places){
	console.log(places);
});
```
