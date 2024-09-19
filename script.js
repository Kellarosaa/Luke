const words = ["apple", "grape", "peach", "berry", "melon"];
let randomWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;

document.getElementById('submit-guess').addEventListener('click', () => {
    const guess = document.getElementById('guess-input').value.toLowerCase();
    if (guess.length !== 5) {
        alert("Please enter a 5-letter word.");
        return;
    }
    attempts++;
    displayGuess(guess);
    checkGuess(guess);
    document.getElementById('guess-input').value = '';
});

function displayGuess(guess) {
    const gameBoard = document.getElementById('game-board');
    const guessRow = document.createElement('div');
    guessRow.className = 'guess-row';
    
    for (let i = 0; i < guess.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = guess[i];
        guessRow.appendChild(cell);
    }
    
    gameBoard.appendChild(guessRow);
}

function checkGuess(guess) {
    const gameBoard = document.getElementById('game-board');
    const cells = gameBoard.lastChild.children;
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === randomWord[i]) {
            cells[i].classList.add('correct');
        } else if (randomWord.includes(guess[i])) {
            cells[i].classList.add('present');
        } else {
            cells[i].classList.add('absent');
        }
    }
    
    if (guess === randomWord) {
        document.getElementById('message').textContent = "Congratulations! You've guessed the word!";
        setTimeout(() => {
            resetGame();
        }, 2000);
    } else if (attempts >= 6) {
        document.getElementById('message').textContent = `Game Over! The word was "${randomWord}".`;
        setTimeout(() => {
            resetGame();
        }, 2000);
    }
}

function resetGame() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    attempts = 0;
    document.getElementById('game-board').innerHTML = '';
    document.getElementById('message').textContent = '';
}
