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
}
