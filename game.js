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
			error();
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
// Occurrences
//
function occurrences() {
	// Back Up Descriptions
	if (currentLoc.hasBackUp) {
		currentLoc.desc = currentLoc.descBackUp;
		currentLoc.hasBackUp = false;
	}
	
	
	// See Map
	// if	player has the map
	// and	the map is not shown below
	if (item[2].has && document.getElementById("map").style.visibility === "hidden") {
		// show the map
		document.getElementById("map").style.visibility = "visible";
	}
	
	// See Mirror Shard
	// if	player tried to take cat poster
	// and	player cannot see mirror shard
	// and	player does not have mirror shard
	if (item[4].failedTake && !locale[1][2].seeItem && !item[0].has) {
		// player can see mirror shard
		locale[1][2].seeItem = true;
	}
	
	// Can Take Cat Poster
	// if	player has mirror shard
	// and	player cannot take cat poster
	// and	player does not have cat poster
	if (item[0].has && !item[4].canTake && !item[4].has) {
		// player can take cat poster
		item[4].canTake = true;
	}
	
	// See Cat Poster
	// if	player has visited ghost cat room
	// and	player cannot see cat poster
	// and	player does not have cat poster
	if (locale[5][3].hasVisited && !locale[3][2].seeItem && !item[4].has) {
		// player can see cat poster (but can't take)
		locale[3][2].seeItem = true;
	}
	
	// Throw Yarn in Cat Room
	// if	player has ball of yarn
	// and	player in cat room
	if (item[1].has && currentLoc === locale[4][2]) {
		// action message (temporary description change)
		locale[4][2].desc = "You throw the ball of yarn into the corner of the room and all the cats chase after it. They no longer block the door to the south.";
		
		// removes ball of yarn from inventory
		for (var i = 0; i < inventory.length; i++) {
			if (inventory[i] === item[1].name) {
				inventory.splice(i, 1);
			}
		}
		
		// player no longer has ball of yarn
		item[1].has = false;
		
		// player can visit toy room
		locale[4][3].canVisit = true;
		
		// changes description of cat room for next visit
		locale[4][2].descBackUp = "You stand in a room filled with cats playing with a ball of yarn in the north-east corner of the room.";
		locale[4][2].hasBackUp = true;
	}
	
	// Ghost Cat Disappear
	// if	player has cat poster
	// and	player in ghost cat room
	if (item[4].has && currentLoc === locale[5][3]) {
		// action message (temporary description change)
		locale[5][3].desc = "You hold up the motivational cat poster. The ghost cat's eyes suddenly dart open and he launches through the ceiling. Good thing he's a ghost cat.";
		
		// player can visit altar room
		locale[6][3].canVisit = true;
		
		// changes description of ghost cat room for next visit
		locale[5][3].descBackUp = "You stand in an empty room. The ghost cat that was here is gone now and hasn't come back yet. Better hurry before it comes back.";
		locale[5][3].hasBackUp = true;
	}
	
	// This part of the puzzle is a WIP
	// TODO: Make the user go to the mattress room for part of the puzzle.
	
	// Picture Book Kitten
	// if	player has picture book
	// and	player in mattress room
	if (item[3].has && currentLoc === locale[2][1]) {
		// action message/change description of mattress room
		locale[2][1].desc = "As you enter the room you hear a child's voice. It says, " + '"You have brought me my book. Place it on the ground, leave this place, and never come back." You look around but you only see a small kitten sitting atop one of the mattress piles. You place the book on the ground and the kitten jumps down and starts pawing through the book. You turn to leave.';
		
		// allow player to go to final room
		locale[4][1].canVisit = true;
		
		// change description back to what it was
		locale[2][1].hasBackUp = true;
	}
	
	// Center Room After Kitten
	// if	player can visit mattress room
	// and	player can visit secret room
	// and	player is in center room
	if (locale[2][1].canVisit && locale[4][1].canVisit && currentLoc === locale[2][2]) {
		// change description of center room
		locale[2][2].desc = "As you leave the room full of mattresses, the door slams shut behind you and locks itself. Immediately after, you hear a loud explosion come from somewhere east of the room and a few cats come running out of the door. Something must have happened.";
		
		// change description and back up of cat room
		locale[4][2].desc = "As you enter the room, you notice a giant hole in the wall to the north. There aren't any more cats around here now. The explosion must have scared the cats away."
		locale[4][2].descBackUp = locale[4][2].desc;
		
		// prevent player from going back to mattress room
		locale[2][1].canVisit = false;
		
		// change description of center room for next visit
		locale[2][2].descBackUp = "You stand in a room with doors on all sides but the door to the north is locked."
	}
	
	// You Win!
	// if	player is in the secret room
	if (currentLoc === locale[4][1]) {
		// prevent player from going back into the house
		locale[4][2].canVisit = false;
	}
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