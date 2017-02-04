class Preload extends Phaser.State {
    preload() {
        this.load.script('neutralCell', 'js/Entity/neutralCell.js');
        this.load.script('hostileCell', 'js/Entity/hostileCell.js');
        this.load.script('MainWindow', 'js/MainFile/MainWindow.js');
        
        
        
        
        
        this.load.image('backgroundimage', 'img/testbackground.png');
        this.load.image('hostileCell', 'img/hostileCell.png');
        this.load.image('neutralCell', 'img/NeutralCell.png');
        this.load.image('rangeIndicator', 'img/rangeIndicator.png');
    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('MainWindow', MainWindow);
        this.game.state.start('MainWindow');

    }

}