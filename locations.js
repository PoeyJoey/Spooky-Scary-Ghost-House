// Joey M. Pupel
// 11/30/2014
// Project 5


//
// Base Class - Locale
//
function Locale() {
	this.name = "";
	this.desc = "";
	
	this.seeItem = false;
	this.item = null;
	
	this.hasVisited = false;
	
	this.canGoNorth = null;
	this.canGoEast = null;
	this.canGoSouth = null;
	this.canGoWest = null;
	
	this.visit =	function() {
							// adds score if the player has not visited the room before
							this.scoreRoom();
							
							// runs the occurrences function
							this.occurrences();
							
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
	
	// This is for special occurrences such as when the player visits a specific room for the first time.
	this.occurrences =	function() {
										// if player has visited the ghost cat room and they cannot try to take the cat poster in the cat hallway, let be able to take it
										if (locale[5][3].hasVisited && !locale[3][2].seeItem) {
											locale[3][2].seeItem = true;
										}
										
										// if the player has the ball of yarn and they're in the cat room, display a message explaining what happened to the ball of yarn and change the desc of the room
										if (item[1].has && currentLoc === locale[4][2]) {
											var message = "You throw the ball of yarn into the corner of the room and all the cats chase after it.";
											updateDisplay(message);
											
											item[1].has = false;
											// removes ball of yarn from inventory
											for (var i = 0; i < inventory.length; i++) {
												if (inventory[i] === item[1].name) {
													inventory.splice(i, 1);
												}
											}
											locale[4][2].canGoSouth = true;
											locale[4][2].desc = "You stand in a room filled with cats playing with a ball of yarn over in the corner of the room. They no longer block the door to the south."
										}
										
										// if the player has the cat poster and they're in the ghost cat room, display a message explaining what happened to the ghost cat and change the desc of the room
										if (item[4].has && currentLoc === locale[5][3]) {
											var message = "You hold up the motivational cat poster. The ghost cat's eyes suddenly dart open and he launches through the ceiling. Good thing he's a ghost cat.";
											updateDisplay(message);
											
											locale[5][3].canGoEast = true;
											locale[5][3].desc = "You stand in an empty room. The ghost cat that was here is gone now and hasn't come back yet. Better hurry."
										}
										
										// This part of the puzzle is a WIP
										// TODO: Make the user go to the mattress room for part of the puzzle.
										if (item[3].has && currentLoc === locale[4][2]) {
											locale[4][2].canGoNorth = true;
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
									
									if (this.seeItem){
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
	mirrorRoom.desc = "You stand in a room with a door to the east. There is a large mirror on the wall in front of you but it's too dirty to see any reflections. Broken shards of the mirror are on the ground in front of the mirror.";
	// seeItem will be changed to true after attempting to take the motivational cat poster
	mirrorRoom.seeItem = false;
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
	centerRoom.seeItem = true;
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
	trainRoom.seeItem = true;
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
	// seeItem will be changed to true after finding the ghost cat in the ghost cat room
	catHallwayRoom.seeItem = false;
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
	ghostCatRoom.desc = "A giant sleeping ghost cat blocks the way to the next room. Nothing you do will make it move.";
	ghostCatRoom.canGoNorth = false;
	// canGoEast will be unlocked when player picks up the motivational cat poster.
	ghostCatRoom.canGoEast = false;
	ghostCatRoom.canGoSouth = false;
	ghostCatRoom.canGoWest = true;
	
	// (6,3)
	var altarRoom = new Locale();
	altarRoom.name = "Altar Room";
	altarRoom.desc = "There is an altar towards the back of the room.  A riddle is inscribed into the wall behind the altar. It reads 'TODO - create an actual riddle.' How strange...";
	altarRoom.seeItem = true;
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
	
	// turns locale array into a two dimensional array.
	for (var i = 0; i < 9; i++) {
		locale[i] = new Array(5);
	}
	
	// makes all locale array values in the 8 by 5 grid "errorRoom" (locale[0 through 7][0 through 4] = errorRoom)
	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 6; y++) {
			locale[x][y] = errorRoom;
		}
	}
	
	// Replaces all the false "errorRoom" locations with the correct rooms
	
	locale[1][2] = mirrorRoom;
	
	locale[2][1] = mattressRoom;
	
	locale[2][2] = centerRoom;
	
	locale[2][3] = trainRoom;
	
	locale[3][2] = catHallwayRoom;
	
	locale[4][1] = secretRoom;
	
	locale[4][2] = catRoom;
	
	locale[4][3] = toyRoom;
	
	locale[5][3] = ghostCatRoom;
	
	locale[6][3] = altarRoom;
}