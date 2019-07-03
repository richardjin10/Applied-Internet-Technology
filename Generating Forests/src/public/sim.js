const emojis = [..."🌱🌲🌳🌴🌵🌾🌿🍀🍁🍂🍃🐊💐🌸💮🌹🥀🌺🌻🌼🌷                      "];
const simpsonsIndex = forest =>
  1 - Object.entries(
  [...forest.join("")].reduce(
      (counts, emoji) => ({...counts, [emoji]: (counts[emoji] || 0) + 1}),
      {}
  )
  ).reduce(([top, bottom], [species, count]) => [top + (count * (count - 1)), bottom + count], [0, 0])
  .reduce((sumLilN,bigN) => sumLilN / (bigN * (bigN - 1)));



function main() {

    const intro = document.getElementById('intro');
    const sim = document.getElementById('sim');



    const g = document.querySelector('button');
    g.addEventListener('click', startSim);
    function startSim(evt){
      //console.log("hi");
      const input = document.getElementById('inputForest');
      let inputemojis = "";
      console.log(input.value);
      if(input.value !== ""){
        inputemojis = input.value.split("\n");
      }



      intro.classList.add('hidden');
      sim.classList.remove('hidden');
      let forest = [];
      if(inputemojis===""){
        forest = makeForest();
      }else{
        forest = inputemojis;

      }



      sim.innerHTML = "<div id='forest'> The current simpson index is "+Math.round(simpsonsIndex(forest)*100)/100 + "</div>"+"<br>"+
      "<div class='forestrow'>" + forest[0]+ "</div>" +
      "<div class='forestrow'>" + forest[1]+ "</div>" +
      "<div class='forestrow'>" + forest[2]+ "</div>" +
      "<div class='forestrow'>" + forest[3]+ "</div>" +
      "<div class='forestrow'>" + forest[4]+ "</div>" +
      "<div class='forestrow'>" + forest[5]+ "</div>" +
      "<div class='forestrow'>" + forest[6]+ "</div>" +
      "<div class='forestrow'>" + forest[7]+ "</div>" ;


      const pinned = document.getElementsByClassName("forestrow");
      for(let i = 0; i <pinned.length; i++){
        pinned[i].addEventListener('click', pinn);
        function pinn(evt){
          this.classList.toggle('pinned');
        }
      }

      const button = document.createElement("button");
      button.value = "new";
      button.id="new";
      button.innerHTML = "generated";
      sim.appendChild(button);
      const g2 = document.getElementById('new');
      g2.addEventListener('click', remakeforest);
      function remakeforest(evt){
        const domforest = document.getElementsByClassName('forestrow');
        for(let a = 0; a<domforest.length; a++){
          if(domforest[a].classList[1]==="pinned"){
            console.log('pinned');
          }else{
            let newrow = makeRow();
            forest[a] = newrow;
            domforest[a].innerHTML = newrow;
          }
        }
        const simpson = document.getElementById('forest');
        const num = Math.round(simpsonsIndex(forest)*100)/100;
        simpson.innerHTML = "The current simpson index is " + num;

        if(num<.7){
          const pushT = document.getElementById('pushtray');
          pushT.innerHTML = "<h3> Warning Simpson Index dropped to " + num + "</div>";
        }else{
          const pushT = document.getElementById('pushtray');
          pushT.innerHTML = "";
        }

        //console.log("hi");






      }

      if(simpsonsIndex(forest)<.7){
        const pushT = document.getElementById('pushtray');
        pushT.innerHTML = "<h3> Warning Simpson Index dropped to " + Math.round(simpsonsIndex(forest)*100)/100 + "</div>";
      }else{
        const pushT = document.getElementById('pushtray');
        pushT.innerHTML = "";
      }


    }





}
document.addEventListener('DOMContentLoaded', main);

function makeRow(){
  let row = "";

  for(let i = 0; i<8; i++){
    const random = Math.floor(Math.random()*(emojis.length));
    row = row + emojis[random];

  }
  return row;
}


function makeForest(){
  const forest = [];
  for(let i = 0; i<8; i++){
    forest.push(makeRow());
  }

  return forest;
}
