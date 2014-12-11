// Joey M. Pupel
// 12/11/2014
// Final Project


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
		
		// removes picture book from inventory
		for (var i = 0; i < inventory.length; i++) {
			if (inventory[i] === item[3].name) {
				inventory.splice(i, 1);
			}
		}
		
		// change description back to what it was
		locale[2][1].hasBackUp = true;
	}
	
	// Center Room After Kitten
	// if	player can visit mattress room
	// and	player can visit secret room
	// and	player is in center room
	if (locale[2][1].canVisit && locale[4][1].canVisit && currentLoc === locale[2][2]) {
		// change description of center room temporarily
		locale[2][2].desc = "As you leave the room full of mattresses, the door slams shut behind you and locks itself. Immediately after, you hear a loud explosion come from somewhere east of the room and a few cats come running out of the door. Something must have happened.";
		
		// change description and back up of cat room
		locale[4][2].desc = "As you enter the room, you notice a giant hole in the wall to the north. There aren't any more cats around here now. The explosion must have scared the cats away."
		locale[4][2].descBackUp = locale[4][2].desc;
		
		// prevent player from going back to mattress room
		locale[2][1].canVisit = false;
		
		// change description of center room for next visit
		locale[2][2].descBackUp = "You stand in a room with doors on all sides but the door to the north is locked."
		locale[2][2].hasBackUp = true;
	}
	
	// You Win!
	// if	player is in the secret room
	if (currentLoc === locale[4][1]) {
		// prevent player from going back into the house
		locale[4][2].canVisit = false;
	}
}