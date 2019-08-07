export default class Critter
{
    constructor(startX, startY, number, type, value)
    {
        this.posX = startX;
        this.posY = startY;
        this.imageNumber = number;
        switch (type.toUpperCase())
        {
        case 'PLAYER':
            this.cType = 0;
            break;
        case 'TREASURE':
            this.cType = 1;
            this.pointValue = value;
            break;
        case 'MONSTER':
            this.cType = 2;
            break;
        default:
            console.log('unknown type');
        }
        
    }

    getType()
    {
        switch(this.cType)
        {
        case 0: return('PLAYER');
        case 1: return('TREASURE');
        case 2: return('MONSTER');
        }
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

