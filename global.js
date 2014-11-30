// Joey M. Pupel
// 11/30/2014
// Project 5


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
var locale = new Array(8);
var currentLoc = null;
var direction = [];

// Items and Inventory
var item = [];
var inventory = [];

var mirrorShard = null;
var ballOfYarn = null;
var map = null;
var pictureBook = null;
var motivationalCatPoster = null;