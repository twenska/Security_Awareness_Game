class Lobby_2 extends Phaser.Scene{
    
    constructor(){
        super({key:"Lobby_2"});
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
            this.load.spritesheet('laptop', 'assets/laptop.png', { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('dude', 'assets/Spieler.png', { frameWidth: 30, frameHeight: 32 });
            this.load.spritesheet('sekretaer', 'assets/Sekretaerin.png', { frameWidth: 28, frameHeight: 32 });
            this.load.image('dialog', 'assets/dialogbox.png', {frameWidth: 1024, frameHeight: 576});
            this.load.spritesheet('LobbyDesk', 'assets/BrownWalls.png', {frameWidth: 48, frameHeight: 16});
            this.load.spritesheet('teppich', 'assets/teppich.png', {frameWidth: 32, frameHeight: 32});
            this.load.image('LobbyDesk_90', 'assets/LobbyDesk_Hoch.png', {frameWidth: 16, frameHeight: 48});
            this.load.image('Tuer', 'assets/Tuer.png', {frameWidth: 31, frameHeight: 35});
            this.load.image('Gelaender', 'assets/gelaender.png', {frameWidth: 532, frameHeight: 13});
            this.load.image('Fenster', 'assets/window.png',{frameWidth:110, frameHeight: 55});
            this.load.image('DoppelTuer', 'assets/DoppelTuer.png', {frameWidth: 64, frameHeight: 48});
            this.load.image('Tisch', 'assets/desk.png', {frameWidth: 90, frameHeight: 69});
            this.load.image('TischZettel', 'assets/TischZettel.png', {frameWidth: 32, frameHeight: 32});
            this.load.image('Workstation', 'assets/workstation.png',{frameWidth:55, frameHeight: 50});
            this.load.image('Copier', 'assets/copier.png',{frameWidth:55, frameHeight: 55});
            this.load.spritesheet('Stuehle', 'assets/Stuehle.png', {frameWidth: 30.75, frameHeight: 46});
            this.load.spritesheet('shelves', 'assets/Shelves.png', { frameWidth: 32, frameHeight: 64 });
            this.load.image('Paper', 'assets/Paper.png',{frameWidth:9, frameHeight: 11});
            this.load.image('Teppich_Krone', 'assets/teppich_krone.png', {frameWidth: 92, frameHeight: 89});
            this.load.image('Teppich_Gruen', 'assets/Teppich_gruen.png', {frameWidth: 92, frameHeight: 89});
            this.load.image('Pflanze', 'assets/Pflanze.png', {frameWidth: 25, frameHeight: 56});
            this.load.image('Vase', 'assets/Vase.png', {frameWidth: 28, frameHeight: 32});
            this.load.image('Aufgabe_Dokumente', 'assets/Aufgaben/Dokumente.png',{frameWidth:800, frameHeight: 600});
            this.load.image('Aufgabe_Phishing', 'assets/Aufgaben/Phishing.png',{frameWidth:800, frameHeight: 600});
            this.load.spritesheet('janitor', 'assets/Janitor.png', { frameWidth: 29, frameHeight: 30 });

        }

    create ()
        {
            var border = this.physics.add.staticGroup();
            var floor = this.physics.add.staticGroup();
            var LobbyDesk = this.physics.add.staticGroup();
            var stairs = this.physics.add.staticGroup();
            this.paper = this.physics.add.staticGroup();
            this.janitorMove1 = false;
            this.janitorMove2 = false;

            this.DialogSekretaer = this.physics.add.group();
            this.DialogSekretaerDone = false;
            this.DialogPhishing = this.physics.add.group();
            this.DialogPhishing_Opt1 = this.physics.add.group();
            this.DialogPhishing_Opt2 = this.physics.add.group();
            this.DialogPhishingDone = false;
            this.DialogDokumente = this.physics.add.group();
            this.DialogDokumente_Opt1 = this.physics.add.group();
            this.DialogDokumente_Opt2 = this.physics.add.group();
            this.DialogDokumentDone = false;
	    this.DialogEnde = this.physics.add.group();

            this.inDialog = false;
            this.actualDialog = undefined;
            this.actualTask = undefined;

            
            document.getElementById("Punkte").innerHTML="Punkte: "+this.score;
            document.getElementById("Level").innerHTML="Die Lobby";
            document.getElementById("User").innerHTML="User: "+this.user;
            document.getElementById("Hinweis").innerHTML ="Die Empfangsdame scheint ein Problem zu haben...";
            //boden
            for(var i=0;i<=game.config.width;i+=32){
                for(var t=0;t<=game.config.height;t+=32){
                    floor.create(i,t,'floor',69);//53
                } 
            }
            
            stairs.create(75,32,'floor',102);
            stairs.create(75,64,'floor',102);
            stairs.create(75,96,'floor',102);
            stairs.create(107,32,'floor',102);
            stairs.create(107,64,'floor',102);
            stairs.create(107,96,'floor',102);


            LobbyDesk.create(256,160, 'LobbyDesk',24).setScale(2);
            LobbyDesk.create(335,160, 'LobbyDesk',24).setScale(2);
            LobbyDesk.create(414,160, 'LobbyDesk',24).setScale(2);
            LobbyDesk.create(493,160, 'LobbyDesk',24).setScale(2);
            LobbyDesk.create(572,160, 'LobbyDesk',24).setScale(2);
            LobbyDesk.create(208,128, 'LobbyDesk_90').setScale(2);
            LobbyDesk.create(626,128, 'LobbyDesk_90').setScale(2);
            LobbyDesk.create(626,32, 'LobbyDesk_90').setScale(2);
        
            //this.physics.add.sprite(0, 0, 'floor', 5);
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
                border.create(i,16, 'floor',5);
            }
            //bottom wall
            for(var i = 0; i<=game.config.width;i+=32){
                border.create(i,game.config.height-16, 'floor',5);
            }
            this.physics.add.image(78,370,'Teppich_Krone').setAngle(270);
            this.physics.add.image(390,223,'Teppich_Gruen');
            this.physics.add.image(480,223,'Teppich_Gruen');


            this.physics.add.image(760,130,'Fenster').setAngle(270);
            this.physics.add.image(760,300,'Fenster').setAngle(270);
            this.physics.add.image(760,470,'Fenster').setAngle(270);

            this.physics.add.image(200,560,'Fenster');
            this.physics.add.image(400,560,'Fenster');
            this.physics.add.image(600,560,'Fenster');

            this.TischZettel=this.physics.add.image(300,32,'TischZettel');
            this.makeImmovable(this.TischZettel);
            this.shelve1 = this.physics.add.sprite(350, 20, 'shelves',34)
            this.makeImmovable(this.shelve1);
            this.shelve2 = this.physics.add.sprite(382, 20, 'shelves',35)
            this.makeImmovable(this.shelve2);
            this.workstation = this.physics.add.image(450,24,'Workstation');
            this.makeImmovable(this.workstation);

            this.Vase1 = this.physics.add.image(45,305,'Vase');
            this.makeImmovable(this.Vase1);
            this.Vase2 = this.physics.add.image(45,420,'Vase');
            this.makeImmovable(this.Vase2);
            this.Pflanze1 = this.physics.add.image(45,24,'Pflanze');
            this.makeImmovable(this.Pflanze1);
            this.Pflanze2 = this.physics.add.image(135,24,'Pflanze');
            this.makeImmovable(this.Pflanze2);

            this.Tisch=this.physics.add.image(600,450,'Tisch');
            this.makeImmovable(this.Tisch);
            this.paper.create(580,435,'Paper').setAngle(180);
            this.paper.create(595,435,'Paper').setAngle(180);
            this.paper.create(590,439,'Paper').setAngle(180);
            this.paper.create(590,425,'Paper').setAngle(180);

            this.Stuhl1=this.physics.add.sprite(540, 440, 'Stuehle',2);
            this.makeImmovable(this.Stuhl1);
            this.Stuhl2=this.physics.add.sprite(575, 480, 'Stuehle',1);
            this.makeImmovable(this.Stuhl2);
            this.Stuhl3=this.physics.add.sprite(620, 480, 'Stuehle',1);
            this.makeImmovable(this.Stuhl3);
            this.Stuhl4=this.physics.add.sprite(655, 440, 'Stuehle',3);
            this.makeImmovable(this.Stuhl4);

            this.door = this.physics.add.image(730, 13, 'Tuer');
            this.EingangsDoor = this.physics.add.image(8, 370, 'DoppelTuer').setAngle(270);
            this.BueroDoor = this.physics.add.image(91, 8, 'DoppelTuer')

            this.player = this.physics.add.sprite(730, 40, 'dude',5).setScale(1.2);
            this.janitor = this.physics.add.sprite(730, 5, 'janitor',5).setScale(1.2).setVisible(false);
            this.sekretaer = this.physics.add.sprite(420,130, 'sekretaer',5).setScale(1.2);
            this.makeImmovable(this.sekretaer);


            this.Dialog = this.physics.add.image(420, 520, 'dialog').setScale(0.65);
            this.Dialog.setVisible(false);

            this.physics.add.collider(this.player, border);
            this.physics.add.collider(this.player, LobbyDesk);
            this.physics.add.collider(this.player, this.gelaenderL);
            this.physics.add.collider(this.player, this.gelaenderR);
            this.physics.add.collider(this.player, this.sekretaer);
            this.physics.add.collider(this.player, this.laptop);
            this.physics.add.collider(this.player, this.Tisch);
            this.physics.add.collider(this.player, this.Stuhl1);
            this.physics.add.collider(this.player, this.Stuhl2);
            this.physics.add.collider(this.player, this.Stuhl3);
            this.physics.add.collider(this.player, this.Stuhl4);
            this.physics.add.collider(this.player, this.Vase1);
            this.physics.add.collider(this.player, this.Vase2);
            this.physics.add.collider(this.player, this.janitor);

            
           
            this.createAnimations();
            //  Input Events
            this.input.keyboard.on('keyup_I', function(e){
                if(this.inDialog){
                    this.toggleDialog();
                }else{
                    //Aufgabe Ausweis - Start
                    if(this.inRange(this.sekretaer,50,70)){
                        this.inDialog = true;
                        this.actualDialog = this.DialogSekretaer;
                        //console.log(this.actualDialog);
                        this.actualTask = undefined;
                        this.DialogSekretaerDone = true;
                        this.toggleDialog();
                        document.getElementById("Hinweis").innerHTML = "Guck dir die E-Mail auf dem Rechner der Sekretärin an.";
                    }else{
                    if(this.inRange(this.workstation,30,50) && this.DialogSekretaerDone){
                        this.inDialog = true;
                        this.actualDialog = this.DialogPhishing;
                        //console.log(this.actualDialog);
                        this.actualTask = this.Aufgabe_Phishing;
                        this.DialogPhishingDone = true;
                        this.toggleDialog();
                    
                    }else{
                        if(this.inRange(this.Tisch,70,70)&&!this.DialogDokumenteDone&&this.DialogPhishingDone){
                            this.inDialog = true;
                            this.actualDialog = this.DialogDokumente;
                            //console.log(this.actualDialog);
                            this.actualTask = this.Aufgabe_Dokumente;
                            this.toggleDialog();    
                    	}
		    }
                }                
            }
        },this);
        
        this.Key_W =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.Key_A =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Key_S =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.Key_D =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.DialogSekretaer.add(this.add.text(240,430,"Da bist du ja wieder "+this.user+"!\n\nHat Tom dir deinen Ausweis\nund eine Einweisung gegeben?",{font:"18px Courier"}).setColor("black"));
        this.DialogSekretaer.add(this.add.text(240,430,"Sehr gut!\nUnd du hast auch schon deine\nersten Aufgaben erledigt?\nDas ist ja super!",{font:"18px Courier"}).setColor("black"));
        this.DialogSekretaer.add(this.add.text(240,430,"Ich brauche ebenfalls deine\nUnterstützung! Ich habe eine\nkomische Mail erhalten und weiß\nnicht was ich mit ihr tun\nsoll...",{font:"18px Courier"}).setColor("black"));
        this.DialogSekretaer.add(this.add.text(240,430,"Schau dir die Mail doch bitte\nan meinem PC hinter mir an!",{font:"18px Courier"}).setColor("black"));
        this.DialogSekretaer.toggleVisible();

        this.DialogPhishing.add(this.add.text(240,430,"[Dies ist der PC der\nSekretaerin. Outlook ist noch\ngeöffnet...]",{font:"18px Courier"}).setColor("black"));
        this.DialogPhishing.toggleVisible();

        this.DialogPhishing_Opt1.add(this.add.text(240,430,"[Kurz nach dem du das Update\ninstalliert hast, meldet sich\ndie Antivirensoftware\ndes PC.]",{font:"18px Courier"}).setColor("black"));
        this.DialogPhishing_Opt1.add(this.add.text(240,430,"Oh je, was ist das?\nDu scheinst einen Virus\ninstalliert zu haben...",{font:"18px Courier"}).setColor("black"));
        this.DialogPhishing_Opt1.add(this.add.text(240,430,"Jetzt werde ich der IT doch\nBescheid geben müssen...\nIch dachte du kennst dich mit\nsowas aus?!",{font:"18px Courier"}).setColor("black"));
        this.DialogPhishing_Opt1.add(this.add.text(240,430,"Vielleicht machst du jetzt etwas\neinfacheres...\nDer Besucherbereich wurde\nunordentlich hinterlassen.",{font:"18px Courier"}).setColor("black"));
        this.DialogPhishing_Opt1.add(this.add.text(240,430,"Geh bitte und räume ihn auf!",{font:"18px Courier"}).setColor("black"));
        this.DialogPhishing_Opt1.toggleVisible();

        this.DialogPhishing_Opt2.add(this.add.text(240,430,"Gut, dass ich dich gefragt habe!\nIch hätte das Update\neinfach installiert...",{font:"18px Courier"}).setColor("black"));
        this.DialogPhishing_Opt2.add(this.add.text(240,430,"In Zukunft werde ich mehr\naufpassen müssen.\nKönntest du als nächstes in\nden Wartebereich gehen und dort\netwas aufräumen?",{font:"18px Courier"}).setColor("black"));
        this.DialogPhishing_Opt2.toggleVisible();

        this.Aufgabe_Phishing=this.physics.add.image(400,300,'Aufgabe_Phishing');
        this.Aufgabe_Phishing.setVisible(false);

        this.DialogDokumente.add(this.add.text(240,430,"[Auf dem Tisch verteilt\nliegen verschiedene Dokumente]",{font:"18px Courier"}).setColor("black"));

        this.DialogDokumente.toggleVisible();

        this.DialogDokumente_Opt1.add(this.add.text(240,430,"Sind das die Dokumente die hier\nlagen??",{font:"18px Courier"}).setColor("black"));
        this.DialogDokumente_Opt1.add(this.add.text(240,430,"Ein Glück das du sie gefunden\nhast! Hätte jemand anderes diese\nDokumente könnte er uns eine\nMenge Probleme bereiten!",{font:"18px Courier"}).setColor("black"));
        this.DialogDokumente_Opt1.add(this.add.text(240,430,"Danke für die Aufbewahrung...\nIch verwahre sie jetzt sicher\nein!",{font:"18px Courier"}).setColor("black"));
        this.DialogDokumente_Opt1.toggleVisible();

        this.DialogDokumente_Opt2.add(this.add.text(240,430,"Wolltest du das hier\neinfach so liegen lassen??",{font:"18px Courier"}).setColor("black"));
        this.DialogDokumente_Opt2.add(this.add.text(240,430,"Stell dir vor jemand\nfindet das.. Damit könnte er uns\neine Menge Probleme bereiten!",{font:"18px Courier"}).setColor("black"));
        this.DialogDokumente_Opt2.add(this.add.text(240,430,"Ich verwahre es jetzt sicher\nein! Nächste Mal kümmere dich\nbitte darum, dass vertrauliche\nDokumente nicht liegen bleiben!",{font:"18px Courier"}).setColor("black"));
        this.DialogDokumente_Opt2.toggleVisible();

	this.DialogEnde.add(this.add.text(240,430,"Du hast das Ende\nunseres Security Games erreicht!\nVielen Dank für's spielen!\nDu wirst in Kürze\nweitergeleitet!",{font:"18px Courier"}).setColor("black"));
	this.DialogEnde.toggleVisible();

        this.Aufgabe_Dokumente=this.physics.add.image(400,300,'Aufgabe_Dokumente');
        this.Aufgabe_Dokumente.setVisible(false);
        
        
        }

    update ()
    {
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
        //Aufgabe Phishing
        if(this.input.mousePointer.justDown && this.Aufgabe_Phishing.visible == true){
            //Option1
            if(this.input.mousePointer.x >= 156 && this.input.mousePointer.x <= 653 && this.input.mousePointer.y >= 347 && this.input.mousePointer.y <= 445){
                this.score = this.score - 50;
                var json = '{'
                       +'"gameId" : '+this.gameID+','
                       +'"questionId"  : 3,'
                       +'"answer" : 2'
                       +'}';
                this.questionAPI(json);
                document.getElementById("Punkte").innerHTML= "Punkte: "+ this.score;
                document.getElementById("Hinweis").innerHTML = "Phishing E-Mails wollen Sie immer überzeugen etwas zu tun, was sie unter normalen Umständen nicht tun würden. Das kann zum Beispiel das Eingeben von Passwörtern oder installieren von Software sein. Überprüfen sie bei E-Mails immer die genaue Absenderadresse, sowie eventuelle Links die verschickt werden. Seien Sie argwöhnisch! Im Zweifel melden Sie die E-Mail mithilfe des Buttons 'Report Phishing to IT' innerhalb ihres Outlook.";
                this.Aufgabe_Phishing.setVisible(false);
                this.inDialog = true;
                this.actualDialog = this.DialogPhishing_Opt1;
                this.actualTask = undefined;
                this.DialogPhishingDone = true;
                this.toggleDialog();
                //console.log("Option1");
            }
            //Option2
            if(this.input.mousePointer.x >= 156 && this.input.mousePointer.x <= 653 && this.input.mousePointer.y >= 458 && this.input.mousePointer.y <= 541){
                this.score = this.score + 50;
                var json = '{'
                       +'"gameId" : '+this.gameID+','
                       +'"questionId"  : 3,'
                       +'"answer" : 1'
                       +'}';
                this.questionAPI(json);
                document.getElementById("Punkte").innerHTML= "Punkte: "+ this.score;
                document.getElementById("Hinweis").innerHTML = "Phishing E-Mails wollen Sie immer überzeugen etwas zu tun, was sie unter normalen Umständen nicht tun würden. Das kann zum Beispiel das Eingeben von Passwörtern oder installieren von Software sein. Überprüfen sie bei E-Mails immer die genaue Absenderadresse, sowie eventuelle Links die verschickt werden. Seien Sie argwöhnisch! Im Zweifel melden Sie die E-Mail mithilfe des Buttons 'Report Phishing to IT' innerhalb ihres Outlook.";
                this.Aufgabe_Phishing.setVisible(false);
                this.inDialog = true;
                this.actualDialog = this.DialogPhishing_Opt2;
                this.actualTask = undefined;
                this.DialogPhishingDone = true;
                this.toggleDialog();
                //console.log("Option2");
            }
        }

        //Aufgabe Dokumente
        if(this.input.mousePointer.justDown && this.Aufgabe_Dokumente.visible == true){
            //Option1
            if(this.input.mousePointer.x >= 156 && this.input.mousePointer.x <= 653 && this.input.mousePointer.y >= 347 && this.input.mousePointer.y <= 445){
                this.score = this.score + 50;
                var json = '{'
                       +'"gameId" : '+this.gameID+','
                       +'"questionId"  : 4,'
                       +'"answer" : 1'
                       +'}';
                this.questionAPI(json);
                document.getElementById("Punkte").innerHTML= "Punkte: "+ this.score;
                document.getElementById("Hinweis").innerHTML = "Firmenrelevante Dokumente sollten niemals an öffentlich zugänglichen Orten unbeaufsichtigt gelassen werden. Vertrauliche Dokumente sind in jedem Fall einzuschließen. Falls sie vertrauliche Dokumente an einem leicht zugänglichen Ort unbeaufsichtigt entdecken, sollten Sie sie in jedem Fall zur sicheren Verwahrung mitnehmen. Informieren Sie im Zweifel zu jeder Zeit die IT.";

                this.Aufgabe_Dokumente.setVisible(false);
                this.inDialog = true;
                this.actualDialog = this.DialogDokumente_Opt1;
                this.actualTask = undefined;
                this.DialogDokumentDone = true;
                this.janitorMoving1 = true;
                this.toggleDialog();
                //console.log("Option1");
            }
            //Option2
            if(this.input.mousePointer.x >= 156 && this.input.mousePointer.x <= 653 && this.input.mousePointer.y >= 458 && this.input.mousePointer.y <= 541){
                this.score = this.score - 50;
                var json = '{'
                       +'"gameId" : '+this.gameID+','
                       +'"questionId"  : 4,'
                       +'"answer" : 2'
                       +'}';
                this.questionAPI(json);
                document.getElementById("Punkte").innerHTML= "Punkte: "+ this.score;
                document.getElementById("Hinweis").innerHTML = "Firmenrelevante Dokumente sollten niemals an öffentlich zugänglichen Orten unbeaufsichtigt gelassen werden. Vertrauliche Dokumente sind in jedem Fall einzuschließen. Falls sie vertrauliche Dokumente an einem leicht zugänglichen Ort unbeaufsichtigt entdecken, sollten Sie sie in jedem Fall zur sicheren Verwahrung mitnehmen. Informieren Sie im Zweifel zu jeder Zeit die IT.";
                this.Aufgabe_Dokumente.setVisible(false);
                this.inDialog = true;
                this.actualDialog = this.DialogDokumente_Opt2;
                this.actualTask = undefined;
                this.DialogDokumentDone = true;
                this.janitorMoving1 = true;
                this.toggleDialog();
                //console.log("Option2");
            }
        }
        if(this.janitorMoving1 == true && this.janitor.y < 390){
            //console.log("test");
            this.janitor.setVisible(true);
            this.janitor.setVelocityY(160);
            this.janitor.anims.play('down_j', true);
        }
        if(this.janitorMoving1 == true && this.janitor.y >= 390){
            this.janitor.setVelocityY(0);
            //this.janitor.anims.stop();
            if(this.janitor.x > 630){
                this.janitor.setVelocityX(-160);
                this.janitor.anims.play('left_j', true);
            }else{
                this.janitor.setVelocityX(0);
                this.janitor.anims.stop();
                this.janitorMoving1 = false;
                this.paper.toggleVisible();
                this.makeImmovable(this.janitor);
            }
    
        }
	if(!this.inDialog && this.DialogPhishingDone && this.DialogDokumentDone){
		this.endGame();
	}
    }
 
    inRange(objekt,x,y){
            //console.log("Player-x:"+this.player.x);
            //console.log("Player-y:"+this.player.y);
            //console.log("Laptop-x:"+objekt.x);
            //console.log("Laptop-y:"+objekt.y);
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
            var children = this.actualDialog.getChildren();
            //console.log(children);
            var firstRun = true;
            var changedSomething = false;
            for(var i = 0; (i < children.length)&&!changedSomething;i++){
                if(children[i].visible == true){
                    changedSomething = true;
                        firstRun = false;
                        children[i].setVisible(false);
                        //console.log(i);
                        //console.log(children[i]);
                        if(i != children.length-1){
                            children[i+1].setVisible(true);   
                        }else{
                            if(this.actualTask != undefined){
                                this.actualTask.setVisible(true);
                                this.actualDialog = undefined;
                                this.actualTask = undefined;
                            }else{
                                this.Key_W.enabled = true;
                                this.Key_A.enabled = true;
                                this.Key_S.enabled = true;
                                this.Key_D.enabled = true;
				this.makeMovable(this.player);
                                this.Dialog.setVisible(false);
                                this.inDialog = false;
                                this.actualDialog = undefined;
                                this.actualTask = undefined;
                            }   
                        }
                    }    
            }
            if(firstRun){
                //console.log(i);
                this.Dialog.setVisible(true);
                children[0].setVisible(true);
		this.makeImmovable(this.player);
                this.Key_W.enabled = false;
                this.Key_A.enabled = false;
                this.Key_S.enabled = false;
                this.Key_D.enabled = false;
            }
        }    
    }

createAnimations(){
     //  Our player animations, turning, walking left and walking right.
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
 
endGame(){
this.startingTime=Date.now() - 1000;
var neededTimeMs = Date.now() - this.Startingtime;
var neededTime = this.convertTime(neededTimeMs);
		var json = '{'
			+'"gameId" : '+this.gameID+','
                        +'"score"  : '+this.score+','
                        +'"time" : '+neededTime+''
                        +'}';
URL = "https://game.twenska.de/be/end-game";  //Your URL
/*
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    xmlhttp.open("POST", URL, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    console.log(json);
    xmlhttp.send(json);*/
    this.scene.start("Ende", {score: this.score,user: this.user,gameID: this.gameID,time: neededTime});    
}
convertTime(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
}
