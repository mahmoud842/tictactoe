EMPTY = null;
X = 'X';
O = 'O';

function intialState(board) {
    board.push([EMPTY, EMPTY, EMPTY]);
    board.push([EMPTY, EMPTY, EMPTY]);
    board.push([EMPTY, EMPTY, EMPTY]);
}

function player() {
    tmp = gameOptions.playerCharacter;
    if (tmp == X) {
        gameOptions.playerCharacter = O;
    }
    else {
        gameOptions.playerCharacter = X;
    }
    return tmp
}

function terminal() {
    console.log('terminal not implemented');
}

function winner() {
    console.log('winner not implemented');
}

function actions() {
    console.log('action not implemented');
}

function result() {
    console.log('result not implemented');
}

function utility() {
    console.log('utililty not implemented');
}

function minimax() {
    console.log('minimax not implemented');
}
