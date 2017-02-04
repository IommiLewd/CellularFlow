
class NeutralCell extends Phaser.Sprite {
    constructor(game, posx, posy, tilemap) {
        super(game, posx, posy, 'neutralCell', 0);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this._randomMovement();
        this.seededTimer = 0;
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.body.bounce.set(1.0);
        this.alive = true;
        
    }

    _movementFunction() {
        this.seededTimer = Math.random() * (8 - 1) + 1;
        this.game.time.events.add(Phaser.Timer.SECOND * this.seededTimer, this._randomMovement, this);
    }

    _randomMovement() {
        if(this.alive) {
        this.randomspeed = Math.random() * (17 - 2) + 2;
        this.randomangle = Math.random() * (361 - 0) + 0;
         this.game.physics.arcade.velocityFromAngle(this.randomangle, this.randomspeed, this.body.velocity);
        this._movementFunction();
    } else {
        this.body.velocity = 0;
        this.body.acceleration = 0;
    }
    
    
    
    
    }

    update() {
    }
}