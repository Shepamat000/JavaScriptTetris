# JavascriptTetris
 A JavaScript implementation of the game tetris, utilizing HTML Canvas and NodeJS

A JavaScript Tetris implementation, featuring a NodeJS socket.io server to host the site and communicate the current high score, and six JavaScript that create the board, pieces, player, renderer, controls, and main game logic.  The program is written in a functional programming style, and utilizes the canvas feature of HTML, implemented in game.html, to draw the game.  

Features:

 - Level progression system, with speeds increasing at variable rates depending on current level
 - Scoring system based on levels and lines cleared, with Tetris' providing the most point
 - Randomly selected pieces from the 7 tetrominos
 - Functional mobile controls and functionality

Controls (PC):
 - Left/Right arrows to move pieces
 - Down arrow to fast drop pieces by a row
 - Space bar to "instant drop" to the bottom of the board
 - Q and E to rotate pieces left and right
 - C to exchange 'hold' pieces

Controls (Mobile)
 - Tap the left and right side of the game area to move pieces
 - Tap the center of the game area to rotate pieces
 - Tap the bottom fifth of the game area to fast drop pieces by a row
 - Tap the hold box to exchange 'hold' pieces

Usage/Installation:

Offline/local (High scores will not be functional and other server features will be unavailable):
1. Clone repository
2. Run game.html in a browser

Online:
- Ensure that NodeJS is installed and up to date
1. Clone repository
2. Cd into repository location
3. Run the following commands
```
npm install
npm install express@4
npm install socket.io
```
To install dependencies

4. Run `node index.js`.  The server will now be running and direct users to game.html, and can be accessed through local host or hosted on a webserver.
