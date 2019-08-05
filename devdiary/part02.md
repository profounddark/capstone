# Development Diary, August 4, 2019

This is the end of the second week of development of this Capstone project, tentatively titled "Capstone!" The Github Repo for this project can be found here: https://github.com/profounddark/capstone. The most recent build of the app can be found on the corresponding Github Pages site for the repo, found here: https://profounddark.games/capstone/.

An image of the project at the time fo the writing of this entry:

![Image of the Second Screenshot](./image/pt1_initialscreen.png)

## Timeline
According to the project timeline, the second week was dedicated to implementing the tilemap graphics using the **HTML** Canvas element. Portions of the project timeline are recreated below:

| Project Tasks/Milestones | Time Estimate | Due Date |
| --- | :---: | :---: |
| Build Initial Pages/Views | 3d | |
| Initial Canvas testing |  4d-7d | 07/28/2019 |
| Implement tilemap in Canvas | 7d-3d | 08/04/2019 |
| Add controls, game function | 4d | |
| Complete basic game loop | 3d | 08/11/2019 |

The second week saw a continuation of the work I was doing in week one. Most of the game functions are working in a very basic capacity. The player can collect treasures on the map, their energy counts down with every step, and monsters can now be implemented with random movement.


## Page/View Development
No work was done on developing the start, end game, and high score screens during this week. However, having an end game screen has become a priority since I have created several events that reference (in comments) the firing of an "end game" event.

## Mobile Controls
A first pass at mobile controls has been implemented. The mobile control ```<div>``` does not display on desktop; it only appears when the ```min-width``` of the window is less than 640. There are four buttons, each corresponding to a direction. I hard-coded the JS function call to the ```processTurn()``` function. This is temporary; it's not my intent to keep that, but I wanted to get mobile play working now. Even the styling of the buttons is temporary.
```
    <button class="up" onmousedown="processTurn('N')">UP</button>
    <button class="left" onmousedown="processTurn('W')">LEFT</button>
    <button class="right" onmousedown="processTurn('E')">RIGHT</button>
    <button class="down" onmousedown="processTurn('S')">DOWN</button>
```
