// Joey M. Pupel
// 11/30/2014
// Project 5


//
// Base Class - Item
//
function Item() {
	this.name = "";
	this.find = "";
	this.has = false;
	
	this.take = 	function() {
							this.has = true;
							score += 5;
							var message = "You found a " + this.name + "." + "\n" + "You put it into your bag.";
							updateDisplay(message);
						}
}


//
// Initialization of Items
//
function initItems() {
	mirrorShard = new Item();
	mirrorShard.find = "Broken shards of the mirror are on the ground in front of the mirror.";
	mirrorShard.name = "Broken Mirror Shard";
	
	ballOfYarn = new Item();
	ballOfYarn.find = "A ball of yarn is stuffed into one of the train set's tunnels.";
	ballOfYarn.name = "Ball of Yarn";
	
	map = new Item();
	map.find = "A map rests on a nearby table.";
	map.name = "Map";
	
	pictureBook = new Item();
	pictureBook.find = "A children's picture book is lying open on the altar.";
	pictureBook.name = "Picture Book";
	
	motivationalCatPoster = new Item();
	motivationalCatPoster.find = "Maybe one of these posters will move that ghost cat...";
	motivationalCatPoster.name = "Motivational Cat Poster";
}