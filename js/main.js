import LevelMap from './levelmap.js';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBMDRXSa_D27uFABQr0KA-rRVSd8ZOdIA0",
    authDomain: "profounddark-capstone.firebaseapp.com",
    databaseURL: "https://profounddark-capstone.firebaseio.com",
    projectId: "profounddark-capstone",
    storageBucket: "profounddark-capstone.appspot.com",
    messagingSenderId: "433989331653",
    appId: "1:433989331653:web:3a173da334de7223"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const collectionRef = firestore.collection("highscores");
const scoreTable = document.getElementById('highscoretable');
let currentLevel;


class GameState
{
    constructor(startScore = 0, startEnergy = 150)
    {
        this.playerScore = startScore;
        this.playerEnergy = startEnergy;

        this.scoreTracker = document.getElementById('scoretracker');
        this.energyTracker = document.getElementById('energytracker');
        this.infoTracker = document.getElementById('infotracker');

        this.updateScore(0);
        this.updateEnergy(0);

        this.acceptInput = false;

        this.infoTracker.innerHTML = "";
        this.updateInfo('Welcome to Capstone Adventure!');
    }

    get score()
    {
        return this.playerScore;
    }
    get energy()
    {
        return this.playerEnergy;
    }

    switchScreens(current, next)
    {
        let currentScreen = document.getElementById(current);
        currentScreen.classList.remove('active');
        currentScreen.classList.add('inactive');
        
        let nextScreen = document.getElementById(next);
        nextScreen.classList.remove('inactive');
        nextScreen.classList.add('active');
    }

    updateScore(amount = 0)
    {
        this.playerScore = this.playerScore + amount;
        let scoreStr = this.playerScore.toString();
        this.scoreTracker.innerHTML = scoreStr.padStart(5, '0');
    }

    updateEnergy(amount = -1)
    {
        this.playerEnergy = this.playerEnergy + amount;
        let energyStr = this.playerEnergy.toString();
        this.energyTracker.innerHTML = energyStr.padStart(4, '0');
        if (this.playerEnergy <= 0)
        {
            this.endGame();
        }
    }

    updateInfo(infoString)
    {
        if (this.infoTracker.childElementCount == 10)
        {
            this.infoTracker.removeChild(this.infoTracker.childNodes[0]);
        }
        let newText = document.createElement('p');
        newText.innerHTML = infoString;
        this.infoTracker.appendChild(newText);
    }

    endGame()
    {
        this.acceptInput = false;
        document.getElementById("finalpoints").innerHTML = this.playerScore;
        mainGame.switchScreens('levelscreen', 'gameoverscreen');
    }

    

}

let mainGame = new GameState();


function setGameControls()
    {
        // I really need a better way of doing this. Consider this a kludge
        document.getElementById('up').addEventListener("mousedown", function(event)
        {
            processTurn('N');
        });
        document.getElementById('right').addEventListener("mousedown", function(event)
        {
            processTurn('E');
        });
        document.getElementById('down').addEventListener("mousedown", function(event)
        {
            processTurn('S');
        });
        document.getElementById('left').addEventListener("mousedown", function(event)
        {
            processTurn('W');
        });

        document.addEventListener("keydown", event =>{
            if (event.key == "ArrowUp" || event.key == "w")
            {
                if (event.key =="ArrowUp")
                {
                    event.preventDefault();
                }
                processTurn("N");
            }
            else if (event.key == "ArrowDown" || event.key == "s")
            {
                if (event.key =="ArrowDown")
                {
                    event.preventDefault();
                }
                processTurn("S");
            }
            else if (event.key == "ArrowRight" || event.key == "d")
            {
                if (event.key =="ArrowRight")
                {
                    event.preventDefault();
                }
                processTurn("E");
            }
            else if (event.key == "ArrowLeft" || event.key == "a")
            {
                if (event.key =="ArrowLeft")
                {
                    event.preventDefault();
                }
                processTurn("W");
            }
        });
    }

function processTurn(direction)
{   
    let repaintTiles = [];
    let killCritters = [];
    let nextLevel = null;

    if(!mainGame.acceptInput)
    {
        return;
    }

    for (let count = 0; count < currentLevel.critters.length; count++)
    {
        if (currentLevel.critters[count].type == 'PLAYER')
        {
            repaintTiles.push({x:currentLevel.critters[count].X, y:currentLevel.critters[count].Y});
            currentLevel.critters[count].moveCritter(currentLevel, direction);
            mainGame.updateEnergy();
        }

        if ((currentLevel.critters[count].type == 'MONSTER') && ((currentLevel.turnCount % 2) == 0))
        {
            if (currentLevel.critters[count].isAdjacent(currentLevel.thePlayer))
            {
                mainGame.updateEnergy(-currentLevel.critters[count].damage);
                mainGame.updateInfo("The monster took " + currentLevel.critters[count].damage + " energy from you!");
            }
            else
            {
                repaintTiles.push({x:currentLevel.critters[count].X, y: currentLevel.critters[count].Y});
                currentLevel.critters[count].moveCritter(currentLevel);
            }
        }

        if ((currentLevel.critters[count].type == 'TREASURE') && (currentLevel.critters[count].isSameSpace(currentLevel.thePlayer)))
        {
            repaintTiles.push({x: currentLevel.critters[count].X, y: currentLevel.critters[count].Y});
            killCritters.push(count);
            mainGame.updateScore(currentLevel.critters[count].points);
            mainGame.updateInfo("You got a treasure worth " + currentLevel.critters[count].points + " points!");
        }

        if ((currentLevel.critters[count].type == 'FOOD') && (currentLevel.critters[count].isSameSpace(currentLevel.thePlayer)))
        {
            repaintTiles.push({x: currentLevel.critters[count].X, y: currentLevel.critters[count].Y});
            killCritters.push(count);
            mainGame.updateEnergy(currentLevel.critters[count].energy);
            mainGame.updateInfo("You got food worth " + currentLevel.critters[count].energy + " energy!");
        }

        if (currentLevel.critters[count].type == 'EXIT')
        {
            if (currentLevel.critters[count].XY == currentLevel.thePlayer.XY)
            {
                console.log('Instance new map: ' + currentLevel.critters[count].destination);
                nextLevel = currentLevel.critters[count].destination;
            }
        }

    }

    // remove all killed critters, starting at back
    for (let cWipe = (killCritters.length - 1); cWipe >= 0; cWipe--)
    {
        currentLevel.critters.splice(killCritters[cWipe], 1);
    }
    
    // this repaints the all of the tiles needed to be repainted
    repaintTiles.forEach(function(item){
        currentLevel.drawTile(item.x, item.y);
    });
    currentLevel.critters.forEach(function(element){
        currentLevel.drawCritter(element);
    });
    
    //increment the turn counter
    currentLevel.turnCount++; 



    if (nextLevel)
    {
        loadLevel(nextLevel);
        currentLevel.drawMap();
    }

}

function loadLevel(newLevel)
{
    fetch('./leveldata/' + newLevel + '.json')
    .then((resp) => resp.json())
    .then(function(data)
        {
            currentLevel = new LevelMap(data);
            currentLevel.drawMap();
            mainGame.acceptInput = true;
        });
}

function addHighScore(newName, newScore)
{
    let newData = new Object();
    newData.playername = newName;
    newData.score = newScore;
    newData.timestamp = firebase.firestore.Timestamp.now();
    collectionRef.add(newData)
    .then(function(docRef){
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error){
        console.log("Error adding document: ", error);
    });
}

function loadHighScores()
{
    collectionRef.orderBy("score", "desc").limit(10)
        .get()
        .then(function(collections)
        {
            scoreTable.innerHTML = "";
            collections.forEach(function(doc)
            {
                let newRow = document.createElement('tr');
                let newName = document.createElement('td');
                newName.innerText = doc.data().playername;
                newRow.appendChild(newName);
                let newScore = document.createElement('td');
                newScore.innerText = doc.data().score;
                newRow.appendChild(newScore);
                scoreTable.appendChild(newRow);
            });
        })
        .catch(function(error)
        {
            console.log("Error getting documents: ", error);
        });
}

document.addEventListener("DOMContentLoaded", function(event)
    {
        setGameControls();
        loadHighScores();

        let buttonList = document.querySelectorAll('#screenbutton');
        buttonList.forEach(function(button)
        {
            button.addEventListener("mousedown", function(event)
            { 
                let destPage = event.target.getAttribute('destination');
                let sourcePage = event.target.getAttribute('source');
                mainGame.switchScreens(sourcePage, destPage);
                if (destPage == 'levelscreen')
                {
                    mainGame = new GameState();
                    loadLevel('level01');
                }
            });
        });

        document.getElementById('savebutton').addEventListener("mousedown", function(event)
        {
            let nameInput = document.getElementById('nameinput');
            let playerName = nameInput.value;
            nameInput.setAttribute('placeholder', playerName);
            addHighScore(playerName, mainGame.score);
            loadHighScores();
            let destPage = event.target.getAttribute('destination');
            let sourcePage = event.target.getAttribute('source');
            mainGame.switchScreens(sourcePage, destPage);
        });
    });



