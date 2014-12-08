// Joey M. Pupel
// 12/11/2014
// Final Project


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

// Player's variables
var score = 0;
var typeError = 0;

// Location and direction tracking
var locale = [];
var currentLoc = null;
var direction = [
			/* N */	-1,
			/* E */	 1,
			/* S */	 1,
			/* W */	-1
				];

// Items and Inventory
var item = [];
var inventory = [];