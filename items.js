// Joey M. Pupel
// 11/30/2014
// Project 5


//
// Base Class - Item
//
function Item() {
	this.name = "";
	this.see = "";
	this.has = false;
	this.canTake = null;
	
	this.take = 	function() {
							if (this.canTake) {
								this.has = true;
								this.canTake = false;
								
								// changes the room to no longer have an item
								currentLoc.hasItem = false;
								
								score += 5;
								var message = "You found a " + this.name + "." + "\n" + "You put it into your bag.";
							}
							updateDisplay(message);
						}
}


//
// Initialization of Items
//
function initItems() {
	mirrorShard = new Item();
	mirrorShard.see = "Broken shards of the mirror are on the ground in front of the mirror.";
	mirrorShard.name = "Broken Mirror Shard";
	
	ballOfYarn = new Item();
	ballOfYarn.see = "A ball of yarn is stuffed into one of the train set's tunnels.";
	ballOfYarn.name = "Ball of Yarn";
	
	map = new Item();
	map.see = "A map rests on a nearby table.";
	map.name = "Map";
	
	pictureBook = new Item();
	pictureBook.see = "A children's picture book is lying open on the altar.";
	pictureBook.name = "Picture Book";
	
	motivationalCatPoster = new Item();
	motivationalCatPoster.see = "Maybe one of these posters will be enough to move that ghost cat...";
	motivationalCatPoster.name = "Motivational Cat Poster";
	
	item[0] = mirrorShard;
	item[1] = ballOfYarn;
	item[2] = map;
	item[3] = pictureBook;
	item[4] = motivationalCatPoster;
}