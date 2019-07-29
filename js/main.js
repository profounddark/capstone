let currentGame;

class creature
{
    constructor(startX, startY, number)
    {
        this.posX = startX;
        this.posY = startY;
        this.imageNumber = number;
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
             6,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0, 15, 11, 13,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  5,
             6,  0,  0,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  5,
            -1,  3,  3,  3,  3,  3,  3,  4, 10,  2,  3,  3,  3,  3, -1
        ]

        // This is temporary; it's a collision map of the tiles on the tilesheet
        this.collisionMap = [true, true, false, false, false,
            false, false, false, false, false, false, false,
            false, false, false, false, true, true];

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



let theHero = new creature(2, 2, 0);


function moveHero(hero, direction)
{   
    let oldX = hero.posX;
    let oldY = hero.posY;

    if ((direction == "UP") && (currentGame.isPassible(oldX, oldY-1)))
    {
        hero.posY--;
    }
    else if ((direction == "DOWN") && (currentGame.isPassible(oldX, oldY+1)))
    {
        hero.posY++;
    }
    else if ((direction == "RIGHT") && (currentGame.isPassible(oldX+1, oldY)))
    {
        hero.posX++;
    }
    else if ((direction == "LEFT") && (currentGame.isPassible(oldX-1, oldY)))
    {
        hero.posX--;
    }
    currentGame.drawTile(oldX, oldY);
    currentGame.drawCreature(theHero);

}

document.addEventListener("DOMContentLoaded", function(event)
    {            
        currentGame = new levelMap();
        currentGame.drawMap();
        currentGame.drawCreature(theHero)

        
    }
);

document.addEventListener("keydown", event =>{
    console.log(event.key);
    if (event.key == "ArrowUp" || event.key == "w")
    {
        event.preventDefault();
        moveHero(theHero, "UP");
    }
    else if (event.key == "ArrowDown" || event.key == "s")
    {
        event.preventDefault();
        moveHero(theHero, "DOWN");
    }
    else if (event.key == "ArrowRight" || event.key == "d")
    {
        event.preventDefault();
        moveHero(theHero, "RIGHT");
    }
    else if (event.key == "ArrowLeft" || event.key == "a")
    {
        event.preventDefault();
        moveHero(theHero, "LEFT");
    }
});