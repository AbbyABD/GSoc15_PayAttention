'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
   preload: function() {
       
    // loading the aseets which are used in game   
    this.asset = this.add.sprite(598,432, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('ground', 'assets/platform.png');
    this.load.image('up', 'assets/up.png');
    this.load.image('down', 'assets/down.png');
    this.load.image('clickme', 'assets/clickme.png');
    this.load.image('star', 'assets/diamond.png',30,30);
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.image('obstacle', 'assets/bird.png',32,48); 
    this.load.image('instruction', 'assets/instruction.png');
    this.load.image('tux4kids','assets/title.png');
    this.load.image('background_menu','assets/background_menu.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
