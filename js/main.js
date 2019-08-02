let currentGame;

class creature
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
            this.iValue = value;
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
        this.creatures = [ ];
        this.creatures[0] = new creature(1, 1, 0, 'player', null);
        this.creatures[1] = new creature(4, 1, 2, 'treasure', 100);
        this.creatures[2] = new creature(1, 13, 3, 'treasure', 500);
        this.creatures[3] = new creature(7, 12, 3, 'treasure', 500);
        this.creatures[4] = new creature(12, 11, 2, 'treasure', 100);
        this.creatures[5] = new creature(12, 2, 5, 'monster', 50);
       
        
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
        this.creatureAtlas = document.getElementById('creaturesheet');

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

    drawMap()
    {
        for (let col = 0; col < this.columns; col++)
        {
            for (let row = 0; row < this.rows; row++)
            {
                this.drawTile(col, row);
            }
        }
    }

    drawCreature(theCreature)
    {
        this.gameWindow.drawImage(
            this.creatureAtlas,
            theCreature.imageNumber * this.tileSize,
            0,
            this.tileSize,
            this.tileSize,
            theCreature.posX * this.tileSize,
            theCreature.posY * this.tileSize,
            this.tileSize,
            this.tileSize);
        
    }
}

function processTurn(direction)
{   
    let oldX = currentGame.creatures[0].posX;
    let oldY = currentGame.creatures[0].posY;
/*
    for (count = 0; count < currentGame.creatures.length; count++)
    {
        switch(currentGame.creatures[count].getType())
        {
            case 'PLAYER':
            case ''
        }
    }
*/
    if ((direction == "UP") && (currentGame.isPassible(oldX, oldY-1)))
    {
        currentGame.creatures[0].posY--;
    }
    else if ((direction == "DOWN") && (currentGame.isPassible(oldX, oldY+1)))
    {
        currentGame.creatures[0].posY++;
    }
    else if ((direction == "RIGHT") && (currentGame.isPassible(oldX+1, oldY)))
    {
        currentGame.creatures[0].posX++;
    }
    else if ((direction == "LEFT") && (currentGame.isPassible(oldX-1, oldY)))
    {
        currentGame.creatures[0].posX--;
    }
    currentGame.drawTile(oldX, oldY);
    currentGame.drawCreature(currentGame.creatures[0]);

}

document.addEventListener("DOMContentLoaded", function(event)
    {            
        currentGame = new levelMap();
        currentGame.drawMap();

        for (let count = 0; count < currentGame.creatures.length; count++)
        {
            console.log('drawing creature ' + count);
            currentGame.drawCreature(currentGame.creatures[count]);
            
        }

        
    }
);

document.addEventListener("keydown", event =>{
    console.log(event.key);
    if (event.key == "ArrowUp" || event.key == "w")
    {
        event.preventDefault();
        processTurn("UP");
    }
    else if (event.key == "ArrowDown" || event.key == "s")
    {
        event.preventDefault();
        processTurn("DOWN");
    }
    else if (event.key == "ArrowRight" || event.key == "d")
    {
        event.preventDefault();
        processTurn("RIGHT");
    }
    else if (event.key == "ArrowLeft" || event.key == "a")
    {
        event.preventDefault();
        processTurn("LEFT");
    }
});