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

class Treasure extends Critter
{
    constructor(posX, posY, imageNumb, treasureValue)
    {
        super(posX, posY, imageNumb);
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

export {Critter, Player, Treasure, Monster}