import {Player, Treasure, Food, RandomMonster, TwoWayMonster, Exit} from './critter.js';

export default class LevelMap
{
    constructor(levelData)
    {
        this.columns = levelData.columns;
        this.rows = levelData.rows;
        this.tileMap = levelData.levelmap
        
        this.critters = [];
        this.critters[0] = new Player(levelData.player.X, levelData.player.Y, levelData.player.tile);
        for (let count = 0; count < levelData.treasure.length; count++)
        {
            let newTreasure = new Treasure(levelData.treasure[count].X, levelData.treasure[count].Y, levelData.treasure[count].tile, levelData.treasure[count].points);
            this.critters.push(newTreasure);
        }
        for (let count=0; count < levelData.food.length; count++)
        {
            let newFood = new Food(levelData.food[count].X, levelData.food[count].Y, levelData.food[count].tile, levelData.food[count].energy);
            this.critters.push(newFood);
        }
        for (let count = 0; count < levelData.monster.length; count++)
        {
            let newMonster;
            switch (levelData.monster[count].type)
            {
                case "RND":
                    newMonster = new RandomMonster(levelData.monster[count].X, levelData.monster[count].Y, levelData.monster[count].tile, levelData.monster[count].damage);
                    break;
                case "NS":
                    newMonster = new TwoWayMonster(levelData.monster[count].X, levelData.monster[count].Y, levelData.monster[count].tile, levelData.monster[count].damage, 'N');
                    break;
                case "SN":
                    newMonster = new TwoWayMonster(levelData.monster[count].X, levelData.monster[count].Y, levelData.monster[count].tile, levelData.monster[count].damage, 'S');
                    break;    
                case "EW":
                    newMonster = new TwoWayMonster(levelData.monster[count].X, levelData.monster[count].Y, levelData.monster[count].tile, levelData.monster[count].damage, 'E');
                    break;
                case "WE":
                    newMonster = new TwoWayMonster(levelData.monster[count].X, levelData.monster[count].Y, levelData.monster[count].tile, levelData.monster[count].damage, 'W');
                    break;
            }
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
            true, true, false, false, false,
            false, false, true, false, false,
            false, false, false, false, true,
            true,
            // break in new tilemap
            false, false, false, false, false,
            false, true, true, true, false,
            false, false, false, true];

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