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
        if (gameBoardArray[space] === ""){
            if(round%2 === 0) {
                gameBoardArray[space] = players[0].symbol;
                $gameBoard.children[space].textContent = players[0].symbol;
            } else {
                gameBoardArray[space] = players[1].symbol;
                $gameBoard.children[space].textContent = players[1].symbol;
            }
            gameController.setRound(round+1);
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

    return {render};
})();

const playerFactory = (name, symbol) => {
    function chooseSpace() {
        
    }

    return {name, symbol, chooseSpace};
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

    function createPlayer(e) {
        e.preventDefault();
        let playerName;
        if(e.target.getAttribute('data-symbol') === "X") {
            playerName = $playerOneName.value;
            $playerOneButton.disabled = true;
            $playerOneText.textContent = `${playerName} is ready!`
            $startButton.style.display = "block";
            var player = playerFactory(playerName, e.target.getAttribute('data-symbol'));
            players[0] = player;
        } else {
            playerName = $playerTwoName.value;
            $playerTwoButton.disabled = true;
            $playerTwoText.textContent = `${playerName} is ready!`
            $startButton.style.display = "block";
            var player = playerFactory(playerName, e.target.getAttribute('data-symbol'));
            players[1] = player;
        };
    }

    function startGame() {
        $startButton.style.display = "none";
        $playerOneForm.style.display = "none";
        $playerTwoForm.style.display = "none";
        displayController.render(gameBoard.getGameBoard());
        Array.from($spaces).forEach(space => {
            space.addEventListener('click', gameBoard.setSpace);
        });
        round = 0;
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

    return {getRound, setRound, getPlayers, resetGame};
})();
