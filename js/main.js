let currentLevel;
let mainGame;


class gameState
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
    }

}

class critter
{
    constructor(startX, startY, number, type, value)
    {
        this.posX = startX;
        this.posY = startY;
        this.imageNumber = number;
        switch (type.toUpperCase())
        {
        case 'PLAYER':
            this.cType = 0;
            break;
        case 'TREASURE':
            this.cType = 1;
            this.pointValue = value;
            break;
        case 'MONSTER':
            this.cType = 2;
            break;
        default:
            console.log('unknown type');
        }
        
    }

    getType()
    {
        switch(this.cType)
        {
        case 0: return('PLAYER');
        case 1: return('TREASURE');
        case 2: return('MONSTER');
        }
    }
}

class levelMap
{
    constructor()
    {
        this.columns = 15;
        this.rows = 15;
        this.tileSize = 16;
        this.tileMap =
        [
            -1,  8,  8,  8,  8,  9, 10,  7,  8,  8,  8,  8,  8,  8, -1,
             6,  0,  0,  0,  0, 19, 10,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0, 22,  0, 22,  0, 16,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0, 20,  0, 10,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0,  0, 19,  0,  0, 10,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0, 22,  0,  0, 20, 10,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0, 20,  0, 19,  0, 16,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0, 19,  0, 20,  0, 15, 11, 13, 21, 22, 21, 22, 22,  5,
             6,  0, 20,  0, 19,  0,  0,  0, 10,  1,  1,  1,  1,  1,  5,
             6,  0, 22,  0,  0, 20, 19,  0, 16,  1, 21, 21, 21,  1,  5,
             6,  0,  0,  0,  0,  0, 20, 19, 10, 22,  1,  1,  1,  1,  5,
             6,  0,  0,  0, 19,  0,  0,  0, 10,  1,  1, 21,  1, 21,  5,
             6, 22, 20,  0, 20, 19, 22,  0, 10,  1, 22, 22, 21, 18,  5,
             6,  0,  0,  0,  0,  0,  0,  0, 10,  1,  1,  1,  1,  1,  5,
            -1,  3,  3,  3,  3,  3,  3,  4, 10,  2,  3,  3,  3,  3, -1
        ]
        this.critters = [ ];
        this.critters[0] = new critter(1, 1, 0, 'player', null);
        this.critters[1] = new critter(4, 1, 2, 'treasure', 100);
        this.critters[2] = new critter(1, 13, 3, 'treasure', 500);
        this.critters[3] = new critter(7, 12, 3, 'treasure', 500);
        this.critters[4] = new critter(12, 11, 2, 'treasure', 100);
        this.critters[5] = new critter(13, 2, 4, 'treasure', 1000);
        this.critters[6] = new critter(12, 2, 5, 'monster', 50);
        this.critters[7] = new critter(11, 3, 5, 'monster', 50);



        // this is so I have a way to always reference the Player, if needed
        this.thePlayer = this.critters[0];
        
       this.turnCount = 0;
        
        // This is temporary; it's a collision map of the tiles on the tilesheet
        this.collisionMap =
        [
            true,
            true, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            true, true, true, false, false,
            false, false];

        this.gameWindow = document.getElementById('gamemap').getContext('2d');
        this.tileAtlas = document.getElementById('tilesheet');
        this.critterAtlas = document.getElementById('crittersheet');

    }

    getTile(col, row)
    {
        return this.tileMap[row * this.columns + col];
    }

    isPassible(x, y)
    {
        if ((x < 0) || (y < 0) || (x > this.columns) || (y > this.rows))
        {
            return false;
        }
        else
        {
            return this.collisionMap[this.getTile(x,y)];
        }
    }

    drawTile(x, y)
    {
        let tempTile = this.getTile(x,y);
        if (tempTile >= 0)
        {
            this.gameWindow.drawImage(
                this.tileAtlas, // tilesheet
                tempTile * this.tileSize, // source X
                0, // source Y - zero for a horizontal strip sheet
                this.tileSize, // source width
                this.tileSize, // source height
                x * this.tileSize, // target x
                y * this.tileSize, // target y
                this.tileSize, // target width
                this.tileSize); // target height
        }
        
    }

    drawCritter(theCritter)
    {
        this.gameWindow.drawImage(
            this.critterAtlas,
            theCritter.imageNumber * this.tileSize,
            0,
            this.tileSize,
            this.tileSize,
            theCritter.posX * this.tileSize,
            theCritter.posY * this.tileSize,
            this.tileSize,
            this.tileSize);
        
    }

    drawMap()
    {
        for (let col = 0; col < this.columns; col++)
        {
            for (let row = 0; row < this.rows; row++)
            {
                this.drawTile(col, row);
            }
        }

        for (let count = 0; count < this.critters.length; count++)
        {
            this.drawCritter(this.critters[count]);
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

function moveCritter(direction, theCritter)
{
    if ((direction == "N") && (currentLevel.isPassible(theCritter.posX, theCritter.posY - 1))) {
        theCritter.posY--;
    }
    else if ((direction == "S") && (currentLevel.isPassible(theCritter.posX, theCritter.posY + 1))) {
        theCritter.posY++;
    }
    else if ((direction == "E") && (currentLevel.isPassible(theCritter.posX + 1, theCritter.posY))) {
        theCritter.posX++;
    }
    else if ((direction == "W") && (currentLevel.isPassible(theCritter.posX - 1, theCritter.posY))) {
        theCritter.posX--;
    }
}

function processTurn(direction)
{   
    let repaintTiles = [];
    let killCritters = [];
    for (let count = 0; count < currentLevel.critters.length; count++)
    {
        if (currentLevel.critters[count].getType() == 'PLAYER')
        {
            repaintTiles.push({x:currentLevel.critters[count].posX, y:currentLevel.critters[count].posY});
            moveCritter(direction, currentLevel.critters[count]);
            mainGame.updateEnergy();
        }

        if ((currentLevel.critters[count].getType() == 'MONSTER') && ((currentLevel.turnCount % 2) == 0))
        {
            repaintTiles.push({x:currentLevel.critters[count].posX, y: currentLevel.critters[count].posY});
            moveCritter(getRandomDirection(), currentLevel.critters[count]);
        }

        if (currentLevel.critters[count].getType() == 'TREASURE')
        {
            if ((currentLevel.critters[count].posX == currentLevel.thePlayer.posX) && (currentLevel.critters[count].posY == currentLevel.thePlayer.posY))
            {
                repaintTiles.push({x: currentLevel.critters[count].posX, y: currentLevel.critters[count].posY});
                killCritters.push(count);
                mainGame.updateScore(currentLevel.critters[count].pointValue);
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
        mainGame = new gameState();
        currentLevel = new levelMap();
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


