// Creates specified piece
function createPiece(type) {
    switch (type) {
        case 'T':
            return [[0, 0, 0],
                    [1, 1, 1],
                    [0, 1, 0]];
            break;
        case 'O':
            return [[2, 2],
                    [2, 2]];
            break;
        case 'I':
            return [[0, 3, 0, 0],
                    [0, 3, 0, 0],
                    [0, 3, 0, 0],
                    [0, 3, 0, 0]];
            break;
        case 'S':
            return [[0, 4, 4],
                    [4, 4, 0],
                    [0, 0, 0]];
            break;        
        case 'Z':
            return [[5, 5, 0],
                    [0, 5, 5],
                    [0, 0, 0]];
            break;
        case 'L':
            return [[0, 6, 0],
                    [0, 6, 0],
                    [0, 6, 6]];
            break;
        case 'J':
            return [[0, 7, 0],
                    [0, 7, 0],
                    [7, 7, 0]];
            break;   
        case 'Empty':
            return [[0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]];
            break;        
    }
}

function newPiece() {
    const pieces = ['I', 'L', 'J', 'O', 'T', 'S', 'Z'];
    return createPiece(pieces[Math.floor(Math.random() * 7)]);
}

function rotate (matrix, direction) {
    // Swaps each with its diagonal. So, (0, 1) swaps with (1, 0)
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < y; x++){ 
            [matrix[x][y], matrix[y][x]] =  [matrix[y][x], matrix[x][y]];
        }
    }

    // Reversing the matrix after the above operation gives us a rotated piece.  We rotate vertically for left, horizontally for right
    if (direction > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

