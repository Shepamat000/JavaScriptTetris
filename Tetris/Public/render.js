
// Color palette
const colors = [
    '#fff030',
    '#ff03ee',
    '#146eff',
    '#57ff65',
    '#b429ff',
    '#ff9429',
    '#fc1c1c',
];

function initializeRender () {
    // Automatically scale canvas positions based on parameters
    context.scale(canvas.width/columns, canvas.height/rows);
    holdContext.scale(holdCanvas.width/12, holdCanvas.height/12);

    // Set black background
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
}


// Draws screen
function draw() {
    // Clear canvas
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    holdContext.fillStyle = '#000';
    holdContext.fillRect(0, 0, holdCanvas.width, holdCanvas.height);

    // Game screen
    if (gameOver === 'false') {
        drawMatrix(player.matrix, player.pos);
        drawMatrix(arena, {x:0, y:0});
        drawHoldMatrix(player.holdPiece);
    } else {
        // Gameover screen
        context.font = "1px Arial";
        context.fillStyle = '#FFF';

        canvas.textBaseline = "middle";
        canvas.textAlign = "center";
        
        context.fillText('Game Over!', 2, 8);
        context.fillText('Final Score: ' + player.score, 1.8, 9);
    }
       
}

// Paints the current piece
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value - 1];
                context.fillRect(x + offset.x, y + offset.y, .995, .995);
            }
        });
    });
}

// Paints the current piece
function drawHoldMatrix(matrix) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                holdContext.fillStyle = colors[value - 1];
                holdContext.fillRect(x * 12/(matrix.length), y * 12/(matrix.length), 12/(matrix.length), 12/(matrix.length));
            }
        });
    });
}
