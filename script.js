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

    return { board, createBoard};
})();

const Player = (name, mark) => {
    let turnToken = true;
    const placeMark = (row, column) => {
        let cell = gameBoard.board;
        if (cell[row][column] === "X" || cell[row][column] === "O") {
            console.log("This spot is already taken. Try another move.");
        } else {
            cell[row][column] = mark;
            Game.checkGame(mark, name);
            return mark;
        }
    };

    return { name, mark, turnToken, placeMark };
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
            gameGUI.showResult(name);
            gameGUI.cleanBoard();
        }

    };

    const restartGame = () => gameBoard.createBoard();

    return {checkGame, restartGame };

})();

const gameGUI = (() => {
    const main = document.querySelector(".main");
    const boardGUI = document.querySelector(".board");
    board = gameBoard.board;
    i = 1;

    const displayBoard = () => {
        gameBoard.createBoard();
        for (row of board) {
            for (column of row) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("id", `cell-${i}`);
                cell.setAttribute("data-row", `${board.indexOf(row)}`);
                cell.setAttribute("data-column", `${row.indexOf(column)}`);
                i++;
                boardGUI.appendChild(cell);
            }
        }
    };

    const markSpot = (player1, player2) => {
        boardGUI.addEventListener("click", (event) => {
            target = event.target;
            console.log(target.id);
            console.log(`Row: ${target.dataset.row}; Column : ${target.dataset.column}`);
            let row = target.dataset.row;
            let column = target.dataset.column;

            if (target.textContent === "X" || target.textContent === "O") {
                const message = "This spot is already taken. Try another one!"
                const messageContainer = document.createElement("div");
                messageContainer.classList.add("message");
                messageContainer.textContent = message;
                main.appendChild(messageContainer);
            }
            else if (player1.turnToken === true) {
                mark = player1.placeMark(row, column);
                player1.turnToken = false;
            }
            else {
                mark = player2.placeMark(row, column);
                player1.turnToken = true;
            }
            target.textContent = mark;
        });    
    }  

    const cleanBoard = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => boardGUI.removeChild(cell));
        gameBoard.createBoard();
        gameGUI.displayBoard();
    };

    const startGame = () => {
        playerFrom = document.querySelector(".player-creation");
        start = document.querySelector(".btn-start");
        start.addEventListener("click", () => {
            playerFrom.removeAttribute("hidden");
            gameGUI.createPlayer;
        });
    };

    const createPlayer = () => {
        const sub = document.querySelector(".btn-sub");
        sub.addEventListener("click", event => {
            event.preventDefault();
            const player1Name = document.getElementById("player1").value;
            const mark1 = document.getElementById("X").value;
            const player2Name = document.getElementById("player2").value;
            const mark2 = document.getElementById("O").value;
            const player1 = Player(player1Name, mark1);
            const player2 = Player(player2Name, mark2);
            gameGUI.markSpot(player1, player2);
        });
    };

    const showResult = (winner) => {
        const result = document.querySelector("#result");
        result.textContent = `${winner} wins!`;
    };

return {displayBoard, markSpot, cleanBoard, startGame, createPlayer, showResult};
}) ();


gameGUI.displayBoard();
gameGUI.startGame();



/*Notes
*Alla fine della partita, prevenire il comporatmento dell'event listener per far smettere al giocatore di premere e mostrare un tasto che propone di iniziare un nuovo round che ha un event listener
che richiama la funzione cleanBoard.

Il bottone Start Game deve richiamare createPlayer e fare apparire il form

*Miglioare l'aspetto grafico per renderlo più dinamico
*/
