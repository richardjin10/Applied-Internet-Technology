const readline = require('readline');
var request = require('request');
var fs = require('fs');
const bite = require('./bitefunc.js');

var words = [];
var dogs = [];
var data;
//fs.readFile('/Users/jin/Documents/AIT/DOHMH_Dog_Bite_Data.csv', 'utf8' , function(err, data) {
//  if (err) {
//      console.log('uh oh', err);
//  } else {
//    words = data.split("\n");
//    for(var i = 3; i<words.length; i++){
//      var line =  words[i].split(",");
//      removeSpace(line);
//      var fixedline = combineQuotes(line);
//
//      var tempdog = {
//        UniqueID: fixedline[0],
//        DateOfBite: fixedline[1],
//        Species: fixedline[2],
//        Breed: fixedline[3],
//        Age: fixedline[4],
//        Gender: fixedline[5],
//        SpayNeuter: fixedline[6],
//        Borough: fixedline[7],
//        ZipCode: fixedline[8],
//      }
//
//      dogs.push(tempdog);
//    }
//    console.log(bite.processBiteData(dogs));
//  }
//
//});





request('http://jvers.com/csci-ua.0480-fall2018-001-003/homework/02/dogbite/c86d267e9c6c89416bf9e96ba7fa62a4ba1ec93f.json', function (error, response, body) {
    // just print out the first 30 characters of the response body

    data = JSON.parse(body);
    alldata = data["data"];
    for(var i = 0; i<alldata.length; i++){
      dogs.push(alldata[i]);
    }
    //console.log(dogs.length);

    //console.log(bite.processBiteData(dogs));


})


function main(url){
  request(url, function (error, response, body) {
      // just print out the first 30 characters of the response body
      data = JSON.parse(body);
      alldata = data["data"];
      for(var i = 0; i<alldata.length; i++){
        dogs.push(alldata[i]);
      }

      var next = data["next"];
      var newurl = "http://jvers.com/csci-ua.0480-fall2018-001-003/homework/02/dogbite/" + next + ".json";

      if(next != undefined){
        main(newurl);
      }else{
        console.log(bite.processBiteData(dogs));
      }



  })
}

var url = "http://jvers.com/csci-ua.0480-fall2018-001-003/homework/02/dogbite/c86d267e9c6c89416bf9e96ba7fa62a4ba1ec93f.json"
main(url);









function combineQuotes(line){
  for(var i = 0; i<line.length; i++){
    if(line[i].charAt(0)=='"'){
      line[i] = line[i] + line[i+1];
      line.splice(i+1, 1);
    }
  }

  return line;
}

function removeSpace(line){
  for(var i = 0; i<line.length; i++){
    line[i] = line[i].trim();
  }

  return line;
}
