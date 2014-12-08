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
function goDirection(wentDirection) {
	
	var directionMessage = "";
	
	// Finds what direction the player went and changes their room coordinates accordingly
	switch(wentDirection) {
		
		// Going North or South
		case 0:
		case 2:
			northSouth += direction[wentDirection];
			break;
			
		// Going East or West
		case 1:
		case 3:
			eastWest += direction[wentDirection];
			break;
			
		// Error Direction
		default:
			// Display this message if something bad happened
			error();
			break;
	}
	
	// Determines if the direction the player went was valid
	if (locale[eastWest][northSouth] === null) {
	
		directionMessage = "You can't go that way!";
		switch (wentDirection){
			case 0:
			case 2:
				northSouth -= direction[wentDirection];
				break;
			case 1:
			case 3:
				eastWest -= direction[wentDirection];
				break;
		}
		
	} else {
		
		switch (wentDirection){
			case 0:
				directionMessage = "You went north.";
				break;
			case 1:
				directionMessage = "You went east.";
				break;
			case 2:
				directionMessage = "You went south.";
				break;
			case 3:
				directionMessage = "You went west.";
				break;
		}
		
		roomFind();
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
	
	var north = locale[eastWest][northSouth - 1];
	var east = locale[eastWest + 1][northSouth];
	var south = locale[eastWest][northSouth + 1];
	var west = locale[eastWest - 1][northSouth];
	
	// Disables North Button
	if(north === null || !north.canVisit) {
		canGoNorth = false;
	} else {
		canGoNorth = true;
	}
	
	//Disables East Button
	if(east === null || !east.canVisit) {
		canGoEast = false;
	} else {
		canGoEast = true;
	}
	
	//Disables South Button
	if(south === null || !south.canVisit) {
		canGoSouth = false;
	} else {
		canGoSouth = true;
	}
	
	//Disables West Button
	if(west === null || !west.canVisit) {
		canGoWest = false;
	} else {
		canGoWest = true;
	}
	
	document.getElementById("btnNorth").disabled = !canGoNorth;
	document.getElementById("btnEast").disabled = !canGoEast;
	document.getElementById("btnSouth").disabled = !canGoSouth;
	document.getElementById("btnWest").disabled = !canGoWest;
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
	
	// if player has the map and the map is not shown below, show the map below
	if (item[2].has && document.getElementById("map").style.visibility === "hidden") {
		document.getElementById("map").style.visibility = "visible";
	}
	
	// if player tried to take the cat poster and they cannot see the mirror shard and they do not have the mirror shard, let them see/take the mirror shard
	if (item[4].failedTake && !locale[1][2].seeItem && !item[0].has) {
		locale[1][2].seeItem = true;
	}
	
	// if player has the mirror shard and cannot take the cat poster and does not have the cat poster, allow them to take the cat poster
	if (item[0].has && !item[4].canTake && !item[4].has) {
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
	var message = "The cats are here for you. You broke it! It should have never happened.";
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