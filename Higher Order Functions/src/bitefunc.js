// bitefunc.js

function processBiteData (data) {
  var dogs = data.map(x => x);
  //Average Age
  var ageSum = 0;
  var verifiedAge = dogs.length;
  var avgAge = 0;

  for(var i = 0; i<dogs.length; i++){
    var age = parseInt(dogs[i].Age);

    if(isNaN(age)=== true || age>50){ //maximum lifespan of dogs){
      verifiedAge = verifiedAge - 1;
    }else{
      ageSum = ageSum + age;
    }
  }

  avgAge = ageSum/verifiedAge;
  avgAge = Number(avgAge).toFixed(2);


  //Average Neutered
  var neuteredArray = dogs.filter(bite => bite.SpayNeuter === "true");
  var neutered = (neuteredArray.length/dogs.length) * 100;
  neutered = Number(neutered).toFixed(2);



  //Ten most reported Dog Breeds
  var breed = [];
  //Boroughs
  var boroughs = {
    Queens: 0,
    Brooklyn: 0,
    Manhattan: 0,
    Bronx: 0,
    "Staten Island": 0,
    "false": 0,
    "true": 0,
    "undefined": 0,
    "Other": 0,
  }

  for(var a = 0; a<dogs.length; a++){
    if(breed.includes(dogs[a].Breed)==false){
        breed.push(dogs[a].Breed);
      }

  }

  var breeds = {}
  for(var a = 0; a<breed.length; a++){
    breeds[breed[a]] = 0;
  }

  for(var a = 0; a<dogs.length; a++){
    breeds[dogs[a].Breed] = breeds[dogs[a].Breed] + 1;
    boroughs[dogs[a].Borough] = boroughs[dogs[a].Borough] + 1;
  }

  //https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
  var mostBites = []
  for(var dog in breeds){
    mostBites.push([dog, breeds[dog]]);
  }

  mostBites.sort(function(dog1, dog2){
    return dog2[1] - dog1[1];
  });

  mostBites = mostBites.filter(x=> x[0]!="UNKNOWN");

  var sortedBorough = [];
  for(var b in boroughs){
    sortedBorough.push([b, boroughs[b]]);
  }
  sortedBorough.sort(function(b1, b2){
    return b2[1] - b1[1];
  });



  //Top Dog Bite Months
  var tempdates = dogs.map(x => x);
  var datesArray = [];
  var dates = tempdates.filter(x => x.DateOfBite!=undefined);

  for(var i = 0; i<dates.length; i++){
    temp = dates[i].DateOfBite.split(" ");
    datesArray.push(temp);
  }


  var years = [];
  datesArray.forEach(function(date){
    if(years.includes(date[2]) == false){
      years.push(date[2]);
    }
  })

  var bitesperyear = {};
  for(var i = 0; i<years.length; i++){
    var temp = {
      January: 0,
      February:0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    }

    bitesperyear[years[i]] = temp;
  }

  datesArray.forEach(function(date){
    bitesperyear[date[2]][date[0]] = bitesperyear[date[2]][date[0]] + 1;
  })

  var topBiteMonths = {
    January: 0,
    February:0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  }

  for(var i = 0; i<years.length; i++){
    topBiteMonths["January"] = topBiteMonths["January"] + bitesperyear[years[i]]["January"];
    topBiteMonths["February"] = topBiteMonths["February"] + bitesperyear[years[i]]["February"];
    topBiteMonths["March"] = topBiteMonths["March"] + bitesperyear[years[i]]["March"];
    topBiteMonths["April"] = topBiteMonths["April"] + bitesperyear[years[i]]["April"];
    topBiteMonths["May"] = topBiteMonths["May"] + bitesperyear[years[i]]["May"];
    topBiteMonths["June"] = topBiteMonths["June"] + bitesperyear[years[i]]["June"];
    topBiteMonths["July"] = topBiteMonths["July"] + bitesperyear[years[i]]["July"];
    topBiteMonths["August"] = topBiteMonths["August"] + bitesperyear[years[i]]["August"];
    topBiteMonths["September"] = topBiteMonths["September"] + bitesperyear[years[i]]["September"];
    topBiteMonths["October"] = topBiteMonths["October"] + bitesperyear[years[i]]["October"];
    topBiteMonths["November"] = topBiteMonths["November"] + bitesperyear[years[i]]["November"];
    topBiteMonths["December"] = topBiteMonths["December"] + bitesperyear[years[i]]["December"];

  }


  var avgBite = []
  for(var month in topBiteMonths){
    avgBite.push([month, topBiteMonths[month]]);
  }

  avgBite.sort(function(dog1, dog2){
    return dog2[1] - dog1[1];
  });


  //output
  var output = "";
  output = output + "Average age of these chompy friends is: " + avgAge + "\n\n";
  output = output + "The percentage of biting dogs that are spayed/neutered: " +  neutered + "% \n\n";
  output = output + "Top Ten Most Chompy Breeds: \n";
  for(var i = 0; i<10; i++){
    output = output + (i+1) + ". " + mostBites[i][0] + " with " + mostBites[i][1] + " reported bites \n";
  }
  output = output + "\n";
  output = output + "Dog Bite Leaderboard \n";
  for(var i = 0; i<5; i++){
    output = output + (i+1) + ". "+ sortedBorough[i][0] + " with " + sortedBorough[i][1] + " bites \n";
  }

  output = output + "\n";
  output = output + "The top three months for dog biting are " + avgBite[0][0] + ", " + avgBite[1][0] + " and " + avgBite[2][0] +".";












  return output;
}




module.exports = {
  processBiteData: processBiteData,

}
