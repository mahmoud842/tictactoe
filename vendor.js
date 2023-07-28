// pages
const homePage = document.getElementById('home');
const difficultyModePage = document.getElementById('difficulry-mode');
const playAsPage = document.getElementById('play-as');
const boardPage = document.getElementById('board');

// buttons
const playerVsPlayerBtn = document.getElementById('palyer-vs-player');
const playerVsComputerBtn = document.getElementById('palyer-vs-computer');

// board
const board = [];
const boardObjs = [];

// options
const gameOptions = {
    AI: false,
    AIChar: null,
    AITurn: false,
    playerCharacter: 'X',
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
    console.log('AI');
}

function gameSetup() {
    // setup board:
    // getting all the cells of the board
    // change to board page
    // add click event listener to the cells
    // intialize and display empty board
    boardQuery();
    homePage.style.display = 'none';
    boardPage.style.display = 'flex';
    intialState(board);
    addEvenetListenerToCells();
    display();
}

function gameLoop() {
    console.log('reached game loop');
}

// click handler for each cell in the board
function cellsEvent(action) {
    if (gameOptions.waitingForUserInput) {
        console.log(action);
        gameLoop();
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