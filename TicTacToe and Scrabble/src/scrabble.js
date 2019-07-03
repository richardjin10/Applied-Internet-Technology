// scrabble.js
const readline = require('readline');
const fs = require('fs');

var words;
var output = [];
var outputpairs = [];
var finaloutput = [];
const letterValues = {
        "E": 1, "A": 1, "I": 1, "O": 1, "N": 1, "R": 1, "T": 1, "L": 1, "S": 1, "U": 1,
        "D": 2, "G": 2, "B": 3, "C": 3, "M": 3, "P": 3, "F": 4, "H": 4, "V": 4, "W": 4,
        "Y": 4, "K": 5, "J": 8, "X": 8, "Q": 10, "Z": 10
};

const userPrompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.readFile('data/enable1.txt', 'utf8', function(err, data) {
  if (err) {
      console.log('uh oh', err);
  } else {
      words = data.split("\n");
  }

});



function compareWord(dict, word){
  dictArray = dict.split("");
  wordArray = word.split("");
  var spliced = false;
  var contains = true;
  for(var i = 0; i <dictArray.length; i++){
    spliced = false;
    for(var j = 0; j<wordArray.length;j++){
      if(dictArray[i] == wordArray[j]){
        wordArray.splice(j, 1);
        spliced = true;
      }
    }
    if(spliced == false){
      contains = false;
      break;
    }

  }

  return contains;
}

function scoreWord(word, value){
  var wordArray = word.split("");
  var points = 0;
  for(var i = 0; i<wordArray.length; i++){
    temp  = wordArray[i].toUpperCase();
    points =  points + value[temp];
  }
  return points;
}





// ask a question
userPrompt.question("Please enter some letters: ", handleUserInput);

// the callback function that's run when the readline object receives input
function handleUserInput(response) {
    console.log(response);
    console.log("The top scoring words are: ")

    for(var i = 0; i<words.length; i++){
      if(compareWord(words[i], response) === true){
        output.push(words[i]);
      }
    }

    for(var i = 0; i<output.length; i++){
      var value = scoreWord(output[i], letterValues);
      var tempScore = {
        word: output[i],
        score: value,
      }

      outputpairs.push(tempScore);
    }



    outputpairs.sort(function(a,b){
      var nameA = a.score;
      var nameB = b.score;

      if(nameA<nameB){
        return 1;
      }
      if(nameA>nameB){
        return -1;
      }

      return 0;
    });

    if(outputpairs.length>=5){
      for(var k = 0; k<5; k++){
        var temp = outputpairs[k]
        console.log(temp.score, temp.word);

      }
    }else{
      for(var u = 0; u<outputpairs.length-1; u++){
        var temp = outputpairs[u]
        console.log(temp.score, temp.word);
      }
    }





    userPrompt.close();
}
