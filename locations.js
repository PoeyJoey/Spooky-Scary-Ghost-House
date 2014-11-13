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

// (4,1)
function secretRoom() {
	// This room will be a secret room that's not on the player's map. It will also be the final room. (exitRoom)
	var message = "You found the exit! Although the game isn't finished yet... You'll have to solve a puzzle to get here in the next version.";
	canGoNorth = false;
	canGoSouth = true;
	canGoWest = false;
	canGoEast = false;
	if (!hasVisitedSecretRoom) {
		hasVisitedSecretRoom = true;
		score += 5;
	}
	updateDisplay(message);
}

// (4,2)
function catRoom() {
	// Room to the farthest east. Connected to the cat poster hallway. (catRoom)
	var message = "You stand in a room filled with cats all along the walls. They appear to be trying to get through the door to the south.";
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

// (4,3)
function toyRoom() {
	// This room will be a secret room that's not on the player's map. It will also be the final room. (exitRoom)
	var message = "There are cat toys scattered around the room. You now see why so many cats were trying to get in here.";
	canGoNorth = true;
	canGoSouth = false;
	canGoWest = false;
	canGoEast = true;
	if (!hasVisitedToyRoom) {
		hasVisitedToyRoom = true;
		score += 5;
	}
	updateDisplay(message);
}

// (5,3)
function secretRoom() {
	// This room will be a secret room that's not on the player's map. It will also be the final room. (exitRoom)
	var message = "You found the exit! Although the game isn't finished yet... You'll have to solve a puzzle to get here in the next version.";
	canGoNorth = false;
	canGoSouth = false;
	canGoWest = true;
	canGoEast = true;
	if (!hasVisitedSecretRoom) {
		hasVisitedSecretRoom = true;
		score += 5;
	}
	updateDisplay(message);
}

// (6,3)
function secretRoom() {
	// This room will be a secret room that's not on the player's map. It will also be the final room. (exitRoom)
	var message = "You found the exit! Although the game isn't finished yet... You'll have to solve a puzzle to get here in the next version.";
	canGoNorth = false;
	canGoSouth = false;
	canGoWest = true;
	canGoEast = false;
	if (!hasVisitedSecretRoom) {
		hasVisitedSecretRoom = true;
		score += 5;
	}
	updateDisplay(message);
}