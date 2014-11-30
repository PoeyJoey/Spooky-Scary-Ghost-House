// Joey M. Pupel
// 11/30/2014
// Project 5


//
// Base Class - Locale
//
function Locale() {
	this.name = "";
	this.desc = "";
	
	this.hasItem = false;
	this.item = null;
	
	this.hasVisited = false;
	
	this.canGoNorth = null;
	this.canGoEast = null;
	this.canGoSouth = null;
	this.canGoWest = null;
	
	this.visit =	function() {
							// adds score if the player has not visited the room before
							this.scoreRoom();
							
							// changes the canGo global variables based on the room
							this.canGo();
							
							// updates the message based on the room
							this.message();
						}
	
	this.scoreRoom =	function() {
										if (!this.hasVisited) {
											this.hasVisited = true;
											score += 5;
										}
									}
	
	this.canGo =	function() {
								canGoNorth = this.canGoNorth;
								canGoEast = this.canGoEast;
								canGoSouth = this.canGoSouth;
								canGoWest = this.canGoWest;
							}
	
	this.message =	function() {
									var message = this.desc;
									
									if (this.hasItem){
										message = message + "\n\n" + this.item.see;
									}
									
									updateDisplay(message);
								}
}

//
// Initialization of Locales
//
function initLocale() {
	// (1,2)
	var mirrorRoom = new Locale();
	mirrorRoom.name = "Mirror Room";
	mirrorRoom.desc = "You stand in a room with a door to the east. There is a large mirror on the wall in front of you but it's too dirty to see any reflections.";
	// hasItem will be changed to true after attempting to take the motivational cat poster
	mirrorRoom.hasItem = false;
	// item is the mirror shard (item [0])
	mirrorRoom.item = item[0];
	mirrorRoom.canGoNorth = false;
	mirrorRoom.canGoEast = true;
	mirrorRoom.canGoSouth = false;
	mirrorRoom.canGoWest = false;
	
	// (2,1)
	var mattressRoom = new Locale();
	mattressRoom.name = "Mattress Room";
	mattressRoom.desc = "You stand in a room with a door to the south. There are mattresses piled up against the walls that block the windows.";
	mattressRoom.canGoNorth = false;
	mattressRoom.canGoEast = false;
	mattressRoom.canGoSouth = true;
	mattressRoom.canGoWest = false;
	
	// (2,2)
	var centerRoom = new Locale();
	centerRoom.name = "Center Room";
	centerRoom.desc = "You stand in a room with doors on all sides. There is a large chandelier hanging from the center of the room.";
	centerRoom.hasItem = true;
	// item is the map (item [2])
	centerRoom.item = item[2];
	centerRoom.canGoNorth = true;
	centerRoom.canGoEast = true;
	centerRoom.canGoSouth = true;
	centerRoom.canGoWest = true;
	
	// (2,3)
	var trainRoom = new Locale();
	trainRoom.name = "Train Room";
	trainRoom.desc = "You stand in a room with a door to the north. There is a train set on the ground but no trains can be seen.";
	trainRoom.hasItem = true;
	// item is the ball of yarn (item [1])
	trainRoom.item = item[1];
	trainRoom.canGoNorth = true;
	trainRoom.canGoEast = false;
	trainRoom.canGoSouth = false;
	trainRoom.canGoWest = false;
	
	// (3,2)
	var catHallwayRoom = new Locale();
	catHallwayRoom.name = "Cat Hallway Room";
	catHallwayRoom.desc = "You stand in a hallway connecting two rooms to the east and the west. There are motivational cat posters all along the walls.";
	// hasItem will be changed to true after finding the ghost cat in the ghost cat room
	catHallwayRoom.hasItem = false;
	// item is the motivational cat poster (item[4])
	catHallwayRoom.item = item[4];
	catHallwayRoom.canGoNorth = false;
	catHallwayRoom.canGoEast = true;
	catHallwayRoom.canGoSouth = false;
	catHallwayRoom.canGoWest = true;
	
	// (4,1)
	var secretRoom = new Locale();
	secretRoom.name = "Secret Room";
	secretRoom.desc = "You found the exit! Although the game isn't finished yet... You'll have to solve a puzzle to get here in the next version. (involves items)";
	// This is the final room. There is no reason for the player to go any direction.
	secretRoom.canGoNorth = false;
	secretRoom.canGoEast = false;
	secretRoom.canGoSouth = false;
	secretRoom.canGoWest = false;
	
	// (4,2)
	var catRoom = new Locale();
	catRoom.name = "Cat Room";
	catRoom.desc = "You stand in a room filled with cats crawling all over the walls. They're blocking the door to the south.";
	// canGoNorth will be unlocked when the player picks up the picture book.
	catRoom.canGoNorth = false;
	catRoom.canGoEast = false;
	// canGoSouth will be unlocked when the player picks up the ball of yarn.
	catRoom.canGoSouth = false;
	catRoom.canGoWest = true;
	
	// (4,3)
	var toyRoom = new Locale();
	toyRoom.name = "Toy Room";
	toyRoom.desc = "There are cat toys scattered around the room. You now see why so many cats were trying to get in here.";
	toyRoom.canGoNorth = true;
	toyRoom.canGoEast = true;
	toyRoom.canGoSouth = false;
	toyRoom.canGoWest = false;
	
	// (5,3)
	var ghostCatRoom = new Locale();
	ghostCatRoom.name = "Ghost Cat Room";
	ghostCatRoom.desc = "A giant sleeping ghost cat blocks the way to the next room but it seems you can walk right through him.";
	ghostCatRoom.canGoNorth = false;
	// canGoEast will be unlocked when player picks up the motivational cat poster.
	ghostCatRoom.canGoEast = false;
	ghostCatRoom.canGoSouth = false;
	ghostCatRoom.canGoWest = true;
	
	// (6,3)
	var altarRoom = new Locale();
	altarRoom.name = "Altar Room";
	altarRoom.desc = "There is an altar towards the back of the room.  A riddle is inscribed into the wall behind the altar. It reads 'TODO - create an actual riddle.' How strange...";
	altarRoom.hasItem = true;
	// item is the picture book (item[3])
	altarRoom.item = item[3];
	altarRoom.canGoNorth = false;
	altarRoom.canGoEast = false;
	altarRoom.canGoSouth = false;
	altarRoom.canGoWest = true;
	
	var errorRoom = new Locale();
	errorRoom.name = "Error Room";
	errorRoom.desc = "This room is an error room. Please email me where you were and what you did when this error occurred.";
	errorRoom.canGoNorth = false;
	errorRoom.canGoEast = false;
	errorRoom.canGoSouth = false;
	errorRoom.canGoWest = false;
	
	
	//
	// Rooms stored in locale array using their coordinates (first digit is east-west and the second digit is north-south)
	//
	
	// Unused 0 East-West
	locale[0][0] = errorRoom;
	locale[0][1] = errorRoom;
	locale[0][2] = errorRoom;
	locale[0][3] = errorRoom;
	
	// 1 East-West
	locale[1][0] = errorRoom;
	locale[1][1] = errorRoom;
	locale[1][2] = mirrorRoom;
	locale[1][3] = errorRoom;
	
	// 2 East-West
	locale[2][0] = errorRoom;
	locale[2][1] = mattressRoom;
	locale[2][2] = centerRoom;
	locale[2][3] = trainRoom;
	
	// 3 East-West
	locale[3][0] = errorRoom;
	locale[3][1] = errorRoom;
	locale[3][2] = catHallwayRoom;
	locale[3][3] = errorRoom;
	
	// 4 East-West
	locale[4][0] = errorRoom;
	locale[4][1] = secretRoom;
	locale[4][2] = catRoom;
	locale[4][3] = toyRoom;
	
	// 5 East-West
	locale[5][0] = errorRoom;
	locale[5][1] = errorRoom;
	locale[5][2] = errorRoom;
	locale[5][3] = ghostCatRoom;
	
	// 6 East-West
	locale[6][0] = errorRoom;
	locale[6][1] = errorRoom;
	locale[6][2] = errorRoom;
	locale[6][3] = altarRoom;
}



/* --------------------OLD STUFF--------------------



//
// Rooms
//

// (1,2)
function mirrorRoom() {
	// Room to the west of the starting room (mirrorRoom)
	var message = "You stand in a room with a door to the east. There is a large mirror on the wall in front of you but it's too dirty to see any reflections.";
	
	if (!mirrorShard.has) {
		message = message + "\n\n" + "Broken shards of the mirror are on the ground in front of the mirror.";
	}
	
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
	
	if (!map.has) {
		message = message + "\n\n" + "A map rests on a nearby table.";
	}
	
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
	
	if (!ballOfYarn.has) {
		message = message + "\n\n" + "A ball of yarn is stuffed into one of the train set's tunnels.";
	}
	
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
	// This room will be a secret room that's not on the player's map. It will also be the final room. (secretRoom)
	var message = "You found the exit! Although the game isn't finished yet... You'll have to solve a puzzle to get here in the next version. (involves items)";
	
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
	// Room with lots of cat toys everywhere. Nothing important here. (toyRoom)
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
function ghostCatRoom() {
	// This room will have a massive, sleeping ghost cat that blocks the way. You'll have to find a way to wake it up. (ghostCatRoom)
	var message = "A giant sleeping ghost cat blocks the way to the next room but it seems you can walk right through him.";
	
	canGoNorth = false;
	canGoSouth = false;
	canGoWest = true;
	canGoEast = true;
	
	if (!hasVisitedGhostCatRoom) {
		hasVisitedGhostCatRoom = true;
		score += 5;
	}
	
	updateDisplay(message);
}

// (6,3)
function altarRoom() {
	// This room will have an altar with a children's picture book about cats. Behind the altar a riddle is inscribed into the wall. (altarRoom)
	var message = "There is an altar towards the back of the room.  A riddle is inscribed into the wall behind the altar. It reads 'TODO - create an actual riddle.' How strange...";
	
	if (!ballOfYarn.has) {
		message = message + "\n\n" + "A children's picture book is lying open on the altar.";
	}
	
	canGoNorth = false;
	canGoSouth = false;
	canGoWest = true;
	canGoEast = false;
	
	if (!hasVisitedAltarRoom) {
		hasVisitedAltarRoom = true;
		score += 5;
	}
	
	updateDisplay(message);
}
*/