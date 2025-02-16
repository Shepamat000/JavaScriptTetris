const canvas = document.getElementById('Tetris');
const holdCanvas = document.getElementById('Hold');
const context = canvas.getContext('2d');
const holdContext = holdCanvas.getContext('2d');

canvas.width = 300;
canvas.height = 600;

// Game settings
const columns = 10;
const rows = 20;
var dropInterval = 1000; // Starting speed
var level = 0;
const startingLevel = 0;

var gameOver = 'false';
var newGame = 'true';

var userName = 'Anonymous';

var highScore = [0, 'Anonymous'];

const arena = createMatrix(10, 20);

function createMatrix (width, height) {
    const matrix = [];
    while (height > 0) {
        height--;
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}   

function startGame() {
    newGame = 'false';
    let inputField = document.getElementById("Name-entry-input");

    userName = inputField.value;
    if (userName.length === 0) userName = 'Anonymous';
    inputField.value = userName;
    inputField.disabled = true;

    const play = document.getElementById('Play-button');
    play.remove();
    update();
}

function resetGame () {
    player.pos.x = (columns/2 | 0) - (player.matrix[0].length/2 | 0);
    player.pos.y = 0;
    player.matrix = newPiece();

    arena.forEach(row => row.fill(0));
    player.score = 0;
    player.lines = 0;
    level - 0;
}

let dropCounter = 0;
let lastTime = 0
// The main thread, this will constantly run
function update (time = 0) {
    if (newGame === 'false') { // Wait if there is a new game
        // Update time
        const deltaTime = time - lastTime;
        lastTime = time;

        // Drop pieces every dropInterval ms
        dropCounter += deltaTime;
        if (dropCounter > dropInterval) {
            playerDrop();
        }

        draw();
        updateScore();

        // Continues thread
        requestAnimationFrame(update);
    }
}

function updateScore() {
    if (player.score > highScore[0]) {
        socket.emit('newHighScore', [player.score, userName]);
    }

    document.getElementById('score').innerText = "Score: " + player.score;
    document.getElementById('lines').innerText = "Lines: " + player.lines;
    document.getElementById('high-score').innerText = "High Score: " + highScore[0] + ' by ' + highScore[1];
    document.getElementById('level').innerText = "Level: " + level;
}


// Main thread
initializeRender();

var socket = io();
socket.emit('tetrisConnect', 1);

socket.on('Tetris High Score', function (newHighScore) {
    highScore = newHighScore;
    updateScore();
});

document.getElementById('high-score').innerText = "High Score: " + highScore;
resetPlayer();
// Initial code
update();