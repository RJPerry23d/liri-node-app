var action = process.argv[2];
var value = process.argv[3]; //This is then end of my 2 arguments

// These are the modules and files required by code
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');
var fs = require('fs');

var client = new twitter(keys.twitterKeys);
console.log(keys.twitterKeys.consumer_key);


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
}

function spotifyThis(value) {
	console.log("This is where the song wiil be"); 
}

function movieThis(value) {
	console.log("This is where the movie wiil be"); 
}

function doWhatItSays() {
	console.log("This is where the do what it says will be"); 
}

