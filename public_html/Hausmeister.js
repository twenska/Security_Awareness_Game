class Hausmeister extends Phaser.Scene{
    
    constructor(){
        super({key:"Hausmeister"});
    }
    init(data){
        this.score = data.score;
        this.user = data.user;
        this.gameID = data.gameID;
	this.Startingtime = data.time;
    }
    preload ()
    {
        this.load.spritesheet('floor', 'assets/floors.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('dude', 'assets/Spieler.png', { frameWidth: 30, frameHeight: 32 });
        this.load.spritesheet('janitor', 'assets/Janitor.png', { frameWidth: 29, frameHeight: 30 });
        this.load.image('Tuer', 'assets/Tuer.png', {frameWidth: 31, frameHeight: 35});
        this.load.image('dialog', 'assets/dialogbox.png', {frameWidth: 1024, frameHeight: 576});
        this.load.image('Fenster', 'assets/window.png',{frameWidth:110, frameHeight: 55});
        this.load.image('Workstation', 'assets/workstation.png',{frameWidth:55, frameHeight: 50});
        this.load.spritesheet('shelves', 'assets/Shelves.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('Aufgabe_Ausweis', 'assets/Aufgaben/Ausweis.png',{frameWidth:800, frameHeight: 600});
        this.load.image('Aufgabe_Zertifikat', 'assets/Aufgaben/Zertifikat.png',{frameWidth:800, frameHeight: 600});
        
    }
    create()
    {
        var border = this.physics.add.staticGroup();
        var floor = this.physics.add.staticGroup();
        this.janitorMoving = false;
        
        this.DialogHausmeister = this.physics.add.group();
        this.DialogAufgabeAusweis1 = this.physics.add.group();
        this.DialogAufgabeAusweis2 = this.physics.add.group();
        this.AufgabeAusweisDone = false;

        this.DialogAufgabeZertifikat = this.physics.add.group();
        this.DialogAufgabeZertifikat1 = this.physics.add.group();
        this.DialogAufgabeZertifikat2 = this.physics.add.group();
        this.AufgabeZertifikatDone = false;

        document.getElementById("Hinweis").innerHTML = "";
        document.getElementById("Level").innerHTML="Der Hausmeister";

        /* Test für dynamische Dialoge
        this.DialogEmpfang = this.physics.add.staticGroup();
        text.create(this.add.text(200,200,"test",{font:"40px Impact"}));
        var temp=text.getChildren();
        temp[0].x.setVisible(false);
        console.log(temp); */

        this.inDialog = false;
        this.actualDialog = undefined;
        this.actualTask = undefined;
        //boden
        for(var i=0;i<=game.config.width;i+=32){
            for(var t=240;t<=game.config.height;t+=32){
                floor.create(i,t,'floor',69);//53
            } 
        }
        //left wall
        for(var i = 0; i<=game.config.height;i+=32){
            border.create(16,i, 'floor',5);
        }
        //right wall
        for(var i = 16; i<=game.config.height;i+=32){
            border.create(game.config.width-16,i, 'floor',5);
        }
        // top wall
        for(var i = 0; i<=game.config.width;i+=32){
            border.create(i,240, 'floor',5);
        }
        //bottom wall
        for(var i = 0; i<=game.config.width;i+=32){
            border.create(i,game.config.height-16, 'floor',5);
        }

        this.player = this.physics.add.sprite(85, 550, 'dude',0).setScale(1.2);
        this.janitor = this.physics.add.sprite(630, 360, 'janitor',6).setScale(1.2);
        this.makeImmovable(this.janitor);

        this.door = this.physics.add.image(80, 587, 'Tuer').setAngle(180);
        this.door_void = this.physics.add.image(190, 240, 'Tuer');
        this.shelve = this.physics.add.sprite(500, 250, 'shelves',5)
        this.makeImmovable(this.shelve);
        this.workstation = this.physics.add.image(700,250,'Workstation');
        this.makeImmovable(this.workstation);

        this.physics.add.image(760,300,'Fenster').setAngle(270);
        this.physics.add.image(760,470,'Fenster').setAngle(270);

        this.Dialog = this.physics.add.image(420, 520, 'dialog').setScale(0.65);
            this.Dialog.setVisible(false);

        this.physics.add.collider(this.player, border);
        this.physics.add.collider(this.player, this.shelve);
        this.physics.add.collider(this.player, this.workstation);
        this.physics.add.collider(this.player, this.janitor);

        this.createAnimations();

        this.input.keyboard.on('keyup_I', function(e){
            if(this.inDialog){
                this.toggleDialog();
            }else{
                //Aufgabe Ausweis - Start
                if(this.inRange(this.janitor,50,50)&& !this.AufgabeAusweisDone){
                    this.inDialog = true;
                    this.actualDialog = this.DialogHausmeister;
                    this.actualTask = this.Aufgabe_Ausweis;
                    this.toggleDialog();
                }
                //Aufgabe Zertifikat - Start
                if(this.inRange(this.workstation,50,50) && this.AufgabeAusweisDone && !this.AufgabeZertifikatDone){
                    this.janitorMoving = true;
                    console.log("TRUE"+this.janitor.y);
                    this.inDialog = true;
                    this.actualDialog = this.DialogAufgabeZertifikat;
                    this.actualTask = this.Aufgabe_Zertifikat;
                    this.toggleDialog();
                }
                if(this.inRange(this.door,30,50) && this.AufgabeAusweisDone && this.AufgabeZertifikatDone){
                    this.scene.start("Lobby_2",{score: this.score,user: this.user,gameID: this.gameID,time: this.Startingtime});
                }
            }
    },this);
      this.Key_W =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.Key_A =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.Key_S =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.Key_D =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //Aufgabe Ausweis - Gruppen erstellen

    this.DialogHausmeister.add(this.add.text(240,430,"Hallo, wer bist du denn?",{font:"18px Courier"}).setColor("black"));
    this.DialogHausmeister.add(this.add.text(240,430,"Ahh, du bist also "+this.user+".\nSchön dich kennen zu lernen!\n\nIch bin Tom, der Hausverwalter.",{font:"18px Courier"}).setColor("black"));
    this.DialogHausmeister.add(this.add.text(240,430,"Ich bin hier bei KRONE für\ndieses Gebäude, das\n'Technologiezentrum' zuständig.\nDazu gehört auch die Verwaltung\nder Zugangsberechtigungen...",{font:"18px Courier"}).setColor("black"));
    this.DialogHausmeister.add(this.add.text(240,430,"Du sollst in deinem Praktikum\ndie IT unterstützen.\n\nIn deiner Bewerbung sagtest du\nja, du wärst an IT-Sicherheit\ninteressiert.",{font:"18px Courier"}).setColor("black"));
    this.DialogHausmeister.add(this.add.text(240,430,"Bei KRONE ist dies ein sehr\nwichtiger Bereich.\n\nIch denke du wirst hier viel\nlernen!",{font:"18px Courier"}).setColor("black"));
    this.DialogHausmeister.add(this.add.text(240,430,"Aber jetzt bekommst du erstmal\ndeinen Mitarbeiterausweis.\n\nHier bitte schön!",{font:"18px Courier"}).setColor("black"));
    this.DialogHausmeister.toggleVisible();

    this.DialogAufgabeAusweis1.add(this.add.text(240,430,"Oh nein, steck ihn nicht einfach\nso ein! Du musst ihn gut\nsichtbar an deiner Kleidung\nbefestigen!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis1.add(this.add.text(240,430,"Jeder Mitarbeiter muss den\nAusweis sichtbar bei sich tragen,\ndamit Unbefugte sofort erkannt\nwerden!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis1.add(this.add.text(240,430,"Außerdem kannst du mit dem\nAusweis bestimmte Türen zu\nBereichen, für die du berechtigt\nbist, öffnen.",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis1.add(this.add.text(240,430,"Falls du jemanden ohne seinen\nAusweis siehst, scheue nicht\nzurück ihn darauf anzusprechen!\nEventuell hälst du einen\nEinbrecher auf!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis1.add(this.add.text(240,430,"So, dass wär's erstmal mit\ndeiner Einführung!\n\nObwohl... Ich hätte noch ein\nkleines Computerproblem.",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis1.add(this.add.text(240,430,"Wärst du so nett und schaust\ndir meinen Computer an,\nwährend du hier bist?\nIch komme einfach nicht mehr auf\neinige Webseiten...",{font:"18px Courier"}).setColor("black"));

    this.DialogAufgabeAusweis1.toggleVisible();

    this.DialogAufgabeAusweis2.add(this.add.text(240,430,"Sehr gut! So kann jeder sehen,\ndass du berechtigt bist im\nGebäude zu sein!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis2.add(this.add.text(240,430,"Jeder Mitarbeiter muss den\nAusweis sichtbar bei sich tragen,\ndamit Unbefugte sofort erkannt\nwerden!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis2.add(this.add.text(240,430,"Außerdem kannst du mit dem\nAusweis bestimmte Türen zu\nBereichen, für die du berechtigt\nbist, öffnen.",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis2.add(this.add.text(240,430,"Falls du jemanden ohne seinen\nAusweis siehst, scheue nicht\nzurück ihn darauf anzusprechen!\nEventuell hälst du einen\nEinbrecher auf!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis2.add(this.add.text(240,430,"So, dass wär's erstmal mit\ndeiner Einführung!\n\nObwohl... Ich hätte noch ein\nkleines Computerproblem.",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis2.add(this.add.text(240,430,"Wärst du so nett und schaust\ndir meinen Computer an,\nwährend du hier bist?\nIch komme einfach nicht mehr auf\neinige Webseiten...",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeAusweis2.toggleVisible();

    this.Aufgabe_Ausweis=this.physics.add.image(400,300,'Aufgabe_Ausweis');
    this.Aufgabe_Ausweis.setVisible(false);

    //Aufgabe Zertifikat - Gruppen erstellen

    this.DialogAufgabeZertifikat.add(this.add.text(240,430,"Danke, dass du dir die Sache\nansiehst!\n\nSchau nur...",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat.add(this.add.text(240,430,"Egal welche Seite ich öffnen\nwill, immer erhalte ich diese\ndämliche Meldung... Und ich\nmuss doch so dringend neue\nLampen bestellen...",{font:"18px Courier"}).setColor("black"));

    this.DialogAufgabeZertifikat.toggleVisible();

    this.DialogAufgabeZertifikat1.add(this.add.text(240,430,"OK, wenn du meinst dass meine\nDaten in Gefahr sind, rufe ich\nam besten am HelpDesk an!\n\nWarte hier!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat1.add(this.add.text(240,430,"[Du wartest während Tom mit\ndem HelpDesk telefoniert]",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat1.add(this.add.text(240,430,"Gut, dass du mich gewarnt\nhast! Es war ein sogenannter\nMan-in-the-middle Angriff, mit\ndem Hacker versucht haben\nmeine Passwörter zu stehlen!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat1.add(this.add.text(240,430,"Dank deines Rats konnten wir\ndas noch einmal verhindern.\n\nGut gemacht!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat1.add(this.add.text(240,430,"Du solltest zurück in die Lobby\ngehen. Die Empfangsdame\nscheint ebenfalls ein Problem\nzu haben,bei dem du helfen\nkönntest...",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat1.toggleVisible();

    this.DialogAufgabeZertifikat2.add(this.add.text(240,430,"Das war's schon?\n\nDann bestelle ich mal direkt\nmeine Lampen!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat2.add(this.add.text(240,430,"Nanu... nachdem ich mich\nangemeldet habe, sieht diese\nSeite sehr komisch aus...\nVielleicht rufe ich doch besser\nden HelpDesk an...",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat2.add(this.add.text(240,430,"[Du wartest während Tom mit\ndem HelpDesk telefoniert]",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat2.add(this.add.text(240,430,"Oh nein, es scheint als hätte\nein Hacker mein Passwort\ngestohlen... Er hat einen\nsogenannten man-in-the-middle\nAngriff genutzt!",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat2.add(this.add.text(240,430,"Ohne dich wäre mir das sicher\nnicht passiert! Geh zurück in\ndie Lobby. Vielleicht kann dich\nda ja jemand gebrauchen...",{font:"18px Courier"}).setColor("black"));
    this.DialogAufgabeZertifikat2.toggleVisible();

     this.Aufgabe_Zertifikat=this.physics.add.image(400,300,'Aufgabe_Zertifikat');
     this.Aufgabe_Zertifikat.setVisible(false);

     
    }
update(){
    //console.log(this.time.now);
   // console.log(this.input.mousePointer.leftButtonDown());
   // console.log(this.input.mousePointer.primaryDown);
    if (this.Key_W.isDown){
        this.player.setVelocityY(-160);
        this.player.anims.play('up', true);
        this.Key_A.enabled = false;
        this.Key_S.enabled = false;
        this.Key_D.enabled = false;
    }else{
        if((this.time.now - this.Key_W.timeUp) <= 500){
            //console.log(this.time.now);
            this.player.setVelocityY(0);
            this.player.anims.stop();
            this.Key_A.enabled = true;
            this.Key_S.enabled = true;
            this.Key_D.enabled = true;
        }
    }
    if (this.Key_A.isDown){
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
        this.Key_W.enabled = false;
        this.Key_S.enabled = false;
        this.Key_D.enabled = false;
    }else{
        if((this.time.now - this.Key_A.timeUp) <= 500){
            //console.log(this.Key_W.timeDown);
            this.player.setVelocityX(0);
            this.player.anims.stop();
            this.Key_W.enabled = true;
            this.Key_S.enabled = true;
            this.Key_D.enabled = true;
        }
    }
    if (this.Key_S.isDown){
        this.player.setVelocityY(160);
        this.player.anims.play('down', true);
        this.Key_A.enabled = false;
        this.Key_W.enabled = false;
        this.Key_D.enabled = false;
    }else{
        if((this.time.now - this.Key_S.timeUp) <= 500){
            //console.log(this.Key_W.timeDown);
            this.player.setVelocityY(0);
            this.player.anims.stop();
            this.Key_A.enabled = true;
            this.Key_W.enabled = true;
            this.Key_D.enabled = true;
        }
    }
    if (this.Key_D.isDown){
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
        this.Key_W.enabled = false;
        this.Key_S.enabled = false;
        this.Key_A.enabled = false;
    }else{
        if((this.time.now - this.Key_D.timeUp) <= 500){
            //console.log(this.Key_W.timeDown);
            this.player.setVelocityX(0);
            this.player.anims.stop();
            this.Key_W.enabled = true;
            this.Key_S.enabled = true;
            this.Key_A.enabled = true;
        }
    }
    //AufgabeAusweis
    if(this.input.mousePointer.justDown && this.Aufgabe_Ausweis.visible == true){
        //Option1
        if(this.input.mousePointer.x >= 209 && this.input.mousePointer.x <= 560 && this.input.mousePointer.y >= 370 && this.input.mousePointer.y <= 445){
            this.score = this.score - 50;
           //falsche Antwort
            var json = '{'
                       +'"gameId" : '+this.gameID+','
       		       +'"questionId"  : 1,'
       		       +'"answer" : 2'
       		       +'}';
            this.questionAPI(json);
            document.getElementById("Punkte").innerHTML= "Punkte: "+ this.score;
            document.getElementById("Hinweis").innerHTML = "Im Technologiezentrum der Firma KRONE ist es für jeden Mitarbeiter Pflicht seinen Mitarbeiterausweis gut sichtbar zu tragen. Aus diesem Grund sollten Sie in jedem Fall Personen ohne sichtbar angebrachten Ausweis darauf ansprechen!";
            this.Aufgabe_Ausweis.setVisible(false);
            this.inDialog = true;
            this.actualDialog = this.DialogAufgabeAusweis1;
            this.actualTask = undefined;
            this.toggleDialog();
            this.AufgabeAusweisDone = true;
            //console.log("Option1");
        }
        //Option2
        if(this.input.mousePointer.x >= 209 && this.input.mousePointer.x <= 560 && this.input.mousePointer.y >= 458 && this.input.mousePointer.y <= 527){
            this.score = this.score + 50;
            //richtige Antwort
            var json = '{'
                       +'"gameId" : '+this.gameID+','
                       +'"questionId"  : 1,'
                       +'"answer" : 1'
                       +'}';
            this.questionAPI(json);
            document.getElementById("Punkte").innerHTML= "Punkte: "+ this.score;
            document.getElementById("Hinweis").innerHTML = "Im Technologiezentrum der Firma KRONE ist es für jeden Mitarbeiter Pflicht seinen Mitarbeiterausweis gut sichtbar zu tragen. Aus diesem Grund sollten Sie in jedem Fall Personen ohne sichtbar angebrachten Ausweis darauf ansprechen!";
            this.Aufgabe_Ausweis.setVisible(false);
            this.inDialog = true;
            this.actualDialog = this.DialogAufgabeAusweis2;
            this.actualTask = undefined;
            this.toggleDialog();
            this.AufgabeAusweisDone = true;
            //console.log("Option2");
        }
        //console.log("x:"+this.input.mousePointer.x);
        //console.log("y:"+this.input.mousePointer.y);
    }
    //Aufgabe Zertifikat
    if(this.input.mousePointer.justDown && this.Aufgabe_Zertifikat.visible == true){
        //Option1
        if(this.input.mousePointer.x >= 156 && this.input.mousePointer.x <= 653 && this.input.mousePointer.y >= 347 && this.input.mousePointer.y <= 445){
            this.score = this.score + 50;
            //var json = "{gameId: "+this.gameID+", questionId: 2, answer: 1}";//richtige Antwort
            var json = '{'
       		       +'"gameId" : '+this.gameID+','
       		       +'"questionId"  : 2,'
       		       +'"answer" : 1'
       		       +'}';
            this.questionAPI(json);
            document.getElementById("Punkte").innerHTML= "Punkte: "+ this.score;
            document.getElementById("Hinweis").innerHTML = "Zertifikate werden zur Verschlüsselung ihres Webtraffics benötigt. Wenn die Verschlüsselung erfolgreich klappt, zeigen die meisten Browser ein grünes Schloss neben der eingegebenen URL. Eine Zertifikatswarnung könnte ein Zeichen dafür sein, dass jemand versucht ihre Verbindung mitzulesen. Wenden Sie sich in diesem Fall umgehend an die IT!";
            this.Aufgabe_Zertifikat.setVisible(false);
            this.inDialog = true;
            this.actualDialog = this.DialogAufgabeZertifikat1;
            this.actualTask = undefined;
            this.toggleDialog();
            this.AufgabeZertifikatDone = true;
            //console.log("Option1");
        }
        //Option2
        if(this.input.mousePointer.x >= 156 && this.input.mousePointer.x <= 653 && this.input.mousePointer.y >= 458 && this.input.mousePointer.y <= 541){
            this.score = this.score - 50;
            //falsche Antwort
            var json = '{'
                       +'"gameId" : '+this.gameID+','
                       +'"questionId"  : 2,'
                       +'"answer" : 2'
                       +'}';
            this.questionAPI(json);
            document.getElementById("Punkte").innerHTML= "Punkte: "+ this.score;
            document.getElementById("Hinweis").innerHTML = "Zertifikate werden zur Verschlüsselung ihres Webtraffics benötigt. Wenn die Verschlüsselung erfolgreich klappt, zeigen die meisten Browser ein grünes Schloss neben der eingegebenen URL. Eine Zertifikatswarnung könnte ein Zeichen dafür sein, dass jemand versucht ihre Verbindung mitzulesen. Wenden Sie sich in diesem Fall umgehend an die IT!";
            this.Aufgabe_Zertifikat.setVisible(false);
            this.inDialog = true;
            this.actualDialog = this.DialogAufgabeZertifikat2;
            this.actualTask = undefined;
            this.toggleDialog();
            this.AufgabeZertifikatDone = true;
            //console.log("Option2");
        }
        //console.log("x:"+this.input.mousePointer.x);
        //console.log("y:"+this.input.mousePointer.y);

    }
    if(this.janitorMoving == true && this.janitor.y > 270){
        this.janitor.body.immovable = false; this.janitor.body.moves = true;
        this.janitor.setVelocityY(-160);
        this.janitor.anims.play('up_j', true);
    }
    if(this.janitorMoving == true && this.janitor.y <= 270){
        this.janitor.setVelocityY(0);
        this.janitor.anims.stop();
        this.janitor.anims.play('turn_j',true);
        this.janitor.anims.stop();
        this.makeImmovable(this.janitor);
        this.janitor = false;

    }
}

inRange(objekt,x,y){
        /*console.log("Player-x:"+this.player.x);
        console.log("Player-y:"+this.player.y);
        console.log("Laptop-x:"+objekt.x);
        console.log("Laptop-y:"+objekt.y);*/
        //1. Zu weit rechts 2. zu weit links 3. zu weit unten 4. zu weit oben
    if ((this.player.x <= objekt.x+x && this.player.x >= objekt.x-x) && (this.player.y <= objekt.y + y && this.player.y >= objekt.y - y)){
        return true;
    }else
    {
        return false;
    }
}

makeImmovable(objekt){
    objekt.body.immovable = true; objekt.body.moves = false; objekt.allowGravity = false;objekt.body.gravity.x = 0;objekt.body.gravity.y = 0;objekt.body.velocity.x = 0;objekt.body.velocity.y = 0;  

}
makeMovable(objekt){
        objekt.body.immovable = false; objekt.body.moves = true; objekt.allowGravity = true;

    }
toggleDialog(){
    if(this.actualDialog != undefined){
        var child = this.actualDialog.getChildren();
        //console.log(child);
         var firstRun = true;
        var changedSomething = false;
        for(var i = 0; (i < child.length)&&!changedSomething;i++){
            if(child[i].visible == true){
                changedSomething = true;
                    firstRun = false;
                    child[i].setVisible(false);
                    //console.log(i);
                    if(i != child.length-1){
                        child[i+1].setVisible(true);   
                    }else{
                        if(this.actualTask != undefined){
                            this.actualTask.setVisible(true);
                            this.actualDialog = undefined;
                            this.actualTask = undefined;
                        }else{
                            console.log("enabled");
				this.makeMovable(this.player);
                            this.Key_W.enabled = true;
                            this.Key_A.enabled = true;
                            this.Key_S.enabled = true;
                            this.Key_D.enabled = true;
                            this.Dialog.setVisible(false);
                            this.inDialog = false;
                            this.actualDialog = undefined;
                            this.actualTask = undefined;
                        }   
                    }
                }    
        }
        if(firstRun){
            console.log("disabled");

            this.Dialog.setVisible(true);
            child[0].setVisible(true);
	    this.makeImmovable(this.player);
            this.Key_W.enabled = false;
            this.Key_A.enabled = false;
            this.Key_S.enabled = false;
            this.Key_D.enabled = false;
        }
    }    
}

createAnimations(){
    this.anims.create({
        key: 'left',
        frames: [ { key: 'dude', frame: 3 },{ key: 'dude', frame: 6 },{ key: 'dude', frame: 9 } ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: [ { key: 'dude', frame: 1 },{ key: 'dude', frame: 4 },{ key: 'dude', frame: 7 } ],
        //frames: this.anims.generateFrameNumbers('dude', { 1,4,7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: [ { key: 'dude', frame: 2 },{ key: 'dude', frame: 0 },{ key: 'dude', frame: 10 } ],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: [ { key: 'dude', frame: 5 },{ key: 'dude', frame: 8 },{ key: 'dude', frame: 11 } ],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'left_j',
        frames: [ { key: 'janitor', frame: 3 },{ key: 'janitor', frame: 6 },{ key: 'janitor', frame: 9 } ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn_j',
        frames: [ { key: 'janitor', frame: 5 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right_j',
        frames: [ { key: 'janitor', frame: 1 },{ key: 'janitor', frame: 4 },{ key: 'janitor', frame: 7 } ],
        //frames: this.anims.generateFrameNumbers('janitor', { 1,4,7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up_j',
        frames: [ { key: 'janitor', frame: 2 },{ key: 'janitor', frame: 0 },{ key: 'janitor', frame: 10 } ],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down_j',
        frames: [ { key: 'janitor', frame: 5 },{ key: 'janitor', frame: 8 },{ key: 'janitor', frame: 11 } ],
        frameRate: 10,
        repeat: -1
    });
}
questionAPI(json)
{
    //ItemJSON = {gameId: 1, questionId: 1, answer: 1 };

    URL = "https://game.twenska.de/be/answer";  //Your URL

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    xmlhttp.open("POST", URL, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    console.log(json);
    xmlhttp.send(json);
    //alert(xmlhttp.responseText);
    console.log(xmlhttp.status);
    //document.getElementById("div").innerHTML = xmlhttp.statusText + ":" + xmlhttp.status + "<BR><textarea rows='100' cols='100'>" + xmlhttp.responseText + "</textarea>";
}

callbackFunction(xmlhttp) 
{
   // alert(xmlhttp.responseXML);
}
}
