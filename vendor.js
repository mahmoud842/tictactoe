// pages
const homePage = document.getElementById('home');
const difficultyModePage = document.getElementById('difficulry-mode'); // not functional
const playAsPage = document.getElementById('play-as');
const boardPage = document.getElementById('board');

// home page buttons
const playerVsPlayerBtn = document.getElementById('palyer-vs-player');
const playerVsComputerBtn = document.getElementById('palyer-vs-computer');

// board
const board = [];
const boardObjs = [];

// options
const gameOptions = {
    AI: false,
    waitingForUserInput: false
};


function boardQuery() {
    // #board .board .board-cell
    tmpArr = document.getElementsByClassName('board-cell');
    for (let i = 0; i < 3; i++) {
        row = [];
        for (let j = 0; j < 3; j++) {
            row.push(tmpArr[(i * 3) + j]);
        }
        boardObjs.push(row);
    }
}

function display() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            tmp = board[i][j];
            if (tmp == null) {
                boardObjs[i][j].innerText = ' ';
            }
            else {
                boardObjs[i][j].innerText = tmp;
            }
        }
    }
}

function AISetup() {
    homePage.style.display = 'none';
    playAsPage.style.display = 'flex';

    // get playAs page buttons
    playAsX = document.getElementById('playAsX');
    playAsO = document.getElementById('playAsO');

    function playAsButtonsAction(char) {
        gameSetup();
        gameOptions.AI = true;
        if (char == O) { // if the player choose O then the AI will start
            gameOptions.AITurn = true;
            AITurn();
        }
    }

    playAsX.addEventListener('click', playAsButtonsAction.bind(this, X));
    playAsO.addEventListener('click', playAsButtonsAction.bind(this, O));
}

function gameSetup() {
    // setup board:
    // getting all the cells of the board
    // change to board page
    // add click event listener to the cells
    // intialize and display empty board
    boardQuery();
    homePage.style.display = 'none';
    playAsPage.style.display = 'none';
    boardPage.style.display = 'flex';
    intialState(board);
    addEvenetListenerToCells();
    display();
    gameOptions.waitingForUserInput = true;
}

function AITurn() {
    checkEndGame();
    let action = minimax(board);
    play(action);
    display();
}

function checkEndGame() {
    console.log('inside checkendgame');
    if (terminal(board)) {
        winChar = winner(board);
        if (winChar != null) {
            document.getElementById('board-title').innerText = `player ${winChar} won`;
        }
        else {
            document.getElementById('board-title').innerText = `Tie`;
        }
        gameOptions.waitingForUserInput = false;
        return true;
    }
    return false;
}

function play(action) {
    board[action[0]][action[1]] = player(board);
}

// click handler for each cell in the board
function cellsEvent(action) {
    if (actionValidate(board, action) && gameOptions.waitingForUserInput == true) {
        console.log(`user action (${action[0]} , ${action[1]}) approved`);
        play(action);
        display();
        if (!checkEndGame() && gameOptions.AI == true) {
            AITurn();
        }
    }
    else {
        console.log(`user action (${action[0]} , ${action[1]}) but ignored`);
    }
}

// event listener to main page buttons
playerVsPlayerBtn.addEventListener('click', gameSetup);
playerVsComputerBtn.addEventListener('click', AISetup);

// a funtion to add event listener to each cell in the board
function addEvenetListenerToCells() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            boardObjs[i][j].addEventListener('click', cellsEvent.bind(this, [i, j]));
        }
    }
}