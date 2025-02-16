// Represents player positions and current piece
const player = {
    pos: {x: 5, y: 0},
    matrix: newPiece(),
    holdPiece: createPiece('Empty'),
    hasHold: false,
    score: 0,
    lines: 0,
}

function resetPlayer () {
    player.pos.x = (columns/2 | 0) - (player.matrix[0].length/2 | 0);
    player.pos.y = 0;
    player.matrix = newPiece();

   // Game is over if player still collides after resetting
   if (collides(arena, player)) {
        // For now, we will just reset the arena on death
       gameOver = 'true';
    }
}

// Left and right movements
function playerMove(xDistance) {
    player.pos.x += xDistance;
    if (collides(arena, player)) {
        player.pos.x -= xDistance;
    }
}

// Rotate the players piece
function playerRotate(direction) {
    const prevPos = player.pos.x;
    let offset = 1;

    // Uses rotate from pieces.js
    rotate(player.matrix, direction);
    while (collides(arena, player)) {
        player.pos.x += offset;
        offset = 2 * -offset;
        // Rotation is not possible
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -direction);
            player.pos.x = prevPos;
            return; 
        }
    }
}

// Downwards movement
function playerDrop () {
    player.pos.y++;
    if (collides(arena, player)) {
        player.pos.y--;
        merge (arena, player);
        arenaSweep();
        resetPlayer();
    }
    dropCounter = 0;
}

// Insantly drops piece
function instantDrop () {
    while (!collides(arena, player)) {
        player.pos.y++;
    }
    player.pos.y--;
    merge (arena, player);
    arenaSweep();
    resetPlayer();
    dropCounter = 0;
}
