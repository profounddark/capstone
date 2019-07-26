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
        this.columns = 18;
        this.rows = 18;
        this.tileSize = 16;
        this.tileMap =
        [
            0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0
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
        this.gameWindow.drawImage(
            this.tileAtlas, // tilesheet
            this.getTile(x, y) * this.tileSize, // source X
            0, // source Y - zero for a horizontal strip sheet
            this.tileSize, // source width
            this.tileSize, // source height
            x * this.tileSize, // target x
            y * this.tileSize, // target y
            this.tileSize, // target width
            this.tileSize); // target height
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
    if (event.key == "ArrowUp")
    {
        moveHero(theHero, "UP");
    }
    else if (event.key == "ArrowDown")
    {
        moveHero(theHero, "DOWN");
    }
    else if (event.key == "ArrowRight")
    {
        moveHero(theHero, "RIGHT");
    }
    else if (event.key == "ArrowLeft")
    {
        moveHero(theHero, "LEFT");
    }
});