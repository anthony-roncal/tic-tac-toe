const $gameBoard = document.querySelector('.gameBoard');
const $spaces = document.getElementsByClassName('space');

const gameBoard = (() => {
    var gameBoardArray = ["", "", "", "", "", "", "", "", ""];

    function getGameBoard() {
        return gameBoardArray;
    }
    
    function setSpace(e) {
        let space = Array.from(e.target.parentNode.children).indexOf(e.target);
        let round = gameController.getRound();
        let players = gameController.getPlayers();
        let gameOver = gameController.isGameOver();
        if (gameBoardArray[space] === "" && !gameOver){
            if(round%2 === 0) {
                gameBoardArray[space] = players[0].symbol;
                $gameBoard.children[space].textContent = players[0].symbol;
            } else {
                gameBoardArray[space] = players[1].symbol;
                $gameBoard.children[space].textContent = players[1].symbol;
            }
            gameController.checkForWins();
            gameController.setRound(round+1);
            displayController.updateAnnouncement();
        }
    }

    function resetBoard() {
        gameBoardArray = ["", "", "", "", "", "", "", "", ""];
        Array.from($spaces).forEach(space => {
            space.textContent = "";
        });
    }

    return {getGameBoard, setSpace, resetBoard};
})();

const displayController = (() => {
    $message = document.querySelector('.announcement');

    function render(gameBoardArray) {
        Array.from($gameBoard.children).forEach(space => {
            $gameBoard.removeChild(space);
        });
        gameBoardArray.forEach(element => {
            const space = document.createElement('div');
            space.classList.add('space');
            space.textContent = element;    
            $gameBoard.appendChild(space);
        });
    }

    function updateAnnouncement() {
        let gameOver = gameController.isGameOver();
        let roundNumber = gameController.getRound();
        if(roundNumber < 9) {
            if(!gameOver) {
                if (gameController.getRound()%2 ===0){
                    $message.textContent = `It's ${gameController.getPlayers()[0].name}'s turn`;
                } else {
                    $message.textContent = `It's ${gameController.getPlayers()[1].name}'s turn`;
                }
            } else {
                if (gameController.getRound()%2 ===0){
                    $message.textContent = `${gameController.getPlayers()[1].name} WON!`;
                } else {
                    $message.textContent = `${gameController.getPlayers()[0].name} WON!`;
                }
            }
        } else {
            $message.textContent = `TIE!`;
            gameController.$startButton.style.display = "block";
        }
    }

    return {render, updateAnnouncement};
})();

const playerFactory = (name, symbol) => {
    return {name, symbol};
};

const gameController = (() => {
    const $playerOneForm = document.querySelector('.player1');
    const $playerOneButton = document.querySelector('.player1 > button');
    const $playerOneName = document.getElementById('name1');
    const $playerOneText = document.querySelector('.player1 > p');
    const $playerTwoForm = document.querySelector('.player2');
    const $playerTwoButton = document.querySelector('.player2 > button');
    const $playerTwoName = document.getElementById('name2');
    const $playerTwoText = document.querySelector('.player2 > p');
    const $startButton = document.querySelector('.start');

    $playerOneButton.addEventListener('click', createPlayer);
    $playerTwoButton.addEventListener('click', createPlayer);
    $startButton.addEventListener('click', startGame);

    let round = 0;
    let players = [];
    let gameOver = false;

    function createPlayer(e) {
        if(e.target.getAttribute('data-symbol') === "X"){
            if(!$playerOneForm.checkValidity()){
                $playerOneForm.reportValidity();
            } else {
                e.preventDefault();
                let playerName;
                playerName = $playerOneName.value;
                $playerOneButton.disabled = true;
                $playerOneText.textContent = `${playerName} is ready!`
                $startButton.style.display = "block";
                var player = playerFactory(playerName, e.target.getAttribute('data-symbol'));
                players[0] = player;
            }
        } else {
            if(!$playerTwoForm.checkValidity()){
                $playerTwoForm.reportValidity();
            } else {
                playerName = $playerTwoName.value;
                $playerTwoButton.disabled = true;
                $playerTwoText.textContent = `${playerName} is ready!`
                $startButton.style.display = "block";
                var player = playerFactory(playerName, e.target.getAttribute('data-symbol'));
                players[1] = player;
            }
        }
    }

    function startGame() {
        gameBoard.resetBoard();
        $startButton.style.display = "none";
        $playerOneForm.style.display = "none";
        $playerTwoForm.style.display = "none";
        displayController.render(gameBoard.getGameBoard());
        Array.from($spaces).forEach(space => {
            space.addEventListener('click', gameBoard.setSpace);
        });
        round = 0;
        gameOver = false;
        displayController.updateAnnouncement();
    }
    
    function compareSpaces(a, b, c) {
        let currentGameBoard = gameBoard.getGameBoard();
        if(currentGameBoard[a] !== '' && currentGameBoard[a] === currentGameBoard[b] && currentGameBoard[b] === currentGameBoard[c]) {
            return true;
        } else {
            return false;
        }
    }

    function checkForWins() {
        if(compareSpaces(0, 1, 2) || compareSpaces(3, 4, 5) || compareSpaces(6, 7, 8) || 
            compareSpaces(0, 3, 6) || compareSpaces(1, 4, 7) || compareSpaces(2, 5, 8) ||
            compareSpaces(0, 4, 8) || compareSpaces(2, 4, 6)) {
            gameOver = true;
            $startButton.style.display = "block";
        }
    }

    function resetGame() {
        round = 0;
        players = [];
    }

    function getRound() {
        return round;
    }

    function setRound(roundNumber) {
        round = roundNumber;
    }

    function getPlayers() {
        return players;
    }

    function isGameOver() {
        return gameOver;
    }

    return {getRound, setRound, getPlayers, checkForWins, resetGame, isGameOver, $startButton};
})();
