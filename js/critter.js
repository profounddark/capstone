class Critter
{
    posX
    posY
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

    moveCritter(direction, level)
    {
        if ((direction == "N") && (level.isPassible(this.posX, this.posY - 1)))
        {
            this.posY--;
        }
        else if ((direction == "S") && (level.isPassible(this.posX, this.posY + 1)))
        {
            this.posY++;
        }
        else if ((direction == "E") && (level.isPassible(this.posX + 1, this.posY)))
        {
            this.posX++;
        }
        else if ((direction == "W") && (level.isPassible(this.posX - 1, this.posY)))
        {
            this.posX--;
        }
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
}

/**** Monster Extension ****/

class Monster extends Critter
{
    constructor(startX, startY, imageNumb)
    {
        super(startX, startY, imageNumb);
    }

    get type()
    {
        return('MONSTER');
    }
}

/**** Exit Extension ****/

class Exit extends Critter
{
    targetMap
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


}

export {Critter, Player, Treasure, Monster, Exit}