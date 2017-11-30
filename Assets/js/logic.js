// General //
//1. User should input a string into the userInput textbox
//2. As soon as user click userInputButton, the string should be store in the array "topics" and create a button with that topic
//3. If the user click on any button, a set of 10 gifs related to that button should be displayed below.
//4. The gif will animate or deanimate when user clicks on them.
//5. if user clicks on a different button, the previous set of gifs will be cleared and a new set of gifs will be displayed only if the button clicked is different than
// the one currently displayed.


// Global Variables //
var topics= [];


// functions
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

function addButton()
{
	var buttonName = topics[topics.length - 1];
	$("#topicButtons").append('<button'+ ' id="' + buttonName + '"' +' class="btn m-3">' + buttonName +'</button>')
}

// main process

$(document).ready(function() 
{
	$("#userInputButton").click(function() {
		userInput();
	});
});