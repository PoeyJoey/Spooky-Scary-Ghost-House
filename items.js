// Joey M. Pupel
// 11/30/2014
// Project 5


//
// Base Class - Item
//
function Item() {
	this.name = "";
	this.see = "";
	// canTake is if the player can see the item, but cant take the item for whatever reason
	this.canTake = null;
	// message to be shown only if the player can't take the item for whatever reason
	this.noTake = "";
	
	this.take = 	function() {
							if (this.canTake) {
								this.canTake = false;
								
								// changes the room to no longer have an item
								currentLoc.hasItem = false;
								
								score += 5;
								var message = "You found a " + this.name + "." + "\n" + "You put it into your bag.";
							} else {
								var message = this.noTake;
							}
							updateDisplay(message);
						}
}


//
// Initialization of Items
//
function initItems() {
	mirrorShard = new Item();
	mirrorShard.canTake = true;
	mirrorShard.see = "Broken shards of the mirror are on the ground in front of the mirror.";
	mirrorShard.name = "Broken Mirror Shard";
	
	ballOfYarn = new Item();
	ballOfYarn.canTake = true;
	ballOfYarn.see = "A ball of yarn is stuffed into one of the train set's tunnels.";
	ballOfYarn.name = "Ball of Yarn";
	
	map = new Item();
	map.canTake = true;
	map.see = "A map rests on a nearby table.";
	map.name = "Map";
	
	pictureBook = new Item();
	pictureBook.canTake = true;
	pictureBook.see = "A children's picture book is lying open on the altar.";
	pictureBook.name = "Picture Book";
	
	motivationalCatPoster = new Item();
	motivationalCatPoster.canTake = false;
	motivationalCatPoster.see = "Maybe one of these posters will be enough to move that ghost cat...";
	motivationalCatPoster.name = "Motivational Cat Poster";
	motivationalCatPoster.noTake = "The poster is taped to the wall pretty heavily. You're going to need to something sharp to cut it free."
	
	item[0] = mirrorShard;
	item[1] = ballOfYarn;
	item[2] = map;
	item[3] = pictureBook;
	item[4] = motivationalCatPoster;
}