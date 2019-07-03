// tic-tac-toe.js

function board(rows, columns, initialCellValue) {
  length = rows*columns;
  var points = new Array(length);
  if(initialCellValue===undefined){
    for(var i = 0; i<length; i++){
      points[i] = '';
    }
  }else{
    for(var j = 0; j<length; j++){
      points[j] = initialCellValue;
    }

  }
  return points;
}

function toIndex(board, row, col){
    var size = Math.sqrt(board.length);
    var index = (row*size)+col;
    return index;
}

function toRowCol(board,i){
  var size = Math.sqrt(board.length);
  col = i%size;
  row = (i-col)/size;
  rowcol = {"row": row, "col":col};
  return rowcol;

}

function setBoardCell(board, letter, row, col){

  var position = toIndex(board, row, col);
  var newboard = board.slice();
  newboard[position] = letter;

  return newboard;

}



function algebraicToRowCol(algerbraicNotation){
  var size = algerbraicNotation.length;
  var letter = algerbraicNotation.charAt(0);
  var num = algerbraicNotation.substring(1);
  var isnum = /^\d+$/.test(num);
  //https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits/1779019

  if(size >= 2 && isnum===true && letter.charCodeAt(0)>64 && letter.charCodeAt(0)<91){
    var row = (letter.charCodeAt(0) - 65);
    var col = num - 1;
    return {"row": row, "col": col};
  }else{
    return undefined;
  }
}

function placeLetters(board, ...args){

  if(args.length%2 != 0){
    args.splice(-1,1);
  }
  var max = Math.sqrt(board.length);
  for(var i = 0; i<args.length; i++){
    if(i%2 === 0){
      var temp = algebraicToRowCol(args[i+1]);
      var row = temp.row;
      var col = temp.col;
      var index = toIndex(board, row, col);
        if(temp.row<max && temp.col <max && board[index] === ""){
          board = setBoardCell(board, args[i], row, col);

        }

    }
  }
  return board;

}

function boardToString(board){
  max = Math.sqrt(board.length);
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var boardstring = "     "
  for(var a = 0; a<max; a++){
    boardstring = boardstring + (a+1).toString() + "   ";
  }
  boardstring = boardstring + "\n ";
  for( var i = 0; i<max; i++){
    boardstring = boardstring + "  +"
    for(var j = 0; j<max; j++){
      boardstring = boardstring + "---+";
      if(j === max-1){
        boardstring = boardstring + "  \n" + alphabet.charAt(i) + "  ";
      }
    }
    for(var k = 0; k<max; k++){
      var index = toIndex(board, i, k);
      if(board[index]==""){
        boardstring = boardstring + "|   ";
      }else{
        boardstring = boardstring + "| " + board[index] + " ";
      }
      if(k === max-1){
        boardstring = boardstring + "|\n ";
      }
    }
    if(i===max-1)
      for( var l = 0; l<max; l++){
        if(l === 0){
          boardstring = boardstring + "  +";
        }
        boardstring = boardstring + "---+";
      }

  }
  return boardstring;

}


function equalarray(array){
  var flag = true;
  for(var i = 0; i<array.length; i++){
    if(array[0]!=array[i]){
      flag = false;
    }
  }

  return flag;
}

function getWinnerRows(board){
  var max = Math.sqrt(board.length);
  var winner = undefined;
  for(var i = 0; i<max; i++){
    var row = [];
    for(var j = 0; j<max; j++){
      var letter = board[(i*max)+j];
      row.push(letter);

    }

    if(row[0]!="" && equalarray(row) == true){
      winner = row[0];
    }
  }

  return winner;
}

function getWinnerCols(board){
  var max = Math.sqrt(board.length);
  var winner = undefined;
  for(var i = 0; i<max; i++){
    var col = [];
    for(var j = 0; j<max; j++){
      var temp = toIndex(board, j, i);
      col.push(board[temp]);
    }

    if(col[0]!="" && equalarray(col) == true){
      winner = col[0];
    }
  }
  return winner;
}

function getWinnerDiagonals(board){
  var max = Math.sqrt(board.length);
  var winner = undefined;
  for(var i = 0; i<max; i++){
    var diagonal = [];
    for(var j = 0; j<max; j++){
      var temp = toIndex(board, i, j);
      diagonal.push(board[temp]);

      i = i+1;
    }

    if(diagonal[0]!="" && equalarray(diagonal)==true){
      winner = diagonal[0];
    }
  }

  var high = max-1;
  var low = 0;
  var diagonal2 = [];
  for(var a = 0; a<max; a++){

    var temp2 = toIndex(board, high, low);

    diagonal2.push(board[temp2]);

    high = high-1;
    low = low+1;
  }

  if(diagonal2[0] !="" && equalarray(diagonal2)==true){
    winner = diagonal2[0];
  }
  return winner;
}

function isBoardFull(board){
  var max = Math.sqrt(board.length);
  var flag = true;
  for(var i = 0; i<max; i++){
    for(var j = 0; j<max; j++){
      var temp = toIndex(board, i, j);
      if(board[temp]==""){
        flag = false;
        break;
      }
    }
  }

  return flag;
}

function isValidMove(board, row, col){
  var max = Math.sqrt(board.length);
  var move = toIndex(board, row, col);
  row = move.row;
  col = move.col;

  var flag = true;
  if(row>=max){
    flag = false;
  }else if(col>=max){
    flag = false;
  }
  else if(board[move] != ""){
    flag = false;
  }

  return flag;
}

function isValidMoveAlgebraicNotation(board, algebraicNotation){
  var max = Math.sqrt(board.length);
  var rowcol = algebraicToRowCol(algebraicNotation);
  var row = rowcol.row;
  var col = rowcol.col;
  var move = toIndex(board, rowcol.row, rowcol.col);
  var flag = true;


  if(row>=max){
    flag = false;
  }else if(col >= max ){
    flag = false;
  }
  else if(move>=board.length){
    flag = false;
  }else if(board[move] != ""){
    flag = false;
  }

  return flag;

}

function getRandomEmptyCellIndex(board){
  var max = Math.sqrt(board.length);
  var empty = undefined;
  var emptys = [];
  for(var i = 0; i<max; i++){
    for(var j = 0; j<max; j++){
      var temp = toIndex(board, i, j);
      if(board[temp] == ""){
        emptys.push(temp);
      }
    }
  }

  if(emptys.length>0){
    var random = Math.floor(Math.random() * emptys.length);
    empty = emptys[random];

  }

  return empty;

}



module.exports = {
  board: board,
  toIndex: toIndex,
  toRowCol: toRowCol,
  setBoardCell: setBoardCell,
  algebraicToRowCol: algebraicToRowCol,
  placeLetters: placeLetters,
  boardToString: boardToString,
  equalarray: equalarray,
  getWinnerRows: getWinnerRows,
  getWinnerCols: getWinnerCols,
  getWinnerDiagonals: getWinnerDiagonals,
  isBoardFull: isBoardFull,
  isValidMove: isValidMove,
  isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
  getRandomEmptyCellIndex: getRandomEmptyCellIndex,
}
