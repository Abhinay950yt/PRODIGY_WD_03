const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  // Ignore clicks on already taken cells
  if (gameState[index] || checkWinner()) return;

  // Update game state and UI
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  // Check for winner or switch turns
  if (checkWinner()) {
    alert(`${currentPlayer} wins!`);
  } else if (!gameState.includes(null)) {
    alert('Draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  return winningCombinations.some(combination =>
    combination.every(index => gameState[index] === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = 'X';
  gameState.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
