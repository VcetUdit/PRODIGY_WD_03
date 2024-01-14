let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let vsAi = true; 
let player1Name = 'Player 1';
let player2Name = 'Player 2';

function startGame(opponent) {
    vsAi = opponent === 'ai';

    if (!vsAi) {
        player1Name = prompt('Enter Player 1\'s name:', 'Player 1') || 'Player 1';
        player2Name = prompt('Enter Player 2\'s name:', 'Player 2') || 'Player 2';
    }

    resetGame();
}

function makeMove(index) {
    if (board[index] === '' && !gameOver) {
        board[index] = currentPlayer;
        renderBoard();
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (vsAi && currentPlayer === 'O' && !gameOver) {
            setTimeout(makeAiMove, 500);
        }
    }
}

function makeAiMove() {
    let emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    if (emptyCells.length > 0 && !gameOver) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        makeMove(emptyCells[randomIndex]);
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;

            
            document.getElementById('cell' + a).classList.add('winning');
            document.getElementById('cell' + b).classList.add('winning');
            document.getElementById('cell' + c).classList.add('winning');

            if (vsAi && board[a] === 'O') {
                alert('AI wins!');
            } else {
                const winnerName = board[a] === 'X' ? player1Name : player2Name;
                alert(`${winnerName} wins!`);
            }

           
            document.getElementById('rematchBtn').style.display = 'block';

            break;
        }
    }

    if (!board.includes('') && !gameOver) {
        gameOver = true;
        alert('It\'s a tie!');

        
        document.getElementById('rematchBtn').style.display = 'block';
    }
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.id = 'cell' + index;
        cellElement.innerText = cell;
        cellElement.addEventListener('click', () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;

   
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('winning'));

    document.getElementById('rematchBtn').style.display = 'none';

    renderBoard();
}

function rematch() {
    resetGame();
}


renderBoard();
