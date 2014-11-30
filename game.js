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
	
	// Disables the directions the player cannot go.
	btnDisable();
}


//
// Display, Score, and Buttons
//
function updateDisplay(message) {
	// Adds the text from the room to the message box
	document.getElementById("taMain").value = message + "\n----------------------------------\n" + document.getElementById("taMain").value;
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
	document.getElementById("btnEast").disabled = !canGoEast;
	document.getElementById("btnNorth").disabled = !canGoNorth;
	document.getElementById("btnSouth").disabled = !canGoSouth;
	document.getElementById("btnWest").disabled = !canGoWest;
}


//
// Take Command
//
function take() {

//	if (currentLoc.hasItem) {
//		currentLoc.item.take();
//	}

	switch (eastWest) {
		case 1:
			if (northSouth === 2) {
				//mirror shard
				if (!mirrorShard.has) {
					mirrorShard.take();
				} else {
					updateDisplay("Nothing here to take.")
				}
			} else {
				error();
			}
			break;
		case 2:
			if (northSouth === 1) {
				//nothing to take
				updateDisplay("Nothing here to take.")
			} else if (northSouth === 2) {
				//map
				if (!map.has) {
					map.take();
				} else {
					updateDisplay("Nothing here to take.")
				}
			} else if (northSouth === 3) {
				//ball of yarn
				if (!ballOfYarn.has) {
					ballOfYarn.take();
				} else {
					updateDisplay("Nothing here to take.")
				}
			} else {
				error();
			}
			break;
		case 3:
			if (northSouth === 2) {
				//nothing to take
				updateDisplay("Nothing here to take.")
			} else {
				error();
			}
			break;
		case 4:
			if (northSouth === 1) {
				//nothing to take
				updateDisplay("Nothing here to take.")
			} else if (northSouth === 2) {
				//nothing to take
				updateDisplay("Nothing here to take.")
			} else if (northSouth === 3) {
				//nothing to take
				updateDisplay("Nothing here to take.")
			} else {
				error();
			}
			break;
		case 5:
			if (northSouth === 3) {
				//nothing to take
				updateDisplay("Nothing here to take.")
			} else {
				error();
			}
			break;
		case 6:
			if (northSouth === 3) {
				//picture book
				if (!pictureBook.has) {
					pictureBook.take();
				} else {
					updateDisplay("Nothing here to take.")
				}
			} else {
				error();
			}
			break;
		default:
			error();
			break;
	}
}


//
// Bag Command
//
function bag() {
	var message = "Your bag contains:" + "\n\n";
	
	if (inventory.length > 0) {
		for (var i = 0; i < inventory.length; i++) {
			message = message + inventory[i] + "\n";
		}
	} else {
		message = message + "Nothing";
	}
	
	/*
	if (mirrorShard.has === true || ballOfYarn.has === true || map.has === true || pictureBook.has === true){
		if (mirrorShard.has === true){
			message = message + mirrorShard.name + "\n";
		}
		
		if (ballOfYarn.has === true){
			message = message + ballOfYarn.name + "\n";
		}
		
		if (map.has === true){
			message = message + map.name + "\n";
		}
		
		if (pictureBook.has === true){
			message = message + pictureBook.name + "\n";
		}
	} else {
		message = message + "Nothing";
	}
	*/
	
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
	document.getElementById("btnEast").disabled = !canGoEast;
	document.getElementById("btnNorth").disabled = !canGoNorth;
	document.getElementById("btnSouth").disabled = !canGoSouth;
	document.getElementById("btnWest").disabled = !canGoWest;
	document.getElementById("txtCommand").disabled = false;
	document.getElementById("btnGo").disabled = false;
}