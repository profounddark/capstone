# Capstone

This is an attempt to make a tile-based adventure/arcade web game. This game is being developed in HTML/CSS/JavaScript with no frameworks. The primary purpose of this endeavor is for me to learn more about using the HTML Canvas component to display graphics.

Well, that, and it's the "capstone" to my Web Development Certificate.

## First Playable Prototype

The first playable prototype will feature a single, fixed map (sized 15x15). The player will move about the map, collecting treasures while trying to get to the exit square. Each space will lower the player's "energy" by one (thus, creating a time limit to the game). Each treasure will increase the player's score. Some treasures will increase the player's energy.

If the player reaches the exit, they will be moved to the next level (which, in this case, will be the same level).

## Current Status

Displaying a single map is complete. On Desktop, the user can move the character about using the arrow keys or WASD. There is basic tile collision based on tile type; this means that the player will be unable to enter spaces that are marked as impassible. In addition, they will be unable to walk off of the edges of the map.

### Upcoming Features (in development)
* Tile Collision: The character will only be able to move into spaces of a certain type.
* Mobile Controls: Adding buttons at the bottom of the screen (mobile only) that allows the player to move the character about.