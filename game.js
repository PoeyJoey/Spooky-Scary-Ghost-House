//
//Game Functions
//

// Direction Pathing
function goDirection(goDirection){

	goDirection = goDirection.toLowerCase();
	goDirection = goDirection.trim();
	
	var directionMessage = "";

	// Finds what direction the player went and changes their room coordinates accordingly
	switch(goDirection) {
		
		// Going North
		case "north":
		case "n":
			if (canGoNorth){
				northSouth -= 1;
				directionMessage = "You went north.";
				roomfind();
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
				roomfind();
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
				roomfind();
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
				roomfind();
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
	
	// Displays the direction the player went. To be moved to updateDisplay() in the future.
	displayDirection(directionMessage);
	
	// Disables the directions the player cannot go.
	btnDisable();
	
	document.getElementById("txtCommand").value = "";
}

// Room Finding
function roomfind() {
	switch (eastWest) {
		case 1:
			if (northSouth === 2){
				mirrorRoom();
			} else {
				error();
			}
			break;
		case 2:
			if (northSouth === 1){
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
			if (northSouth === 2){
				catHallwayRoom();
			} else {
				error();
			}
			break;
		case 4:
			if (northSouth === 2){
				catRoom();
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
	roomfind();
	document.getElementById("btnEast").disabled = !canGoEast;
	document.getElementById("btnNorth").disabled = !canGoNorth;
	document.getElementById("btnSouth").disabled = !canGoSouth;
	document.getElementById("btnWest").disabled = !canGoWest;
	document.getElementById("txtCommand").disabled = false;
	document.getElementById("btnGo").disabled = false;
}