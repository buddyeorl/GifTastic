// General //
//1. User should input a string into the userInput textbox
//2. As soon as user click userInputButton, the string should be store in the array "topics" and create a button with that topic
//3. If the user clicks on any button, a set of 10 gifs related to that button should be displayed below.
//4. The gif will animate or deanimate when user clicks on them.
//5. if user clicks on a different button, the previous set of gifs will be cleared and a new set of gifs will be displayed only if the button clicked is different than
// the one currently displayed.


// Global Variables //
var topics= []; //store all topics added by the user
var imagesStill= []; //store still gifs
var imagesOriginal= []; //store moving gifs
var isGifActive=[]; // check if gif is active or not

// functions

// userInput will take the value in the input box and add create a button with that name
function userInput()
{
	var userInput = $("#userInput").val();
	$("#userInput").val(''); // this will clear the input as soon as the button has been clicked
	if (topics.includes(userInput) === false && userInput != '') // userInput != '' will prevent an empty button to be created or added to the array
	{
		topics.push(userInput);
		console.log(topics);
		addButton();  // add a button with a new topic
	}
}

// addButton will add a button when user clicks on "go"
function addButton()
{
	var buttonName = topics[topics.length - 1];
	$(".topicButtons").append('<button'+ ' id="' + buttonName + '"' +' class="btn m-3">' + buttonName +'</button>')
}

// addGifs will add a set of 10 button related Gifs when the user clicks on a button
function addGifs(buttonName)
{
	var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + buttonName + '&api_key=dc6zaTOxFJmzC&limit=11';
	$.ajax({
	  url: queryURL,
	  method: 'GET'
	}).done(function(response) {
	  console.log(response.data[0].images.original.url);
	  for (var i = 1; i <= 10; i++)
	  {
	  	imagesStill["image" + i] =response.data[i].images.fixed_height_still.url;
	  	imagesOriginal["image" + i] =response.data[i].images.original.url;
	  	isGifActive["image" + i]=false; // this line will set all gifs as inactive.
	  	$("#image" + i).css({'background' : 'url("' + response.data[i].images.fixed_height_still.url + '") no-repeat','background-size' : '100% 100%',});
	    $("#image" + i).html("Rating: " + response.data[i].rating);
	  }
	});
}

// gifToActivate will activate or deactivate the gifs when clicked.
function activateGifs(gifToActivate)
{
	console.log("insideactivate gifs" + imagesOriginal[gifToActivate])
	if (isGifActive[gifToActivate] === false)
	{
		$("#" + gifToActivate).css({'background' : 'url("' + imagesOriginal[gifToActivate] + '") no-repeat','background-size' : '100% 100%',});
		isGifActive[gifToActivate] = true;
	}
	else
	{
		$("#" + gifToActivate).css({'background' : 'url("' + imagesStill[gifToActivate] + '") no-repeat','background-size' : '100% 100%',});
		isGifActive[gifToActivate] = false;
	}
}


// main process

	// user will type in a keyword which will be converted to a button when "Go" button has been clicked
	$("#userInputButton").click(function() {
		userInput();
	});

	// below jquery will pick a button that will exist in the future and send it's id to the addGifs function to collect the right gifs
	$(".topicButtons").on("click",'button' ,function(){
		console.log("inside button" + $(this).attr("id"));
		addGifs($(this).attr("id"));
	});

	// below jquery will pick a button that will exist in the future and send it's id to the addGifs function to collect the right gifs
	$("#imagePlacer").on("click",'div' ,function(){
		console.log("inside div" + $(this).attr("id"));
		activateGifs($(this).attr("id"));
	});






