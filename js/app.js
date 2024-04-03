let slideIndex = 0;
let startX = 0;
let endX = 0;

var infobuttons = document.getElementsByClassName("infoicon");

const urlParams = new URLSearchParams(window.location.search);
var ticketCount = parseInt(urlParams.get('anzahl'));
var rang = parseInt(urlParams.get('block'));
var gameday = parseInt(urlParams.get('spieltag'))
var enemy = urlParams.get('gegner');
console.log(enemy)
var queryString = ''
if(!gameday){
  queryString = 'https://api.openligadb.de/getmatchdata/bl1'
}
else {
  queryString = 'https://api.openligadb.de/getmatchdata/bl1/2023/' + gameday;
}
if(!rang){
  rang = 43;
}
var rangInfos = document.getElementsByClassName("rang");
var tribunenInfos = document.getElementsByClassName("tribune");
var blockInfos = document.getElementsByClassName("blocknumber");
var rangLetter = "ERROR WRONG BLOCK";
var tribune = "ERROR WRONG TRIBÜNE";
console.log(rang);
if([42, 40, 38, 36].indexOf(rang) !== -1){
  rangLetter = "U";
  tribune = "Unterrang Nordwestkurve"
}
else if([35, 39, 43, 47, 51].indexOf(rang) !== -1){
  rangLetter = "O"
  tribune = "Oberrang Nordwestkurve"
}
console.log(rangLetter);
console.log(tribune);
for(var i=0; i<rangInfos.length;i++){
  rangInfos[0].innerHTML = rangLetter;
}
for(var i=0; i<tribunenInfos.length;i++){
  tribunenInfos[0].innerHTML = tribune;
}
for(var i=0; i<blockInfos.length;i++){
  blockInfos[0].innerHTML = rang;
}

if(!ticketCount>0){
  ticketCount = 1;
}
calcProcent = 100 / (ticketCount + 2);




var box = document.getElementById("init");
document.getElementById("slider").style.width = ticketCount * 100 + 200 +"%";
var outerElements = document.querySelectorAll(".outer");
outerElements.forEach(function(element) {
  element.style.width = calcProcent + "%";
});
box.style.width = calcProcent + "%";
for(var i = 0; i < ticketCount - 1; i++){
  var cloneBox = box.cloneNode(true)
  cloneBox.id = "box" + i;
  cloneBox.style.width = calcProcent + "%";
  box.parentElement.insertBefore(cloneBox, document.getElementById("last"));
}



function getGameInfo(){
  fetch(queryString)
    .then(response => response.json())
    .then(data => {
      // Annahme: Das Array data enthält die Informationen zu allen Spielen
      // Durchlaufe das Array, um das Spiel gegen Eintracht Frankfurt zu finden
      data.forEach(game => {
        if (game.team1.teamId === 91 || game.team2.teamId === 91) {
          var gegner = game.team1.teamName === 'Eintracht Frankfurt' ? game.team2.teamName : game.team1.teamName;
          if(enemy != null){
            gegner = enemy;
          }
          const datum = new Date(game.matchDateTime);
          let dateFormatted = datum.getDate() + "." + (datum.getMonth() + 1) + "." + datum.getFullYear() +  ", " + datum.getHours() + ":" + datum.getMinutes() + " Uhr";
          let gameInfos = document.getElementsByClassName("gamename");
          for(var i=0; i<gameInfos.length;i++){
            gameInfos[i].innerHTML = "Eintracht Frankfurt vs. " + gegner;
          }
          let dates = document.getElementsByClassName("date");
          for(var i=0; i<dates.length;i++){
            dates[i].innerHTML = dateFormatted;
          }
          // Speichere die Daten oder führe weitere Operationen durch
        }
      });
    })
}
var touching = false;
function startTouch(event) {
  startX = event.touches[0].clientX;
  touching = true;
}

function moveTouch(event) {
  touching = false
  console.log(event.touches)
  endX = event.touches[0].clientX;
}

function endTouch() {
  console.log(startX)
  console.log(endX)
  if(touching)return;
  if (startX - endX > 200) {
    slide(1); // Swipe nach links
  } else if (endX - startX > 200) {
    slide(-1); // Swipe nach rechts
  }
}

function slide(n) {
  slideIndex += n;
  if (slideIndex < 0) {
    slideIndex = 0;
  } else if (slideIndex > ticketCount + 1) {
    slideIndex = ticketCount;
  }
  document.getElementById("slider").style.transform = "translateX(" + (-slideIndex * calcProcent) + "%)";

  // Überprüfen, ob der Benutzer versucht, über den sichtbaren Bereich hinaus zu swipen
  if (slideIndex === 0 && n === -1 || slideIndex === (ticketCount + 1) && n === 1) {
    let interval = setInterval(function() {
      slideIndex -= n; // Ändere die Anzahl der Schritte nach Bedarf
      document.getElementById("slider").style.transform = "translateX(" + (-slideIndex * calcProcent) + "%)";

      clearInterval(interval); // Stoppt das Intervall, wenn alle Schritte abgeschlossen sind

    }, 100); // Ändere die Zeit zwischen den Schritten nach Bedarf
  }
}


function dotsclicked(){
  var pullup = document.getElementById("pullup")
  if(pullup.disabled){
    pullup.disabled = false;
    pullup.style.width = 100 + "%";
  }
  else {
    pullup.disabled = true;
    pullup.style.width = 0 + "px";
  }
}
function barsclicked(){
  var bigpullup = document.getElementById("bigpullup");
  if(bigpullup.disabled){
    bigpullup.disabled = false;
    bigpullup.style.width = 100 + "%";
    document.getElementById("cross").style.width = 6 +"%";
  }
  else {
    bigpullup.disabled = true;
    bigpullup.style.width = 0 + "px";
    document.getElementById("cross").style.width = 0 + "px";
  }
}
var infoDisabled = true;
function iclicked(button){
  var info = document.getElementById("infos");
  if(infoDisabled){
    infoDisabled = false;
    button.parentNode.firstElementChild.src = "img/infos.png";
    for(var i=0;i<button.parentNode.childElementCount;i++){
      if(button.parentNode.children[i] === button || button.parentNode.children[i] === button.parentNode.firstElementChild){
        continue;
      }
      else {
        button.parentNode.children[i].style.opacity = 0;
      }
    }
  }
  else {
    infoDisabled = true;
    button.parentNode.firstElementChild.src = "img/ohnetextkarte.png"
    for(var i=0;i<button.parentNode.childElementCount;i++){
      if(button.parentNode.children[i] === button || button.parentNode.children[i] === button.parentNode.firstElementChild){
        continue;
      }
      else {
        button.parentNode.children[i].style.opacity = 1;
      }
    }
  }
}


getGameInfo()
barsclicked()
dotsclicked()
slide(-1);
