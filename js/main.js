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

        this.gameWindow = document.getElementById('gamemap').getContext('2d');
        this.tileAtlas = document.getElementById('tilesheet');
        this.creatureAtlas = document.getElementById('creaturesheet');

    }

    getTile(col, row)
    {
        return this.tileMap[row * this.columns + col];
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

    if (direction == "UP")
    {
        hero.posY--;
    }
    else if (direction == "DOWN")
    {
        hero.posY++;
    }
    else if (direction == "RIGHT")
    {
        hero.posX++;
    }
    else if (direction == "LEFT")
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