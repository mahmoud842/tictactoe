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
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != EMPTY) {
            return board[0][i];
        }
    }

    // check main diagonal
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != EMPTY) {
        return board[0][0];
    }

    // check sec diagonal
    if (board[2][0] == board[1][1] && board[1][1] == [0][2] && board[1][1] != EMPTY) {
        return board[1][1];
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

function actions(board) {
    let availableActions = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == EMPTY) {
                availableActions.push([i, j]);
            }
        }
    }
    return availableActions;
}

function result(board, action) {
    let newBoard = structuredClone(board);
    // console.log(action[0], action[1]);
    newBoard[action[0]][action[1]] = player(board);
    return newBoard;
}

// this function is only called when terminal returns true
function utility(board) {
    let winner_ = winner(board);
    if (winner_ == X) {
        return 1;
    }
    else if (winner_ == O) {
        return -1;
    }
    return 0;
}

// Math.max(), Math.min()

function maxValue(board) {
    let v = -100;
    if (terminal(board)) {
        return utility(board);
    }

    for (const action of actions(board)) {
        v = Math.max(v, minValue(result(board, action)));
    }

    return v;
}

function minValue(board) {
    let v = 100;
    if (terminal(board)) {
        return utility(board);
    }

    for (const action of actions(board)) {
        v = Math.min(v, maxValue(result(board, action)));
    }

    return v;
}

function minimax() {
    if (terminal(board)) {
        return null;
    }

    let playerTurn = player(board);
    let actionsScoresList = [];
    let value = 0;

    if (playerTurn == X) {
        for (const action of actions(board)) {
            value = minValue(result(board, action));
            actionsScoresList.push([value, action]);
        }

        let max = [-10, [-1, -1]];
        for (const tmp of actionsScoresList) {
            // console.log('in minimax tmp[0]=', tmp[0], ' max[0]=', max[0]);
            if (tmp[0] > max[0]) {
                max = tmp;
            }
        }

        return max[1];
    }
    else {
        for (const action of actions(board)) {
            value = maxValue(result(board, action));
            actionsScoresList.push([value, action]);
        }

        let min = [10, [-1, -1]];
        for (const tmp of actionsScoresList) {
            if (tmp[0] < min[0]) {
                min = tmp;
            }
        }

        return min[1];
    }
}
