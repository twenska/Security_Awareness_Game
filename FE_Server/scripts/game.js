/*
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
var user = GetURLParameter("user");
document.getElementById("message").innerHTML =  "Your name is "+user;
*/

var helper = false;
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet('floor', 'assets/images/floors.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('dude', 'assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('laptop', 'assets/images/laptop.png', { frameWidth: 32, frameHeight: 54 });
    this.load.image('sketch', 'assets/images/wiki-sketch.png', { frameWidth: 800, frameHeight: 600 });

}

function create() {
    var border = this.physics.add.staticGroup();
    var floor = this.physics.add.staticGroup();

    for (var i = 0; i <= game.config.width; i += 32) {
        for (var t = 0; t <= game.config.height; t += 32) {
            floor.create(i, t, 'floor', 53);
        }

    }
    console.log(game.config.height);
    this.physics.add.sprite(0, 0, 'floor', 5);
    for (var i = 0; i <= game.config.width; i += 32) {
        border.create(0, i, 'floor', 5);
    }
    for (var i = 0; i <= game.config.height; i += 32) {
        border.create(game.config.width, i, 'floor', 5);
    }
    for (var i = 0; i <= game.config.width; i += 32) {
        border.create(i, 0, 'floor', 5);
    }
    for (var i = 0; i <= game.config.width; i += 32) {
        border.create(i, game.config.height, 'floor', 5);
    }
    player = this.physics.add.sprite(100, 450, 'dude');

    laptop = this.physics.add.image(400, 300, 'laptop', 0).setScale(1.1);
    laptop.body.immovable = true; laptop.body.moves = false; laptop.allowGravity = false; laptop.body.gravity.x = 0; laptop.body.gravity.y = 0; laptop.body.velocity.x = 0; laptop.body.velocity.y = 0;
    sketch = this.physics.add.image(400, 300, 'sketch');
    sketch.setVisible(false);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, border);
    this.physics.add.collider(player, laptop);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

}

function update() {

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else if (cursors.up.isDown) {
        player.setVelocityY(-160);

        player.anims.play('right', true);
    }

    else if (cursors.down.isDown) {
        player.setVelocityY(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('turn');
    }
    if (cursors.space.isDown && inFrontOfLaptop()) {
        toggleSketch();
    }
}
function toggleSketch() {

    if (sketch.visible && helper == true) {
        sketch.setVisible(false);
        setTimeout(function () {
            helper = false;
        }, 200);

    } else if (!sketch.visible && helper == false) {
        sketch.setVisible(true);
        setTimeout(function () {
            helper = true;
        }, 200);
    }

}
function inFrontOfLaptop() {
    //console.log("Player-x:"+player.x);
    //console.log("Player-y:"+player.y);
    //console.log("Laptop-x:"+laptop.x);
    //console.log("Laptop-y:"+laptop.y);
    if ((player.x <= laptop.x + 20 && player.x >= laptop.x - 20) && (player.y - 55 <= laptop.y)) {
        return true;
    } else {
        return false;
    }
}