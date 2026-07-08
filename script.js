const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    const createBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(j);
            }
        }
    }


    const consoleBoard = () => console.log(board);

    return { rows, columns, board, createBoard, consoleBoard };
})();

const Player = (name, mark) => {
    const placeMark = (row, column) => {
        gameBoard.board[row][column] = mark;
        Game.checkGame(mark, name);
    }

    return { name, mark, placeMark };
}

const Game = (() => {
    const checkGame = (mark, name) => {
        const b = gameBoard.board;
        if (
            /*Check rows */
            (b[0][0] === mark && b[0][1] === mark && b[0][2] === mark) ||
            (b[1][0] === mark && b[1][1] === mark && b[1][2] === mark) ||
            (b[2][0] === mark && b[2][1] === mark && b[2][2] === mark) ||
            /*Check colums */
            (b[0][0] === mark && b[1][0] === mark && b[2][0] === mark) ||
            (b[0][1] === mark && b[1][1] === mark && b[2][1] === mark) ||
            (b[0][2] === mark && b[1][2] === mark && b[2][2] === mark) ||
            /*Check Diagonals */
            (b[0][0] === mark && b[1][1] === mark && b[2][2] === mark) ||
            (b[2][0] === mark && b[1][1] === mark && b[0][2] === mark)
        ) {
            console.log(`${name} wins!`);
            gameBoard.consoleBoard();
        }
    };

    const restartGame = () => gameBoard.createBoard();

    return { checkGame, restartGame };

})();

gameBoard.createBoard();
const player1 = Player("Jak", "X");
console.log(player1.name);
const player2 = Player("Daxter", "O");
console.log(player2.name);
gameBoard.consoleBoard();
player2.placeMark(0, 0);
player2.placeMark(1, 1);
player2.placeMark(2, 2);

