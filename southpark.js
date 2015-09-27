var request = require('request');
	cheerio = require('cheerio');

var _  = require('underscore');

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string');


var southpark = ( function(){
	var city = {};
	city.locations = function(callback){
		return fetch('Locations', callback);
	};
	city.people = function(callback){
		return fetch('Characters', callback);
	};
	city.episodes = function(callback){
		return fetchEpisodes(callback);
	};
	// This function fetches the characters/locations that apphear in the southpark
	// show as a list of JSON objects( each one of them a city of the
	// form {name:<NAME>, description:<DESCRIPTION>, image:<IMAGE_SRC>}). Takes a callback function
	// which should be able to handle a list of JSON objects.
	var fetch = function (type, callback){
		// The url which holds list of episodes
		var url = 'http://wiki.southpark.cc.com/wiki/List_of_'+String(type);
	    request(url, 
	    	function(err, resp, body) {
		        if (err)
		            throw err;
		        $ = cheerio.load(body);
		        var locations = [];
		        $('#mw-content-text .character').each(function(index){
		        		// A '.character' class is a container for all
		        		// the thumbnails containing the name and link
		        		// to source wiki of a location in southpark. 
			        	var location = {};
			        	$(this).find('a').each(function(index, element){
			        		var description = element['attribs']['href'];
			        			isName = element['name'] === 'a';
			        		// If the element has a name attribute, then
			        		// its just the name of the city.
			        		if (isName) {
			        			if(element['children'][0]['data']){
			        					location['name'] = element['children'][0]['data'];
			        			}
			        		}
			        		// If not it could be link to the thumbnail
			        		// wiki of the city
			 				if (description) {
			        			if(_.startsWith(description, "http://")){
			        				location['description'] = description;
			        			}
			        		}
			        	})
			        	// Now we go about finding the thumbnail images
			        	// of the locations
			        	$(this).find('img').each(function(index, element){
			        		var image = element['attribs']['src'];
			        		location['image'] = image;
			        	})
			        	locations.push(location);
		        })
		        callback(locations);
		    }
		);
	};

	var fetchEpisodes = function (callback){
		// The url which holds list of episodes
		var url = 'http://wiki.southpark.cc.com/wiki/List_of_Episodes';
	    request(url, 
	    	function(err, resp, body) {
		        if (err)
		            throw err;
		        $ = cheerio.load(body);
		        var episodes = [];
		        $('#mw-content-text').each(function(index){
		        		// A '.character' class is a container for all
		        		// the thumbnails containing the name and link
		        		// to source wiki of a location in southpark.
			        	$(this).find('a').each(function(index, element){
			        		if(element['attribs']){
			        			// console.log(element['attribs']['title']);
			        			var episode = {};
				        		if(element['attribs']['href']){
				        			episode['wikilink'] = element['attribs']['href'];
				        		}
				        		if(element['attribs']['title']){
				        			episode['name'] = element['attribs']['title']
				        		}
				        		episodes.push(episode);
				        	}
			        	})
		        })
		        callback(episodes);
		    }
		);
	};

	return city;

} (southpark || {}));

module.exports = southpark;

/*
southpark.episodes(function(places){
	console.log(places);
});
*/