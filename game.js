// Joey M. Pupel
// 11/30/2014
// Project 5


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
		case "east":
		case "e":
		case "south":
		case "s":
		case "west":
		case "w":
			goDirection(command);
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
			
		// Error Message
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
function goDirection(goDirection) {

	var directionMessage = "";
	
	// Finds what direction the player went and changes their room coordinates accordingly
	switch(goDirection) {
		
		// Going North
		case "north":
		case "n":
			if (canGoNorth){
				northSouth -= 1;
				directionMessage = "You went north.";
				roomFind();
			} else{
				directionMessage = "You can't go that way!";
			}
			break;
			
		// Going East
		case "east":
		case "e":
			if (canGoEast) {
				eastWest += 1;
				directionMessage = "You went east.";
				roomFind();
			} else {
				directionMessage = "You can't go that way!";
			}
			break;
			
		// Going South
		case "south":
		case "s":
			if (canGoSouth) {
				northSouth += 1;
				directionMessage = "You went south.";
				roomFind();
			} else {
				directionMessage = "You can't go that way!";
			}
			break;
			
		// Going West
		case "west":
		case "w":
			if (canGoWest) {
				eastWest -= 1;
				directionMessage = "You went west.";
				roomFind();
			} else {
				directionMessage = "You can't go that way!";
			}
			break;
			
		// Error Direction
		default:
			// Display this message if something bad happened
			error();
			break;
	}
	
	// Displays the direction the player went.
	displayDirection(directionMessage);
}

//
// Room Finding
//
function roomFind() {

	currentLoc = locale[eastWest][northSouth];
	
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
	document.getElementById("btnEast").disabled = !currentLoc.canGoEast;
	document.getElementById("btnNorth").disabled = !currentLoc.canGoNorth;
	document.getElementById("btnSouth").disabled = !currentLoc.canGoSouth;
	document.getElementById("btnWest").disabled = !currentLoc.canGoWest;
}


//
// Take Command
//
function take() {

	if (currentLoc.seeItem) {
		currentLoc.item.take();
	} else {
		updateDisplay("You don't see anything that you need here.")
	}
	
	// Special Occurrences that happen when an Item is taken
	
	// if player picks up the map, show the map below
	if (item[2].has && document.getElementById("map").style.visibility === "hidden") {
		document.getElementById("map").style.visibility = "visible";
	}
	
	// if player tried to take the cat poster and they cannot see the mirror shard, let them see/take the mirror shard
	if (item[4].failedTake && !locale[1][2].seeItem) {
		locale[1][2].seeItem = true;
	}
	
	// if player has the mirror shard and cannot take the cat poster, allow them to take the cat poster
	if (item[0].has && !item[4].canTake) {
		item[4].canTake = true;
	}
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
function error() {

	// TODO - add something to show where the error came from (error number)

	// Display this message if the game is broken somehow
	var message = "The cats are here for you. You broke it!";
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