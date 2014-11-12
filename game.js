//
//Game Functions
//

// Direction Pathing
function goDirection(goDirection){

	goDirection = goDirection.toLowerCase();
	goDirection = goDirection.trim();

	// Finds what direction the player went and changes their room coordinates accordingly
	switch(goDirection) {
		

		
		// Going North
		case "north":
		case "n":
			if (canGoNorth){
				northSouth = northSouth - 1;
				goDirection = "You went north.";
				roomfind();
			} else{
				goDirection = "You can't go that way!";
			}
			break;
			
		// Going East
		case "east":
		case "e":
			if (canGoEast) {
				eastWest = eastWest + 1;
				goDirection = "You went east.";
				roomfind();
			} else {
				goDirection = "You can't go that way!";
			}
			break;
			
		// Going South
		case "south":
		case "s":
			if (canGoSouth) {
				northSouth = northSouth + 1;
				goDirection = "You went south.";
				roomfind();
			} else {
				goDirection = "You can't go that way!";
			}
			break;
			
		// Going West
		case "west":
		case "w":
			if (canGoWest) {
				eastWest = eastWest - 1;
				goDirection = "You went west.";
				roomfind();
			} else {
				goDirection = "You can't go that way!";
			}
			break;
			
		// Error Direction Message
		default:
			// Display this message if the user typed incorrectly
			if (error === 5) {
				goDirection = "Bro! Do you even type?";
			} else {
				goDirection = "That's not a valid direction!";
				error += 1;
			}
			break;
	}
	
	// Displays the direction the player went. To be moved to updateDisplay() in the future.
	document.getElementById("taMain").value = goDirection + "\n\n" + document.getElementById("taMain").value;
	
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
	//Adds the text from the room to the message box
	document.getElementById("taMain").value = message + "\n----------------------------------\n" + document.getElementById("taMain").value;
	updateScore();
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