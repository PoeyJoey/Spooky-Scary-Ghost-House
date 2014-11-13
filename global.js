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

// Check if a player can take or look at their inventory
var canTake = false;
var canInventory = false;

// Check if a player has visited a room
var hasVisitedMirrorRoom = false;
var hasVisitedMattressRoom = false;
var hasVisitedCenterRoom = false;
var hasVisitedTrainRoom = false;
var hasVisitedCatHallwayRoom = false;
var hasVisitedSecretRoom = false;
var hasVisitedCatRoom = false;
var hasVisitedToyRoom = false;
var hasVisitedGhostCatRoom = false;
var hasVisitedAltarRoom = false;

// Player's variables
var score = 0;
var typeError = 0;

// Items
var mirrorShard = null;
var ballOfYarn = null;
var map = null;
var pictureBook = null;