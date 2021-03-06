class Ende extends Phaser.Scene{
    
    constructor(){
        super({key:"Ende"});
    }
    init(data){
        this.score = data.score;
        this.user = data.user;
        this.gameID = data.gameID;
	this.time = data.time;
    }
    preload ()
        {

        }

    create ()
        {
            this.endGame();
            document.getElementById("Level").innerHTML="Das Ende";
            this.add.text(100,100,"Du hast das (vorläufige) Ende unseres Security Games erreicht.",{font:"18px Courier"}).setColor("white");
	    this.add.text(100,120,"User: "+this.user,{font:"18px Courier"}).setColor("white");
	    this.add.text(100,140,"Dein Punktestand: "+this.score,{font:"18px Courier"}).setColor("white");
	    this.add.text(100,160,"Benötigte Zeit: "+this.time,{font:"18px Courier"}).setColor("white");
	    this.add.text(100,180,"Drücke I um fortzufahren!\nKeine Sorge dein Fortschritt wurde bereits registriert!",{font:"18px Courier"}).setColor("white");
	    this.input.keyboard.on('keyup_I', function(e){window.location.href = "/fe/analyse";},this);		  
        }

    update ()
    {
    }
questionAPI(json)
{
    //ItemJSON = {gameId: 1, questionId: 1, answer: 1 };

    URL = "https://game.twenska.de/be/answer";  //Your URL

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    xmlhttp.open("POST", URL);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    //console.log(json);
    xmlhttp.send(json);
    //alert(xmlhttp.responseText);
    //console.log(xmlhttp.status);
    //document.getElementById("div").innerHTML = xmlhttp.statusText + ":" + xmlhttp.status + "<BR><textarea rows='100' cols='100'>" + xmlhttp.responseText + "</textarea>";
}
callbackFunction(xmlhttp)
{
   // alert(xmlhttp.responseXML);
}

endGame(){

                var json = '{'
                        +'"gameId" : '+this.gameID+','
                        +'"score"  : '+this.score+','
                        +'"time" : '+this.time+''
                        +'}';
URL = "https://game.twenska.de/be/end-game";  //Your URL
    console.log(json);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    xmlhttp.open("POST", URL, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    console.log(json);
    xmlhttp.send(json);
}
convertTime(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
}
