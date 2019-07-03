// game.js
const tic = require('./tic-tac-toe.js');
const readlineSync = require('readline-sync');

var computerMoves = [];
var playerMoves = [];


try{
  const arr = process.argv[2] ? JSON.parse(process.argv[2]) : undefined;

  if(arr.length>0){
    if(arr[0].length>0){
      var computerMoves = arr[0];
    }
    if(arr[1].length>0){
    var playerMoves = arr[1];
  }

  }
  console.log("Computer will make the following moves ", arr[0]);
  console.log("Player will make the following moves", arr[1]);
}catch{

}



console.log("\n Shall we play a game of TIC TAC TOE?");

var width = readlineSync.question("How wide should the board be? (1-26)");
while(isNaN(width)===true || width<=0 || width>26){
  width = readlineSync.question("How wide should the board be? (1-26)");
}


var flag = true;
while(flag){
  letter = readlineSync.question("Pick your letter: (X or O)");
  if(letter == "X"){
    flag = false;
  }else if (letter == "O"){
    flag = false;
  }else{
    flag = true
  }
}


console.log("Player is ", letter, "\n");
var letter2;

if(letter == "X"){
  letter2 = "O"
}else if(letter == "O"){
  letter2 = "X"
}



var board = tic.board(width, width);
console.log(tic.boardToString(board), + "\n");

if(letter == "O" && computerMoves.length==0){
  readlineSync.question("Press <Enter> to show computers move");
  var computersmove = tic.getRandomEmptyCellIndex(board);
  board[computersmove] = letter2;
  console.log(tic.boardToString(board));
}else if(computerMoves.length>0 && letter == "O"){
  //scripted computer move
  const arr = computerMoves.splice(0, 1)[0];
    // make sure it's a valid move! from homework guide
    if(tic.isValidMove(board, arr[0], arr[1])) {
        move = {'row':arr[0], 'col':arr[1]};
    }
    board[tic.toIndex(board, move.row, move.col)] = letter2;
    console.log(tic.boardToString(board));
}





var gameend = false;
while (gameend == false){
  //first go through scripted moves;
  while(computerMoves.length>0 || playerMoves.length>0){
    console.log("Scripted Move")

    if(playerMoves.length == 0 && computerMoves.length>0){
      var nextmove = false;
      while(nextmove == false){
        var move = readlineSync.question("What is your move?");
        if(tic.algebraicToRowCol(move)!= undefined){
          if(tic.isValidMoveAlgebraicNotation(board, move)){
            nextmove = true;
          }else{
            console.log("Your move must be in a format, and it must specify an existing empty cell");
          }
        }else{
          console.log("Your move must be in a format, and it must specify an existing empty cell");
        }
      }

      //valid move
      board = tic.placeLetters(board, letter, move);
      console.log(tic.boardToString(board));
      if(checkEnd(board)==true){
        gameend = true;
        continue;
      }


    }
    if(playerMoves.length>0){
      var temparray = playerMoves.splice(0,1)[0];
      if(tic.isValidMove(board, temparray[0], temparray[1])){
        board[tic.toIndex(board, temparray[0], temparray[1])] = letter;
      }
      readlineSync.question("Press <Enter> to show scripted move")
      console.log(tic.boardToString(board));


    }

      if(computerMoves.length == 0 && playerMoves.length > 0){
        var randommove = tic.getRandomEmptyCellIndex(board);
        board[randommove] = letter2;
        readlineSync.question("Press <Enter> to show scripted move")
        console.log(tic.boardToString(board));
      }



    if(computerMoves.length>0){
      var temparray = computerMoves.splice(0,1)[0];
      if(tic.isValidMove(board, temparray[0], temparray[1])){
        board[tic.toIndex(board, temparray[0], temparray[1])] = letter2;
      }
      readlineSync.question("Press <Enter> to show scripted move")
      console.log(tic.boardToString(board));



    }

  }

  if(checkEnd(board)==true){
    gameend = true;
    continue;
  }

  var nextmove = false;
  while(nextmove == false){
    var move = readlineSync.question("What is your move?");
    if(tic.algebraicToRowCol(move)!= undefined){
      if(tic.isValidMoveAlgebraicNotation(board, move)){
        nextmove = true;
      }else{
        console.log("Your move must be in a format, and it must specify an existing empty cell");
      }
    }else{
      console.log("Your move must be in a format, and it must specify an existing empty cell");
    }
  }

  //valid move
  board = tic.placeLetters(board, letter, move);
  console.log(tic.boardToString(board));
  if(checkEnd(board)==true){
    gameend = true;
    continue;
  }

  readlineSync.question("Press <Enter> to show computers move");
  var computersmove = tic.getRandomEmptyCellIndex(board);
  board[computersmove] = letter2;
  console.log(tic.boardToString(board));

    if(checkEnd(board)==true){
      gameend = true;
    }


}


function checkEnd(board){
  var message = ""
  var gameend = false;
  if(tic.getWinnerRows(board)!= undefined){
    gameend = true;
    if(letter == tic.getWinnerRows(board)){
      message = message + "You Win";
    }else{
      message = message + "Computer Won";
    }
    console.log(message);

  }
  else if(tic.getWinnerCols(board)!=undefined){
    gameend = true;
    if(letter == tic.getWinnerCols(board)){
      message = message + "You Win";
    }else{
      message = message + "Computer Won";
    }
    console.log(message);

  }
  else if(tic.getWinnerDiagonals(board)!=undefined){
    gameend = true;
    if(letter == tic.getWinnerDiagonals(board)){
      message = message + "You Win";
    }else{
      message = message + "Computer Won";
    }
    console.log(message);

  }

  else if(tic.isBoardFull(board) == true){
    gameend = true;
    message = message + "Tied";
    console.log(message);
  }

  return gameend;

}
