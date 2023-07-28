const EMPTY = null;
const X = 'X';
const O = 'O';

function intialState(board) {
    board.push([EMPTY, EMPTY, EMPTY]);
    board.push([EMPTY, EMPTY, EMPTY]);
    board.push([EMPTY, EMPTY, EMPTY]);
}

// loop on the current board and calculate next player
// return null if the board is full
function player(board) {

    let numberOfX = 0;
    let numberOfO = 0;

    for (const row of board) {
        for (const cell of row) {
            if (cell == X) {
                numberOfX++;
            }
            else if (cell == O) {
                numberOfO++;
            }
        }
    }

    if (numberOfX + numberOfO == 9) {
        return null;
    }
    else if (numberOfX > numberOfO) {
        return O;
    }
    return X;
}

function actionValidate(board, action) {
    if (board[action[0]][action[1]] == EMPTY) {
        return true
    }
    return false;
}

function winner(board) {
    // check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != EMPTY) {
            return board[i][0];
        }
    }

    // check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] == board[1][0] && board[1][0] == board[2][0] && board[0][i] != EMPTY) {
            return board[0][i];
        }
    }

    // check main diagonal
    for (let i = 0; i < 3; i++) {
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != EMPTY) {
            return board[0][0];
        }
    }

    // check sec diagonal
    for (let i = 0; i < 3; i++) {
        if (board[2][0] == board[1][1] && board[1][1] == [0][2] && board[1][1] != EMPTY) {
            return board[1][1];
        }
    }

    return null;
}

function terminal(board) {
    if (winner(board) != null || player(board) == null) {
        return true;
    }
    else {
        return false;
    }
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
