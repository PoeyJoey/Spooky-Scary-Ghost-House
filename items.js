// Joey M. Pupel
// 11/30/2014
// Project 5


//
// Base Class - Item
//
function Item() {
	this.name = "";
	this.has = false;
	this.see = "";
	// canTake is for when the player can see the item, but cant take the item for whatever reason
	this.canTake = true;
	// message to be shown only if the player can't take the item for whatever reason
	this.noTake = "";
	this.failedTake = false;
	
	this.take = 	function() {
						if (this.canTake) {
							this.canTake = false;
							this.has = true;
							
							// changes the room to no longer have an item
							currentLoc.seeItem = false;
							
							inventory[inventory.length] = this.name;
							
							score += 5;
							var message = "You found a " + this.name + "." + "\n" + "You put it into your bag.";
						} else {
							var message = this.noTake;
							this.failedTake = true;
						}
						updateDisplay(message);
					}
}


//
// Initialization of Items
//
function initItems() {
	var mirrorShard = new Item();
	mirrorShard.see = "Maybe one of these broken mirror shards will be sharp enough to cut down that cat poster...";
	mirrorShard.name = "Broken Mirror Shard";
	
	var ballOfYarn = new Item();
	ballOfYarn.see = "A ball of yarn is stuffed into one of the train set's tunnels.";
	ballOfYarn.name = "Ball of Yarn";
	
	var map = new Item();
	map.see = "A map rests on a nearby table.";
	map.name = "Map";
	
	var pictureBook = new Item();
	pictureBook.see = "A children's picture book is lying open on the altar.";
	pictureBook.name = "Picture Book";
	
	var motivationalCatPoster = new Item();
	motivationalCatPoster.canTake = false;
	motivationalCatPoster.see = "Maybe one of these posters will be enough to move that ghost cat...";
	motivationalCatPoster.name = "Motivational Cat Poster";
	motivationalCatPoster.noTake = "The poster is heavily taped to the wall. You're going to need to something sharp to cut it free."
	
	item[0] = mirrorShard;
	item[1] = ballOfYarn;
	item[2] = map;
	item[3] = pictureBook;
	item[4] = motivationalCatPoster;
}