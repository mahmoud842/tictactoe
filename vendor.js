// pages
const homePage = document.getElementById('home');
const difficultyModePage = document.getElementById('difficulry-mode');
const playAsPage = document.getElementById('play-as');
const boardPage = document.getElementById('board');

// buttons
const playerVsPlayerBtn = document.getElementById('palyer-vs-player');
const playerVsComputerBtn = document.getElementById('palyer-vs-computer');

const gameOptions = {
    AI: false,
    playerCharacter: 'X'
};

function AISetup() {
    console.log('AI');
}

function gameLoop() {
    homePage.style.display = 'none';
    boardPage.style.display = 'flex';
    console.log('reached game loop');
}

playerVsPlayerBtn.addEventListener('click', gameLoop);
playerVsComputerBtn.addEventListener('click', AISetup);