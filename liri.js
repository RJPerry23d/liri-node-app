var action = process.argv[2];
var value = process.argv[3]; // **************************** This is then end of my 2 arguments

// These are the modules and files required by code
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: "d092a73b96684948aacf16f1330d25e6",
    secret: "9b407066289b4f79bc7c82ecd1adc08e"
});
var request = require('request');
var keys = require('./keys.js');
var fs = require('fs');

var client = new Twitter(keys.twitterKeys);

// **************************** This is where i set up my cases for the actions
switch (action) {
    case 'my-tweets':
        myTweets();
        break;
    case 'movie-this':
        movieThis(value);
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
}
// ************* This starts code for functions of the app **************

function myTweets() {
    //**************************** Here is where I call on Twitter
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    var userName = process.argv[3];
    var params = {
        screen_name: userName,
        count: 20 // **************************** See below for reason why this is added
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // count    Parameters (found on https://dev.twitter.com/rest/reference/get/search/tweets)
            // Name     Required    Description                     Default Value       Example
            // Count    optional    The number of tweets to                             100
            //                      return per page, up to a 
            //                      maximum of 100. Defaults to
            //                      15. This was formerly the 
            //                      “rpp” parameter in the old 
            //                      Search API.
        }
        for (i = 0; i < tweets.length; i++) {
            var number = i + 1;
            console.log('\n*===========================================*\n* Created on: ' + tweets[i].created_at + '\n* ' + [i + 1] + '. ' + tweets[i].text + '\n*===========================================*\n');
        }
    });


} // end myTweets function

var firstArgument = process.argv[2];
var secondArgument = process.argv[3];
var song = "The sign"; //default value for song in case no return of search
var nodeArg = process.argv

function spotifyAPI(value) {
    spotify.search({
        type: 'track',
        query: song
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var songInfo = data.tracks.items[0];
            var infoResults =
                console.log("*===========================================*\n " + songInfo.artists[0].name + '\n ' + songInfo.name + '\n ' + songInfo.album.name + '\n ' + songInfo.preview_url + "\n*===========================================*");
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
} // **************************** end spotifyAPI function

function movieThis(movie) {
    //**************************** Here is where I have my function to call on OMDB
    var movieName = "";
    if (movie === "") {
        console.log("No Movie");
        var nodeArgs = process.argv || movieName;
        for (var i = 3; i < nodeArgs.length; i++) {
            movieName = movieName + " " + nodeArgs[i];
        }
    } else {
        movieName = movie;
        console.log(movie);
    }
    if (movieName === "" || movieName === undefined || movieName === null) {
        movieName = "Mr. Nobody";
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    // This line is just to help us debug against the actual URL.

    request(queryUrl, function(error, response, body) {
        // **************************** If the request is successful
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating           
            var infoResults =
                console.log("*==================================================*\n* Title of the movie: " + JSON.parse(body).Title + "\n* Year the movie came out: " + JSON.parse(body).Year + "\n* IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            
            if (!JSON.parse(body).Ratings.Value) {
                console.log("* No name available");
            } else {
                console.log("* Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
            }
            console.log("* Country where the movie was produce: " + JSON.parse(body).Country + "\n* Language of the movie: " + JSON.parse(body).Language + "\n* Plot of the movie: " + JSON.parse(body).Plot + "\n* Actors in the movie: " + JSON.parse(body).Actors + "\n*==================================================*");

            infoResults; //call this variable to display search answers
        }
    });

} // **************************** end movieThis function 

function doWhatItSays() {
    //Here is where I have my function to call on random rquests
    fs.readFile('random.txt', 'UTF-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var dataArr = data.split(',');

            if (dataArr[0] === 'spotify-this-song') {
                song = dataArr[1];
                spotifyAPI();
            }
            if (dataArr[0] === 'movie-this') {
                var movieName = dataArr[1];
                movieThis(movieName);
            }
        }
    });

} // **************************** end doWhatItSays function