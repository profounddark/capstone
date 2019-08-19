# Development Diary, August 18, 2019

This is the end of the fourth week of development of this Capstone project, tentatively titled "Capstone!" The Github Repo for this project can be found here: https://github.com/profounddark/capstone. The most recent build of the app can be found on the corresponding Github Pages site for the repo, found here: https://profounddark.games/capstone/.

An image of the project at the time fo the writing of this entry:

![Image of the First Screenshot](./image/pt4_screenshot.png)

## Timeline
According to the project timeline, the fourth week was dedicated to implementing a high score saving system by implementing Firestore with Firebase. Portions of the project timeline are recreated below:

| Project Tasks/Milestones | Time Estimate | Due Date |
| --- | :---: | :---: |
| Complete basic game loop | 3d | 08/11/2019 |
| Add Firebase functionality, high score saving | 7d | 08/18/2019 |
| Additional adjustments, testing | 5d-4d | |
| Implement Analytics | 2d-3d | 08/25/2019 |

An important element of the game that had not been implemented yet was an end state. Specifically, the state at which the player runs out of energy. This was the number one priority for this week of development..

## Adding an End State (Out of Energy)

## Adding a Game Over and High Score Screen

A "Game Over" screen was added to inform the player that they have ended the game and present them their high score. THis was relatively straightforward. A similar High Score screen was implemented, although it was initially little more than a placeholder. Both screens were "temporary" until the could be database was implemented.

## Loading High Scores from Firebase




## Minor CSS Tweaks and Changes

The screen arrangement in desktop mode has been reconfigured. The player's energy and score are display on the right, above the information output window. Output is still limited to ten items, although I have begun experimenting with this in order to find the right number of items such that it will scroll to the bottom of the canvas element.