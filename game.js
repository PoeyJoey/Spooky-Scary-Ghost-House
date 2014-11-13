//
// Command Input
//
function commandInput(command) {
	command = command.toLowerCase();
	command = command.trim();
	
	switch(command) {

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
			
		case "bag":
		case "b":
			bag();
			break;
			
		case "take":
		case "t":
			take();
			break;
			
		case "help":
		case "h":
			help();
			break;
			
		// Error Message
		default:
			// Display this message if the user typed incorrectly
			if (error === 5) {
				directionMessage = "Bro, do you even type?";
			} else {
				directionMessage = "That's not a valid command!";
				error += 1;
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
			} else {
				directionMessage = "You can't go that way!";
			}
			break;
			
		// Error Direction Message
		default:
			// Display this message if the user typed incorrectly
			if (error === 5) {
				directionMessage = "Bro, do you even type?";
			} else {
				directionMessage = "That's not a valid command!";
				error += 1;
			}
			break;
	}
	
	roomfind();
	
	// Displays the direction the player went. To be moved to updateDisplay() in the future.
	displayDirection(directionMessage);
}

//
// Room Finding
//
function roomfind() {
	switch (eastWest) {
		case 1:
			if (northSouth === 2) {
				mirrorRoom();
			} else {
				error();
			}
			break;
		case 2:
			if (northSouth === 1) {
				mattressRoom();
			} else if (northSouth === 2) {
				centerRoom();
			} else if (northSouth === 3) {
				trainRoom();
			} else {
				error();
			}
			break;
		case 3:
			if (northSouth === 2) {
				catHallwayRoom();
			} else {
				error();
			}
			break;
		case 4:
			if (northSouth === 1) {
				secretRoom();
			} else if (northSouth === 2) {
				catRoom();
			} else if (northSouth === 3) {
				toyRoom();
			} else {
				error();
			}
			break;
		case 5:
			if (northSouth === 3) {
				ghostCatRoom();
			} else {
				error();
			}
			break;
		case 6:
			if (northSouth === 3) {
				altarRoom();
			} else {
				error();
			}
			break;
		default:
			error();
			break;
	}
	
	// Disables the directions the player cannot go.
	btnDisable();
}


//
// Message, Score, and Buttons
//
function updateDisplay(message) {
	// Adds the text from the room to the message box
	document.getElementById("taMain").value = message + "\n----------------------------------\n" + document.getElementById("taMain").value;
	updateScore();
}

function displayDirection(message) {
	// Tells the user what direction they went
	document.getElementById("taMain").value = message + "\n\n" + document.getElementById("taMain").value;
}

function updateScore() {
	// Changes the score
	document.getElementById("scoreBox").value = score;
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
	switch (eastWest) {
		case 1:
			if (northSouth === 2) {
				//broken mirror shard
			} else {
				error();
			}
			break;
		case 2:
			if (northSouth === 1) {
				//nothing to take
			} else if (northSouth === 2) {
				//map
			} else if (northSouth === 3) {
				//ball of yarn
			} else {
				error();
			}
			break;
		case 3:
			if (northSouth === 2) {
				//nothing to take
			} else {
				error();
			}
			break;
		case 4:
			if (northSouth === 1) {
				//nothing to take
			} else if (northSouth === 2) {
				//nothing to take
			} else if (northSouth === 3) {
				//nothing to take
			} else {
				error();
			}
			break;
		case 5:
			if (northSouth === 3) {
				//nothing to take
			} else {
				error();
			}
			break;
		case 6:
			if (northSouth === 3) {
				//picture book
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
	helpMessage += "'Help'	- Shows this message";
	updateDisplay(helpMessage);
}


//
// Error Finding
//
function error() {
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
	roomfind();
	document.getElementById("btnEast").disabled = !canGoEast;
	document.getElementById("btnNorth").disabled = !canGoNorth;
	document.getElementById("btnSouth").disabled = !canGoSouth;
	document.getElementById("btnWest").disabled = !canGoWest;
	document.getElementById("txtCommand").disabled = false;
	document.getElementById("btnGo").disabled = false;
}