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

// Check if a player has visited a room
var hasVisitedMirrorRoom = false;
var hasVisitedMattressRoom = false;
var hasVisitedCenterRoom = false;
var hasVisitedTrainRoom = false;
var hasVisitedCatHallwayRoom = false;
var hasVisitedCatRoom = false;

// Player's variables
var score = 0;
var error = 0;