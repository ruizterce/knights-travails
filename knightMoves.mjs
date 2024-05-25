// Class containing a chess board square coordinates
class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // Square visited before this one
    this.previousSquare;
    // Possible move offset from a given square for the knight
    this.MOVE_OFFSETS = [
      [1, 2],
      [1, -2],
      [2, 1],
      [2, -1],
      [-1, 2],
      [-1, -2],
      [-2, 1],
      [-2, -1],
    ];
  }
  // Check if a Square has the same coordinates
  equals(square) {
    return this.x === square.x && this.y === square.y;
  }
}

// Return an array of coordinate pairs showing the shortest path (one of them) between two given coordinate pair arrays [x,y]
function knightMoves(start, finish) {
  const origin = new Square(...start);
  const target = new Square(...finish);

  // Generate all possible moves starting from target square until a square equal to origin is found
  const queue = [target];
  let winner;
  while (!queue.some((square) => square.equals(origin))) {
    const currentSquare = queue.shift();
    // Generate every possible newSquare the knight can move to from the currentSquare
    currentSquare.MOVE_OFFSETS.forEach((e) => {
      if (currentSquare.x + e[0] >= 0 && currentSquare.y + e[1] >= 0) {
        const newSquare = new Square(
          currentSquare.x + e[0],
          currentSquare.y + e[1]
        );
        // Save the previous square to allow tracing back the moves done on each iteration
        newSquare.previousSquare = currentSquare;

        // Stop if origin is found
        if (newSquare.equals(origin)) {
          winner = newSquare;
        }
        queue.push(newSquare);
      }
    });
  }
  // Create an array with the winner square, add it's previousSquare and iterate to it until there's no more (target square)
  const moveList = [[origin.x, origin.y]];
  while (winner.previousSquare != null) {
    moveList.push([winner.previousSquare.x, winner.previousSquare.y]);
    winner = winner.previousSquare;
  }

  return moveList;
}

console.log("Shortest path between 0,0 and 1,2");
console.log(...knightMoves([0, 0], [1, 2]));
console.log("Shortest path between 3,3 and 0,0");
console.log(...knightMoves([3, 3], [0, 0]));
console.log("Shortest path between 5,4 and 5,5");
console.log(...knightMoves([5, 4], [5, 5]));
console.log("Shortest path between 1,1 and 7,7");
console.log(...knightMoves([1, 1], [7, 7]));
