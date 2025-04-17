let slideIndex = 0;
let startX = 0;
let endX = 0;
document.getElementById("block").value = 42
document.getElementById("spieltag").value = '2024-10-10T17:00'
document.getElementById("anzahl").value = 2

let ticketCount = 2;


let frontLink = "img/ohnetext.mp4"
async function getGameInfo(queryString){
  fetch(queryString)
    .then(response => response.json())
    .then(data => {
      data.forEach((game) => {
        if (game.team1.teamId === 91 || game.team2.teamId === 91) {


          const now = new Date();
          now.setDate(now.getDate() - 1); // ein Tag vor jetzt

          const gdate = new Date(game.matchDateTime);


          var gegner = game.team1.teamName === 'Eintracht Frankfurt' ? game.team2.teamName : game.team1.teamName;

          const gyear = gdate.getFullYear();
          const gmonth = String(gdate.getMonth() + 1).padStart(2, '0'); // Monate: 0-11
          const gday = String(gdate.getDate()).padStart(2, '0');
          const ghours = String(gdate.getHours()).padStart(2, '0');
          const gminutes = String(gdate.getMinutes()).padStart(2, '0');

          const localFormatted = `${gyear}-${gmonth}-${gday}T${ghours}:${gminutes}`;

          document.getElementById("spieltag").value = localFormatted;

          let gameInfos = document.getElementsByClassName("gamename");
          for(var i=0; i<gameInfos.length;i++){
            gameInfos[i].innerHTML = "Eintracht Frankfurt vs. " + gegner;
            document.getElementById("name").value = gegner;
          }
          let dates = document.getElementsByClassName("date");
          const date = new Date(document.getElementById('spieltag').value);

          // Extract day, month, year, hours, and minutes
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');

          // Format the date and time
          const dateFormatted = `${day}.${month}.${year}, ${hours}:${minutes} Uhr`;
          for(var i=0; i<dates.length;i++){
            dates[i].innerHTML = dateFormatted;
          }

          // Speichere die Daten oder führe weitere Operationen durch
        }
      });
    })
}


var infobuttons = document.getElementsByClassName("infoicon");

var queryStringBl = 'https://api.openligadb.de/getmatchdata/bl1'
var queryStringEl = 'https://api.openligadb.de/getmatchdata/uel'
var firstCheck = true;

var tempDate = null;

getGameInfo(queryStringBl);


function load(rang, dateFormatted, enemy){
  document.getElementsByClassName('gamename')[0].innerHTML = "Eintracht Frankfurt vs. " + enemy;
  //let dateFormatted = '24.10.2024, 18:45 Uhr'
  if(dateFormatted != null){
    let dates = document.getElementsByClassName("date");
    for(var i=0; i<dates.length;i++){
      dates[i].innerHTML = dateFormatted;
    }
  }
  document.getElementById('redline').style.width = 95 / ticketCount + '%';

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
  else if([35, 37, 39, 41, 43, 45, 47, 49, 51].indexOf(rang) !== -1){
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
    ticketCount = 5;
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










}

var touching = false;
barsclicked()
dotsclicked()
var infoDisabled = true;
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
  if(slideIndex == 0 || slideIndex == ticketCount + 1){
    return;
  }

  let linesize = document.getElementById('redline').offsetWidth
  document.getElementById('redline').style.transform = "translateX(" + ((slideIndex-1) * linesize) + "px)";
  console.log(slideIndex);
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
function iclicked(button){
  var info = document.getElementById("infos");
  if(infoDisabled){
    infoDisabled = false;
    console.log(button.parentNode.firstElementChild.firstElementChild)
    button.parentNode.firstElementChild.src = "img/backside.mp4";
    button.parentNode.firstElementChild.load()
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
    button.parentNode.firstElementChild.src = frontLink;
    button.parentNode.firstElementChild.load()
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



function start(frontlinkString){
  frontLink = frontlinkString;
  var blockEl = document.getElementById("block")
  var spieltagEl = document.getElementById("spieltag")
  var anzahlEl = document.getElementById("anzahl")
  var nameEl = document.getElementById("name")

  var block = parseInt(blockEl.value);
  var spieltag = spieltagEl.value;
  var anzahl = parseInt(anzahlEl.value);
  var name = nameEl.value;
  ticketCount = anzahl;
  const date = new Date(spieltag);

  // Extract day, month, year, hours, and minutes
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Format the date and time
  dateFormatted = `${day}.${month}.${year}, ${hours}:${minutes} Uhr`;

  console.log(frontLink)
  document.getElementsByClassName('balkenvideo')[0].src = frontLink;
  document.getElementsByClassName('balkenvideo')[0].load()
  document.getElementById('destroy').remove()
  load(block, dateFormatted, name)
  slide(-1);

}


function onElChange(){
  getGameInfo(queryStringEl)
}
function onBlChange(){
  getGameInfo(queryStringBl)
}
