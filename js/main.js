import LevelMap from './levelmap.js';

let currentLevel;


class GameState
{
    constructor(startScore = 0, startEnergy = 150)
    {
        this.playerScore = startScore;
        this.playerEnergy = startEnergy;

        this.scoreTracker = document.getElementById('scoretracker');
        this.energyTracker = document.getElementById('energytracker');
        this.infoTracker = document.getElementById('infotracker');

        this.updateScore(0);
        this.updateEnergy(0);

        this.acceptInput = false;

        this.infoTracker.innerHTML = "";
        this.updateInfo('Welcome to Capstone Adventure!');
    }

    switchScreens(current, next)
    {
        let currentScreen = document.getElementById(current);
        currentScreen.classList.remove('active');
        currentScreen.classList.add('inactive');
        
        let nextScreen = document.getElementById(next);
        nextScreen.classList.remove('inactive');
        nextScreen.classList.add('active');
    }

    updateScore(amount = 0)
    {
        this.playerScore = this.playerScore + amount;
        let scoreStr = this.playerScore.toString();
        this.scoreTracker.innerHTML = scoreStr.padStart(5, '0');
    }

    updateEnergy(amount = -1)
    {
        this.playerEnergy = this.playerEnergy + amount;
        let energyStr = this.playerEnergy.toString();
        this.energyTracker.innerHTML = energyStr.padStart(4, '0');
        if (this.playerEnergy <= 0)
        {
            this.endGame();
        }
    }

    updateInfo(infoString)
    {
        if (this.infoTracker.childElementCount == 10)
        {
            this.infoTracker.removeChild(this.infoTracker.childNodes[0]);
        }
        let newText = document.createElement('p');
        newText.innerHTML = infoString;
        this.infoTracker.appendChild(newText);
    }

    endGame()
    {
        this.acceptInput = false;
        document.getElementById("finalpoints").innerHTML = this.playerScore;
        mainGame.switchScreens('levelscreen', 'gameoverscreen');
    }

    

}

let mainGame = new GameState();


function setGameControls()
    {
        // I really need a better way of doing this. Consider this a kludge
        document.getElementById('up').addEventListener("mousedown", function(event)
        {
            processTurn('N');
        });
        document.getElementById('right').addEventListener("mousedown", function(event)
        {
            processTurn('E');
        });
        document.getElementById('down').addEventListener("mousedown", function(event)
        {
            processTurn('S');
        });
        document.getElementById('left').addEventListener("mousedown", function(event)
        {
            processTurn('W');
        });

        document.addEventListener("keydown", event =>{
            if (event.key == "ArrowUp" || event.key == "w")
            {
                event.preventDefault();
                processTurn("N");
            }
            else if (event.key == "ArrowDown" || event.key == "s")
            {
                event.preventDefault();
                processTurn("S");
            }
            else if (event.key == "ArrowRight" || event.key == "d")
            {
                event.preventDefault();
                processTurn("E");
            }
            else if (event.key == "ArrowLeft" || event.key == "a")
            {
                event.preventDefault();
                processTurn("W");
            }
        });
    }

function processTurn(direction)
{   
    let repaintTiles = [];
    let killCritters = [];
    let nextLevel = null;

    if(!mainGame.acceptInput)
    {
        console.log(mainGame.acceptInput);
        return;
    }

    for (let count = 0; count < currentLevel.critters.length; count++)
    {
        if (currentLevel.critters[count].type == 'PLAYER')
        {
            repaintTiles.push({x:currentLevel.critters[count].X, y:currentLevel.critters[count].Y});
            currentLevel.critters[count].moveCritter(currentLevel, direction);
            mainGame.updateEnergy();
        }

        if ((currentLevel.critters[count].type == 'MONSTER') && ((currentLevel.turnCount % 2) == 0))
        {
            if (currentLevel.critters[count].isAdjacent(currentLevel.thePlayer))
            {
                mainGame.updateEnergy(-currentLevel.critters[count].damage);
                mainGame.updateInfo("The monster took " + currentLevel.critters[count].damage + " energy from you!");
            }
            else
            {
                repaintTiles.push({x:currentLevel.critters[count].X, y: currentLevel.critters[count].Y});
                currentLevel.critters[count].moveCritter(currentLevel);
            }
        }

        if ((currentLevel.critters[count].type == 'TREASURE') && (currentLevel.critters[count].isSameSpace(currentLevel.thePlayer)))
        {
            repaintTiles.push({x: currentLevel.critters[count].X, y: currentLevel.critters[count].Y});
            killCritters.push(count);
            mainGame.updateScore(currentLevel.critters[count].points);
            mainGame.updateInfo("You got a treasure worth " + currentLevel.critters[count].points + " points!");
        }

        if ((currentLevel.critters[count].type == 'FOOD') && (currentLevel.critters[count].isSameSpace(currentLevel.thePlayer)))
        {
            repaintTiles.push({x: currentLevel.critters[count].X, y: currentLevel.critters[count].Y});
            killCritters.push(count);
            mainGame.updateEnergy(currentLevel.critters[count].energy);
            mainGame.updateInfo("You got food worth " + currentLevel.critters[count].energy + " energy!");
        }

        if (currentLevel.critters[count].type == 'EXIT')
        {
            if (currentLevel.critters[count].XY == currentLevel.thePlayer.XY)
            {
                console.log('Instance new map: ' + currentLevel.critters[count].destination);
                nextLevel = currentLevel.critters[count].destination;
            }
        }

    }

    // remove all killed critters, starting at back
    for (let cWipe = (killCritters.length - 1); cWipe >= 0; cWipe--)
    {
        currentLevel.critters.splice(killCritters[cWipe], 1);
    }
    
    // this repaints the all of the tiles needed to be repainted
    repaintTiles.forEach(function(item){
        currentLevel.drawTile(item.x, item.y);
    });
    currentLevel.critters.forEach(function(element){
        currentLevel.drawCritter(element);
    });
    
    //increment the turn counter
    currentLevel.turnCount++; 



    if (nextLevel)
    {
        loadLevel(nextLevel);
        currentLevel.drawMap();
    }

}

function loadLevel(newLevel)
{
    fetch('./leveldata/' + newLevel + '.json')
    .then((resp) => resp.json())
    .then(function(data)
        {
            currentLevel = new LevelMap(data);
            currentLevel.drawMap();
            mainGame.acceptInput = true;
        });
}


document.addEventListener("DOMContentLoaded", function(event)
    {
        setGameControls();

        let buttonList = document.querySelectorAll('#screenbutton');
        buttonList.forEach(function(button)
        {
            button.addEventListener("mousedown", function(event)
            { 
                let destPage = event.target.getAttribute('destination');
                let sourcePage = event.target.getAttribute('source');
                mainGame.switchScreens(sourcePage, destPage);
                if (destPage == 'levelscreen')
                {
                    mainGame = new GameState();
                    loadLevel('level01');
                }
            });
        });
    });




