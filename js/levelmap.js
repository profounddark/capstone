import Critter from './critter.js';

export default class LevelMap
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
        this.critters[0] = new Critter(1, 1, 0, 'player', null);
        this.critters[1] = new Critter(4, 1, 2, 'treasure', 100);
        this.critters[2] = new Critter(1, 13, 3, 'treasure', 500);
        this.critters[3] = new Critter(7, 12, 3, 'treasure', 500);
        this.critters[4] = new Critter(12, 11, 2, 'treasure', 100);
        this.critters[5] = new Critter(13, 2, 4, 'treasure', 1000);
        this.critters[6] = new Critter(12, 2, 5, 'monster', 50);
        this.critters[7] = new Critter(11, 3, 5, 'monster', 50);

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