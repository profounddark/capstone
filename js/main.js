import LevelMap from './levelmap.js';

let currentLevel;
let mainGame;


class GameState
{
    constructor(startScore = 0, startEnergy = 500)
    {
        this.playerScore = startScore;
        this.playerEnergy = startEnergy;

        this.scoreTracker = document.getElementById('scoretracker');
        this.energyTracker = document.getElementById('energytracker');

        this.updateScore(0);
        this.updateEnergy(0);
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
        if (this.playerEnergy == 0)
        {
            console.log('throw end of game event');
        }
    }

}

function getRandomDirection()
{
    let numb = Math.floor(Math.random() * 4);
    switch (numb)
    {
        case 0: return 'N';
        case 1: return 'E';
        case 2: return 'S';
        case 3: return 'W';
    }
}

function processTurn(direction)
{   
    let repaintTiles = [];
    let killCritters = [];
    for (let count = 0; count < currentLevel.critters.length; count++)
    {
        if (currentLevel.critters[count].type == 'PLAYER')
        {
            repaintTiles.push({x:currentLevel.critters[count].posX, y:currentLevel.critters[count].posY});
            currentLevel.critters[count].moveCritter(direction, currentLevel);
            mainGame.updateEnergy();
        }

        if ((currentLevel.critters[count].type == 'MONSTER') && ((currentLevel.turnCount % 2) == 0))
        {
            repaintTiles.push({x:currentLevel.critters[count].posX, y: currentLevel.critters[count].posY});
            currentLevel.critters[count].moveCritter(getRandomDirection(), currentLevel);
        }

        if (currentLevel.critters[count].type == 'TREASURE')
        {
            if ((currentLevel.critters[count].posX == currentLevel.thePlayer.posX) && (currentLevel.critters[count].posY == currentLevel.thePlayer.posY))
            {
                repaintTiles.push({x: currentLevel.critters[count].posX, y: currentLevel.critters[count].posY});
                killCritters.push(count);
                mainGame.updateScore(currentLevel.critters[count].points);
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

}



document.addEventListener("DOMContentLoaded", function(event)
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

        document.getElementById('startbutton').addEventListener("mousedown", function(event)
        {
            let titleScreen = document.getElementById('titlescreen');
            titleScreen.classList.remove('active');
            titleScreen.classList.add('inactive');
            
            let levelScreen = document.getElementById('levelscreen');
            levelScreen.classList.remove('inactive');
            levelScreen.classList.add('active');
        });


        mainGame = new GameState();
        currentLevel = new LevelMap();
        currentLevel.drawMap();
    

        
    }
);


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


