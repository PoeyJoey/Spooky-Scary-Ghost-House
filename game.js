//
// Global Variables
//


// Player's current position using coordinates
// Starting room is (2,2)
var northSouth = 2;
var eastWest = 2;

// Check if a player can go a certain direction
var canGoNorth = true;
var canGoSouth = true;
var canGoEast = true;
var canGoWest = true;

// Check if a player has visited a room
var hasVisitedMirrorRoom = false;
var hasVisitedMattressRoom = false;
var hasVisitedCenterRoom = false;
var hasVisitedTrainRoom = false;
var hasVisitedCatHallwayRoom = false;
var hasVisitedCatRoom = false;

// Player's variables
var score = 0;
var error = 0;


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
// Rooms
//

// (1,2)
function mirrorRoom() {
	// Room to the west of the starting room (mirrorRoom)
	var message = "You stand in a room with a door to the east. There is a large mirror on the wall in front of you but it's too dirty to see any reflections.";
	canGoNorth = false;
	canGoSouth = false;
	canGoWest = false;
	canGoEast = true;
	if (!hasVisitedMirrorRoom) {
		hasVisitedMirrorRoom = true;
		score += 5;
	}
	updateDisplay(message);
}	

// (2,1)
function mattressRoom() {
	// Room to the north of the center room (mattressRoom)
	var message = "You stand in a room with a door to the south. There are mattresses piled up against the walls that block the windows.";
	canGoNorth = false;
	canGoSouth = true;
	canGoWest = false;
	canGoEast = false;
	if (!hasVisitedMattressRoom) {
		hasVisitedMattressRoom = true;
		score += 5;
	}
	updateDisplay(message);
}

// (2,2)
function centerRoom() {
	// Center room (centerRoom)
	var message = "You stand in a room with doors on all sides. There is a large chandelier hanging from the center of the room.";
	canGoNorth = true;
	canGoSouth = true;
	canGoWest = true;
	canGoEast = true;
	if (!hasVisitedCenterRoom) {
		hasVisitedCenterRoom = true;
		score += 5;
	}
	updateDisplay(message);
}

// (2,3)
function trainRoom() {
	// Room to the south of the center room (trainRoom)
	var message = "You stand in a room with a door to the north. There is a train set on the ground but no trains can be seen.";
	canGoNorth = true;
	canGoSouth = false;
	canGoWest = false;
	canGoEast = false;
	if (!hasVisitedTrainRoom) {
		hasVisitedTrainRoom = true;
		score += 5;
	}
	updateDisplay(message);
}

// (3,2)
function catHallwayRoom() {
	// Room to the east of the center room (catHallwayRoom)
	var message = "You stand in a hallway connecting two rooms to the east and the west. There are motivational cat posters all along the walls.";
	canGoNorth = false;
	canGoSouth = false;
	canGoWest = true;
	canGoEast = true;
	if (!hasVisitedCatHallwayRoom) {
		hasVisitedCatHallwayRoom = true;
		score += 5;
	}
	updateDisplay(message);
}

// (4,2)
function catRoom() {
	// Room to the farthest east. Connected to the cat poster hallway. (catRoom)
	var message = "You stand in a room filled with cats all along the walls. You can't get through the doors that they block to the north and to the south.";
	canGoNorth = false;
	canGoSouth = false;
	canGoWest = true;
	canGoEast = false;
	if (!hasVisitedCatRoom) {
		hasVisitedCatRoom = true;
		score += 5;
	}
	updateDisplay(message);
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

// Error Finding
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