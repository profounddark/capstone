class Critter
{
    constructor(startX, startY, imageNumb)
    {
        this.posX = startX;
        this.posY = startY;
        this.imageNumber = imageNumb;
    }

    get type()
    {

    }

    get X()
    {
        return this.posX;
    }

    get Y()
    {
        return this.posY;
    }

    moveCritter(level, direction)
    {
        let newX = this.posX + (direction=="E") - (direction=="W");
        let newY = this.posY + (direction=="S") - (direction=="N");

        if (level.isPassible(newX, newY))
        {
            this.posX = newX;
            this.posY = newY;
        }
    }

    get XY()
    {
        return (this.posY * 15 + this.posX)
    }

    get passible()
    {
        return(false);
    }

    isSameSpace(otherCritter)
    {
        return ((this.X==otherCritter.X) && (this.Y==otherCritter.Y));
    }

    isAdjacent(otherCritter)
    {
        if ((this.X==otherCritter.X) && (Math.abs(this.Y-otherCritter.Y)==1))
        {
            return true;
        }
        if ((this.Y==otherCritter.Y) && (Math.abs(this.X-otherCritter.X)==1))
        {
            return true;
        }
        return false;
    }
}

/**** Player Extension ****/

class Player extends Critter
{
    constructor(startX, startY, imageNumb)
    {
        super(startX, startY, imageNumb);
    }

    get type()
    {
        return('PLAYER');
    }

}

/**** Treasure Extension ****/
class Treasure extends Critter
{
    constructor(startX, startY, imageNumb, treasureValue)
    {
        super(startX, startY, imageNumb);
        this.treasureValue = treasureValue;
    }

    get type()
    {
        return('TREASURE');
    }

    get points()
    {
        return(this.treasureValue);
    }

    get passible()
    {
        return(true);
    }
}

/**** Food Extension ****/
class Food extends Critter
{
    constructor(startX, startY, imageNumb, energyValue)
    {
        super(startX, startY, imageNumb);
        this.energyValue = energyValue;
    }

    get type()
    {
        return('FOOD');
    }

    get energy()
    {
        return(this.energyValue);
    }

    get passible()
    {
        return(true);
    }
}

/**** Monster Extension ****/
class Monster extends Critter
{
    constructor(startX, startY, imageNumb, damage)
    {
        super(startX, startY, imageNumb);
        this.energyDamage = damage;

    }

    get type()
    {
        return('MONSTER');
    }

    get damage()
    {
        return(this.energyDamage);
    }
}

/**** Random Monster Extension - moves randomly each time move is called ****/
class RandomMonster extends Monster
{
    moveCritter(level)
    {
        let numb = Math.floor(Math.random() * 4);
        switch (numb)
        {
            case 0: super.moveCritter(level, 'N'); break;
            case 1: super.moveCritter(level, 'E'); break;
            case 2: super.moveCritter(level, 'S'); break;
            case 3: super.moveCritter(level, 'W'); break;
        }
    }
}

/**** TwoWay Monster Extension - moves back in forth NS, SN, EW, or WE *****/
class TwoWayMonster extends Monster
{
    constructor(startX, startY, imageNumb, damage, direction)
    {
        super(startX, startY, imageNumb, damage);
        this.lastDir = direction;
    }

    moveCritter(level)
    {
        let oldXY = this.XY;
        super.moveCritter(level, this.lastDir);
        if (this.XY == oldXY)
        {
            switch(this.lastDir)
            {
                case 'N': this.lastDir = 'S'; break;
                case 'E': this.lastDir = 'W'; break;
                case 'S': this.lastDir = 'N'; break;
                case 'W': this.lastDir = 'E'; break;
            }
            super.moveCritter(level, this.lastDir);
        }
    }
}

/**** Exit Extension ****/

class Exit extends Critter
{
    constructor(startX, startY, imageNumb, destMap)
    {
        super(startX, startY, imageNumb);
        this.targetMap = destMap;
    }

    get type()
    {
        return('EXIT');
    }

    get destination()
    {
        return(this.targetMap);
    }

    get passible()
    {
        return(true);
    }

}

export {Critter, Player, Treasure, Food, RandomMonster, TwoWayMonster, Exit}