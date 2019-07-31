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
        this.creatures[0] = new creature(1, 1, 0);
        this.creatures[1] = new creature(4, 1, 2);
        this.creatures[2] = new creature(1, 13, 3);
        this.creatures[3] = new creature(7, 12, 3);
        this.creatures[4] = new creature(12, 11, 2);
       
        
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
    currentGame.drawCreature(hero);

}

document.addEventListener("DOMContentLoaded", function(event)
    {            
        currentGame = new levelMap();
        currentGame.drawMap();

        for (let count = 0; count <= currentGame.creatures.length; count++)
        {
            currentGame.drawCreature(currentGame.creatures[count]);
        }

        
    }
);

document.addEventListener("keydown", event =>{
    console.log(event.key);
    if (event.key == "ArrowUp" || event.key == "w")
    {
        event.preventDefault();
        moveHero(currentGame.creatures[0], "UP");
    }
    else if (event.key == "ArrowDown" || event.key == "s")
    {
        event.preventDefault();
        moveHero(currentGame.creatures[0], "DOWN");
    }
    else if (event.key == "ArrowRight" || event.key == "d")
    {
        event.preventDefault();
        moveHero(currentGame.creatures[0], "RIGHT");
    }
    else if (event.key == "ArrowLeft" || event.key == "a")
    {
        event.preventDefault();
        moveHero(currentGame.creatures[0], "LEFT");
    }
});