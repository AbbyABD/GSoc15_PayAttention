'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
      
        // Setting up the background
        this.stage.backgroundColor = '#71c5cf';
        this.instruction=this.game.add.sprite(300,0,'instruction');
      
        //Adding the player and starts the animation
        this.dude = this.game.add.sprite(100, 120, 'dude');
        this.dude.animations.add('r',  [5, 6, 7, 8], 10, true);
        this.dude1 = this.game.add.sprite(100, 265, 'dude');
        this.dude1.animations.add('r',  [5, 6, 7, 8], 10, true);
        this.bar =this.game.add.sprite(0,185, 'ground');
        this.bar.scale.setTo(2, 2);
        this.dude.animations.play('r');
        this.dude1.animations.play('r');

        this.instructionup=this.game.add.sprite(135,125,'up');
        this.instructiondown=this.game.add.sprite(135,270,'down');
        this.clickme=this.game.add.sprite(105,208,'clickme');
      
        //Adding function on up arrow key and down arrow key
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        up.onDown.add(this.player1, this);   
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        down.onDown.add(this.player2, this); 
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
            
  },
    
    // Altering the road of first player
    player1: function() {
        
        if(this.dude.position.y == 30)
        {
            this.dude.position.y = 120;
            this.instructionup.y=128; 
        }
        else{
            this.dude.position.y = 30;
            this.instructionup.y=38;
        }
        
    },
    
    // Altering the road of second player
    player2: function() {
        
        if(this.dude1.position.y == 265)
        {
            this.dude1.position.y = 350;
            this.instructiondown.y=358;
        }
        else{
            this.dude1.position.y = 265;
             this.instructiondown.y=273;
        }
    },
    
    // starting the game as player click 
  update: function() {
    
      if(this.game.input.activePointer.justPressed()) 
      {
        this.game.state.start('play');
      }
      else if(this.space.isdown){
          this.game.state.start('play');
      }
  }
};

module.exports = Menu;
