var action = process.argv[2];
var value = process.argv[3]; //This is then end of my 2 arguments

// These are the modules and files required by code
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');
var fs = require('fs');

var client = new twitter(keys.twitterKeys);
// console.log(keys.twitterKeys.consumer_key);


// This is where i set up my cases for the actions
switch (action) {
    case 'my-tweets': myTweets();  break;
    case 'spotify-this-song': spotifyThis(value); break;
    case 'movie-this': movieThis(value); break;
    case 'do-what-it-says': doWhatItSays(); break;
}

// These are my functions for the app
function myTweets() {
	console.log("This is where the tweet wiil be");
	//Here is where I will have my function to call on Twitter
}

function spotifyThis(value) {
	console.log("This is where the song wiil be");
	//Here is where I will have my function to call on Spotify 
}

function movieThis(value) {
	console.log("This is where the movie wiil be");
	//Here is where I will have my function to call on OMDB
	var nodeArgs = process.argv;

	// Create an empty variable for holding the movie name
	var movieName = "";

	// Loop through all the words in the node argument
	// And do a little for-loop magic to handle the inclusion of "+"s
	for (var i = 3; i < nodeArgs.length; i++) {

	  if (i > 3 && i < nodeArgs.length) {

	    movieName = movieName + "+" + nodeArgs[i];

	  }

	  else {

	    movieName += nodeArgs[i];

	  }
}
	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {
		// If the request is successful
  		if (!error && response.statusCode === 200) {
  			// Parse the body of the site and recover just the imdbRating
    	// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    	console.log(response.body);
    	console.log("==================================================");
    	console.log("Title of the movie: " + JSON.parse(body).Title);
    	console.log("Year the movie came out: " + JSON.parse(body).Year);
    	console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
    	console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1,(value)]);
    	console.log("Country where the movie was produce: " + JSON.parse(body).Country);
    	console.log("Language of the movie: " + JSON.parse(body).Language);
    	console.log("Plot of the movie: " + JSON.parse(body).Plot);
    	console.log("Actors in the movie: " + JSON.parse(body).Actors);
    	console.log("==================================================");

  }
	});

}   

function doWhatItSays() {
	console.log("This is where the do what it says will be");
	//Here is where I will have my function to call on random rquests 
}

