const gameBoard = (() => {
    var gameBoardArray = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

    function getGameBoard()  {
        return gameBoardArray;
    }

    return {getGameBoard};
})();

const displayController = (() => {

    function render(gameBoardArray) {
        gameBoardArray.forEach(element => {
            const gameBoard = document.querySelector('.gameBoard');
            const space = document.createElement('div');
            space.classList.add('space');
            space.textContent = element;

            gameBoard.appendChild(space);
        });


    }

    return {render};
})();

displayController.render(gameBoard.getGameBoard());