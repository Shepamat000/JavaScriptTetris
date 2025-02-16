// Search for rows cleared
function arenaSweep() {

    let rowsCleared = 0;

    outer: for (let y = arena.length - 1; y >= 0; y--) {
        for (let x = 0; x < arena[y].length; x++) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice (y, 1)[0].fill(0);
        arena.unshift(row);
        y++;
        rowsCleared++;

        if (level < 8) dropInterval = 1000 - (level) * 100;
        else if (level < 15) dropInterval = 1000 - (7) * 100 - (level - 7) * 30;
        else dropInterval = 1000 - (7) * 100 - (5) * 50 - (level - 15) * 10;
    }
    // Update score and lines
    // Scoring algorithm: 50 for one line, 100 for two lines, 200 for three lines, and 400 for a tetris, multiplied by current level
    if (rowsCleared >= 1) player.score += 50 * (2 ** (rowsCleared - 1)) * (level + 1);

    player.lines += rowsCleared;

    if (player.lines >= (level + 1) * 10) {
        if (level < 19) {
            level++;
        }
    }
}

// Save player piece to board
function merge (arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }     
        });
    });
}

// Player piece collides with board
function collides(arena, player) {
    const [pMatrix, pPos] = [player.matrix, player.pos];

    // Iterate over the players piece
    for (let y = 0; y < pMatrix.length; y++) {
        for (let x = 0; x < pMatrix[y].length; x++) {
            // Collision
            if (pMatrix[y][x] !== 0 && (arena[y + pPos.y] && arena[y + pPos.y][x + pPos.x]) !== 0) {
                return true;
            }
        }
    }
    return false; 
}
