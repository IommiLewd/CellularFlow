/**
 * base class for a simple game level.
 *
 * @constructor  {}
 * @method   :
 * @property :
 * startPosition {} (x,y)
 */

class MainWindow extends Phaser.State {
    constructor() {
        super();
    }

    preload() {}


    _spawnIntruder() {
        this.randomX = Math.random() * (825 - 15) + 15;
        this.randomY = Math.random() * (525 - 15) + 15;
        this.hostileCell = new HostileCell(this.game, this.randomX, this.randomY);
        this.hostileCellGroup.add(this.hostileCell);
    }


    _spawnNeutralCell() {
        this.randomX = Math.random() * (825 - 15) + 15;
        this.randomY = Math.random() * (525 - 15) + 15;
        this.neutralCell = new NeutralCell(this.game, this.randomX, this.randomY);
        this.neutralCellGroup.add(this.neutralCell);
    }
    _rangeEvent(hostileCell, neutralCell) {
        console.log('range Event firing!!!!');
        hostileCell.engaging = true;
        neutralCell.body.moves = false;
        hostileCell.targetCellX = neutralCell.x;
        hostileCell.targetCellY = neutralCell.y;
    }


    _assimilationEvent(hostileCell, neutralCell) {
        //console.log('Cell Takeover Initialized');
        //console.log(neutralCell.x, neutralCell.y);
        hostileCell.engaging = true;
        hostileCell.movementSpeed = 2;
        //neutralCell.body.moves = false;
        hostileCell.targetCellX = neutralCell.x;
        hostileCell.targetCellY = neutralCell.y;
        if (hostileCell.x + 5 > neutralCell.x && hostileCell.x - 5 < neutralCell.x) {
            if (hostileCell.y + 5 > neutralCell.y && hostileCell.y - 5 < neutralCell.y) {
                this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                     if(neutralCell.alive){
                     this.hostileCell = new HostileCell(this.game, neutralCell.x, neutralCell.y);
                         this.hostileCellGroup.add(this.hostileCell);
                         hostileCell.movementSpeed = 10;
                    }
                    neutralCell.kill();
                   
                    //neutralCell.alive = false;
                    //this.hostileCell = new HostileCell(this.game, neutralCell.x, neutralCell.y);
                }, this);
                //        neutralCell.kill();
                    
                //        this.hostileCellGroup.add(this.hostileCell);
            }
        }
    }

    _collisionHandler() {
        this.game.physics.arcade.collide(this.neutralCellGroup);
        // this.game.physics.arcade.overlap(this.hostileCell.targetingReticule, this.neutralCellGroup, this._assimilationEvent, null, this);
        this.game.physics.arcade.overlap(this.hostileCellGroup, this.neutralCellGroup, this._assimilationEvent, null, this);
    }

    create() {
        this.game.add.tileSprite(0, 0, 840, 560, 'backgroundimage');
        this.neutralCellGroup = this.add.group();
        this.hostileCellGroup = this.add.group();
        console.log('MainWindow Fired');
        for (this.i = 0; this.i < 35; this.i++) {
            this._spawnNeutralCell();
        }
        this._spawnIntruder();
    }


    update() {
        this._collisionHandler();
    }
}