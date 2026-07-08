const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(j);
        }
    }

    const consoleBoard = () => console.log(board);

    return {rows, columns, board, consoleBoard};
})();

const Player = (name, mark) => {
    const score = 0;
    const placeMark = (mark, i, j) => {
        gameBoard.board[i][j] = mark;
        Game.checkGame(mark, name);
    }
    const increaseScore = () => score++;

    return {name, mark, score, placeMark, increaseScore};
}

const Game = (() =>{
    const round = true;

    const checkGame = (mark, name) =>{
        while(round === true){
            if(gameBoard.board[0] === [mark, mark, mark] || gameBoard.board[1] === [mark, mark, mark] || gameBoard.board[2] === [mark, mark, mark]){
                round = false;
                
            }
            else{
                break;
            }
        }
        return console.log(`${name} wins.`);
    };

    const restartGame = () => round = true;

    return {round, checkGame, restartGame};
    
})();

/*Creating players */
const player1 = Player("Jak", "X");
console.log(player1.name);
const player2 = Player("Daxter", "O");
console.log(player2.name);
gameBoard.consoleBoard();
player1.placeMark(player1.mark, 0, 0);
player1.placeMark(player1.mark, 0, 1);
player1.placeMark(player1.mark, 0, 2);