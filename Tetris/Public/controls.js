// Listen for key events
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowLeft': 
            playerMove(-1);
            break;
        case 'ArrowRight': 
            playerMove( 1);
            break;
        case 'ArrowDown': 
            if (newGame === 'false' && gameOver === 'false') playerDrop();
            break;
        case ' ': 
            if (newGame === 'false' && gameOver === 'false') instantDrop();
            break;
        case 'q':
            playerRotate(-1);
            break;
        case 'c':
            if (newGame === 'false' && gameOver === 'false')
                playerSwap();
            break;
        case 'e':
            playerRotate(1);
            break;
        case 'r':
            gameOver = 'false';
            resetGame();
            break;
    }
});

// Mobile controls:
canvas.addEventListener("touchstart", (event) => {
    const touch = event.touches[0]; // Position of Tap
    const rect = canvas.getBoundingClientRect(); // Get canvas position and size

    const touchX = touch.clientX - rect.left; 
    const touchY = touch.clientY - rect.top; 
    const canvasThird = rect.width / 3; 
    if (touchY > 4 * rect.height/5) {
        playerDrop();
    } else if (touchX < canvasThird) {
        playerMove(-1);
    } else if (touchX > 2 * canvasThird) {
        playerMove( 1);
    } else {
        console.log("Tapped within the canvas");
        playerRotate(1);
    }

    event.preventDefault(); // Prevent scrolling when touching
});


// Mobile hold box
holdCanvas.addEventListener("touchstart", (event) => {
    if (newGame === 'false' && gameOver === 'false')
        playerSwap ()
    event.preventDefault(); // Prevent scrolling when touching
});