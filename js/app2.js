function change(){
  var link = document.getElementById("link")
  var blockEl = document.getElementById("block")
  var spieltagEl = document.getElementById("spieltag")
  var anzahlEl = document.getElementById("anzahl")
  var nameEl = document.getElementById("name")

  var block = blockEl.value;
  var spieltag = spieltagEl.value;
  var anzahl = anzahlEl.value;
  var name = nameEl.value;

  var href = "index.html?";

  if(block > 0){
    href += "&block=" + block
  }
  if(spieltag > 0){
    href += "&spieltag=" + spieltag
  }
  if(anzahl > 0){
    href += "&anzahl=" + anzahl
  }
  if(name.length > 0){
    href += "&gegner=" + name;
  }

  link.href = href;
  link.innerHTML = href;

}
