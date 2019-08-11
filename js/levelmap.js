import {Player, Treasure, Monster, Exit} from './critter.js';

export default class LevelMap
{
    constructor(levelData)
    {
        this.columns = levelData.columns;
        this.rows = levelData.rows;
        this.tileMap = levelData.levelmap
        
        this.critters = [];
        this.critters[0] = new Player(levelData.player.startX, levelData.player.startY, levelData.player.tile);
        for (let count = 0; count < levelData.treasure.length; count++)
        {
            let newTreasure = new Treasure(levelData.treasure[count].startX, levelData.treasure[count].startY, levelData.treasure[count].tile, levelData.treasure[count].points);
            this.critters.push(newTreasure);
        }
        for (let count = 0; count < levelData.monster.length; count++)
        {
            let newMonster = new Monster(levelData.monster[count].startX, levelData.monster[count].startY, levelData.monster[count].tile, levelData.monster[count].damage);
            this.critters.push(newMonster);
        }
        for (let count = 0; count < levelData.exit.length; count++)
        {
            let newExit = new Exit(levelData.exit[count].startX, levelData.exit[count].startY, levelData.exit[count].tile, levelData.exit[count].destination);
            this.critters.push(newExit);
        }
        this.thePlayer = this.critters[0];
      
        this.tileSize = 16;


        // this is so I have a way to always reference the Player, if needed

        
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
        if (theCritter.imageNumber >= 0)
        {
        this.gameWindow.drawImage(
            this.critterAtlas,
            theCritter.imageNumber * this.tileSize,
            0,
            this.tileSize,
            this.tileSize,
            theCritter.X * this.tileSize,
            theCritter.Y * this.tileSize,
            this.tileSize,
            this.tileSize);
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

        for (let count = 0; count < this.critters.length; count++)
        {
            this.drawCritter(this.critters[count]);
        }
    }


}