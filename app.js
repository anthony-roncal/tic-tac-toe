const $gameBoard = document.querySelector('.gameBoard');
const $spaces = document.getElementsByClassName('space');

const gameBoard = (() => {
    var gameBoardArray = ["", "", "", "", "", "", "", "", ""];

    function getGameBoard() {
        return gameBoardArray;
    }
    
    function setSpace(e) {
        let space = Array.from(e.target.parentNode.children).indexOf(e.target);
        if (gameBoardArray[space] === ""){
            gameBoardArray[space] = "X";
            $gameBoard.children[space].textContent = "X";
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
    return {name, symbol};
};

const gameController = (() => {
    const $playerOneButton = document.querySelector('.player1 > button');
    const $playerOneName = document.getElementById('name1');
    const $playerOneText = document.querySelector('.player1 > p');
    const $playerTwoButton = document.querySelector('.player2 > button');
    const $playerTwoName = document.getElementById('name2');
    const $playerTwoText = document.querySelector('.player2 > p');
    const $startButton = document.querySelector('.start');

    $playerOneButton.addEventListener('click', createPlayer);
    $playerTwoButton.addEventListener('click', createPlayer);
    $startButton.addEventListener('click', startGame);

    function createPlayer(e) {
        e.preventDefault();
        let playerName;
        if(e.target.getAttribute('data-symbol') === "X") {
            playerName = $playerOneName.value;
            $playerOneButton.disabled = true;
            $playerOneText.textContent = `${playerName} is ready!`
            $startButton.style.display = "block";
        } else {
            playerName = $playerTwoName.value;
            $playerTwoButton.disabled = true;
            $playerTwoText.textContent = `${playerName} is ready!`
            $startButton.style.display = "block";
        };
        var player = playerFactory(playerName, e.target.getAttribute('data-symbol'));
        return player;
    }

    function startGame() {
        $startButton.style.display = "none";
        displayController.render(gameBoard.getGameBoard());
        Array.from($spaces).forEach(space => {
            space.addEventListener('click', gameBoard.setSpace);
        });
    }

    return {createPlayer};
})();
