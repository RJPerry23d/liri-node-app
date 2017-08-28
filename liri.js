var action = process.argv[2];
var value = process.argv[3]; //This is then end of my 2 arguments

// These are the modules and files required by code
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  	id: "d092a73b96684948aacf16f1330d25e6",
  	secret: "9b407066289b4f79bc7c82ecd1adc08e"});
var request = require('request');
var keys = require('./keys.js');
var fs = require('fs');

var client = new Twitter(keys.twitterKeys);

// This is where i set up my cases for the actions
switch (action) {
    case 'my-tweets': myTweets();  break;    
    case 'movie-this': movieThis(value); break;
    case 'do-what-it-says': doWhatItSays(); break;
}

// This starts code for functions of the app

function myTweets() {
	//Here is where I call on Twitter
var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
}); 
var userName = process.argv[3];
var params = {
	screen_name: userName,
	count: 20 // See below for reason why this is added
	// count 	Parameters (found on https://dev.twitter.com/rest/reference/get/search/tweets)
    // Name		Required	Description						Default Value		Example
    // Count 	optional 	The number of tweets to 							100
    //						return per page, up to a 
    //						maximum of 100. Defaults to
    // 						15. This was formerly the 
    //						“rpp” parameter in the old 
    //						Search API.
};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {    
    
  }
  for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log('*===========================================* ');
                console.log('* Created on: ' + tweets[i].created_at);    
                console.log('* ' + [i + 1] + '. ' + tweets[i].text);                
                console.log('*===========================================* ');
                console.log(' ');
    }
});


}// end myTweets function

var firstArgument = process.argv[2];
var secondArgument = process.argv[3];
var song = "The sign"; //default value for song in case no return of search
var nodeArg = process.argv

function spotifyAPI(value) {
	spotify.search({ type: 'track', query: song }, function(err, data) {  	
  	if (err) {
    return console.log('Error occurred: ' + err);
  }
 	else {
 		var songInfo = data.tracks.items[0];
 		var infoResults = 
 		console.log("*===========================================*");
 		console.log("* " + songInfo.artists[0].name);
 		console.log("* " + songInfo.name);
 		console.log("* " + songInfo.album.name);
 		console.log("* " + songInfo.preview_url);
 		console.log("*===========================================*");

 	infoResults; //call this variable to display search answers
 	}	 
});
}

if (firstArgument == 'spotify-this-song' && typeof secondArgument == 'string') {
 song = process.argv.slice(3).join(" ");
 spotifyAPI()
}

if (firstArgument == 'spotify-this-song' && nodeArg.length == 3) {
	spotifyAPI()
} // end spotifyAPI function

function movieThis(value) {
	//Here is where I have my function to call on OMDB
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
	// console.log(queryUrl);

	request(queryUrl, function(error, response, body) {
		// If the request is successful
  		if (!error && response.statusCode === 200) {
  			// Parse the body of the site and recover just the imdbRating    	  	
    	var infoResults = 
    	console.log("==================================================");
    	console.log(" Title of the movie: " + JSON.parse(body).Title);
    	console.log(" Year the movie came out: " + JSON.parse(body).Year);
    	console.log(" IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
    	console.log(" Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
    	console.log(" Country where the movie was produce: " + JSON.parse(body).Country);
    	console.log(" Language of the movie: " + JSON.parse(body).Language);
    	console.log(" Plot of the movie: " + JSON.parse(body).Plot);
    	console.log(" Actors in the movie: " + JSON.parse(body).Actors);
    	console.log("==================================================");

    infoResults; //call this variable to display search answers

  }
	});

}  // end movieThis function 

function doWhatItSays() {
	//Here is where I have my function to call on random rquests
	 fs.readFile('random.txt', 'UTF-8', function(err, data) {
    	// console.log(data);
        if (err) {
            console.log(err);
        } else {
            var dataArr = data.split(',');
            console.log(data);
            console.log(dataArr[0]); 



            if (dataArr[0] === 'spotify-this-song') {
                spotifyAPI(dataArr[1]);
            }
            if (dataArr[0] === 'movie-this') {
                movieThis(dataArr[1]);
            }
        }
        
    });	
    
}// end doWhatItSays function

