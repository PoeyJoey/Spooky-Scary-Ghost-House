// Joey M. Pupel
// 12/11/2014
// Final Project


//
// Keyboard Command Input
//
function commandInput(command) {
	command = command.toLowerCase();
	command = command.trim();
	
	switch(command) {

		// Goes to direction finding function
		case "north":
		case "n":
			goDirection(0);
			break;
		case "east":
		case "e":
			goDirection(1);
			break;
		case "south":
		case "s":
			goDirection(2);
			break;
		case "west":
		case "w":
			goDirection(3);
			break;
			
		// Goes to the bag function
		case "bag":
		case "b":
			bag();
			break;
		
		// Goes to the item taking function
		case "take":
		case "t":
			take();
			break;
		
		// Goes to the help function
		case "help":
		case "h":
			help();
			break;
			
		// Typing Error Message
		default:
			// Display this message if the user typed incorrectly
			if (typeError === 5) {
				displayDirection("Bro, do you even type?");
			} else {
				displayDirection("That's not a valid command!");
				typeError += 1;
			}
			break;
	}
	
	document.getElementById("txtCommand").value = "";
}


//
// Direction Pathing
//
function goDirection(wentDirection) {
	
	var directionMessage = "";
	var tempNorthSouth = northSouth;
	var tempEastWest = eastWest;
	
	// Finds what direction the player went and changes the temp values accordingly
	switch(wentDirection) {
		
		// Going North
		case 0:
			directionMessage = "You went north.";
			tempNorthSouth -= 1;
			break;
			
		// Going South
		case 2:
			directionMessage = "You went south.";
			tempNorthSouth += 1;
			break;
			
		// Going East
		case 1:
			directionMessage = "You went east.";
			tempEastWest += 1;
			break;
			
		// Going West
		case 3:
			directionMessage = "You went west.";
			tempEastWest -= 1;
			break;
			
		// Error Direction
		default:
			// Display this message if something bad happened
			error(001);
			break;
	}
	
	var tempLoc = locale[tempEastWest][tempNorthSouth];
	
	// Determines if the direction the player went was valid
	if (tempLoc === null || !tempLoc.canVisit) {
		
		// If the player could not go that way
		directionMessage = "You can't go that way!";
		
	} else {
		
		// If the player could go that way
		northSouth = tempNorthSouth;
		eastWest = tempEastWest;
		currentLoc = tempLoc;
		
		roomFind();
	}
	
	// Displays the direction the player went.
	displayDirection(directionMessage);
}

//
// Room Finding
//
function roomFind() {
	
	currentLoc.visit();
	
	// Enables/Disables the buttons for the directions the player can/cannot go.
	btnDisable();
}


//
// Display, Score, and Buttons
//
function updateDisplay(message) {
	// Adds the text from the room to the message box
	document.getElementById("taMain").value = message + "\n\n----------------------------------\n" + document.getElementById("taMain").value;
	updateScore();
}

function updateScore() {
	// Changes the score
	document.getElementById("scoreBox").value = score;
}

function displayDirection(message) {
	// Tells the user what direction they went
	document.getElementById("taMain").value = message + "\n\n" + document.getElementById("taMain").value;
}

function btnDisable() {
	// Disables the buttons
	
	var north = locale[eastWest][northSouth - 1];
	var east = locale[eastWest + 1][northSouth];
	var south = locale[eastWest][northSouth + 1];
	var west = locale[eastWest - 1][northSouth];
	
	// Check North
	if(north === null || !north.canVisit) {
		canGoNorth = false;
	} else {
		canGoNorth = true;
	}
	
	// Check East
	if(east === null || !east.canVisit) {
		canGoEast = false;
	} else {
		canGoEast = true;
	}
	
	// Check South
	if(south === null || !south.canVisit) {
		canGoSouth = false;
	} else {
		canGoSouth = true;
	}
	
	// Check West
	if(west === null || !west.canVisit) {
		canGoWest = false;
	} else {
		canGoWest = true;
	}
	
	document.getElementById("btnNorth").disabled = !canGoNorth;
	document.getElementById("btnEast").disabled = !canGoEast;
	document.getElementById("btnSouth").disabled = !canGoSouth;
	document.getElementById("btnWest").disabled = !canGoWest;
	document.getElementById("btnTake").disabled = !currentLoc.seeItem;
}


//
// Take Command
//
function take() {
	
	// runs .take item function if player can see an item
	if (currentLoc.seeItem) {
		// TODO - add a fall through if the player sees an item that doesn't exist
		currentLoc.item.take();
	} else {
		updateDisplay("You don't see anything that you need here.")
	}
	
	// Special occurrences
	occurrences();
	
	btnDisable();
}


//
// Bag Command
//
function bag() {
	var message = "Your bag contains:" + "\n";
	
	if (inventory.length > 0) {
		for (var i = 0; i < inventory.length; i++) {
			message = message + "\n" + inventory[i];
		}
	} else {
		message = message + "Nothing";
	}
	
	updateDisplay(message);
}


//
// Help Command
//
function help() {
	var helpMessage = "Valid Commands:"+"\n\n";
	helpMessage += "'North'	- brings you north (if possible)"+"\n";
	helpMessage += "'South'	- brings you south (if possible)"+"\n";
	helpMessage += "'East'	- brings you east (if possible)"+"\n";
	helpMessage += "'West'	- brings you west (if possible)"+"\n";
	helpMessage += "'Take'	- take item (if possible)"+"\n";
	helpMessage += "'Bag'	- tells you what's in your bag"+"\n";
	helpMessage += "'Help'	- Shows this message" + "\n\n";
	helpMessage += "Your goal is to escape this Spooky Scary Ghost House that most people consider #2spooky."
	updateDisplay(helpMessage);
}


//
// Error Finding
//
function error(message) {

	// TODO - add something to show where the error came from (error number)

	// Display this message if the game is broken somehow
	message = "The cats are here for you. You broke it! It should have never happened." + "\n\n" + "ErrorCode: " + message;
	updateDisplay(message);
}


//
// Initialization
//
function start() {
	// Initializes the game
	initItems();
	initLocale();
	roomFind();
	document.getElementById("txtCommand").disabled = false;
	document.getElementById("btnGo").disabled = false;
}