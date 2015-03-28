  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Display the dude on the screen and starting the animation
        this.dude = this.game.add.sprite(100, 120, 'dude');
        this.game.physics.arcade.enable(this.dude);
        this.dude.animations.add('r',  [5, 6, 7, 8], 10, true);
        this.dude1 = this.game.add.sprite(100, 265, 'dude');
        this.game.physics.arcade.enable(this.dude1);
        this.dude1.animations.add('r',  [5, 6, 7, 8], 10, true);
        this.bar =this.game.add.sprite(0,185, 'ground');
        this.bar.scale.setTo(2, 2);
        this.dude.animations.play('r');
        this.dude1.animations.play('r');

        //Adding function on up arrow key and down arrow key
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        up.onDown.add(this.player1, this);   
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        down.onDown.add(this.player2, this); 
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
            
        // Create a group of 20 obstacles
        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;
        this.obstacles.createMultiple(20, 'obstacle');
        
        // Create a group of 20 star
        this.stars = this.game.add.group();
        this.stars.enableBody = true;
        this.stars.createMultiple(20, 'star');
               
        // Timer that calls 'addRowOfobstacles' ever 1.5 seconds
        this.timer = this.game.time.events.loop(1000, this.addRowOfobstacles, this); 
        
        this.timer = this.game.time.events.loop(1000, this.addRowOfobstacles2, this); 

        // Add a score label on the top left of the screen
        this.score = 0
        this.count=0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });    
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
    

    // Add a obstacle on the screen
    addOneobstacle: function(x, y) {
        
        // Get the first dead obstacle of our group
        var obstacle = this.obstacles.getFirstDead();
        // Set the new position of the obstacle
        obstacle.reset(x, y);  
        // Add velocity to the obstacle to make it move left
        obstacle.body.velocity.x = -200-this.score*6; 
        // Kill the obstacle when it's no longer visible 
        obstacle.checkWorldBounds = true;
        obstacle.outOfBoundsKill = true;
        
    },
    
    addOnestar: function(x, y) {

        // Get the first dead obstacle of our group
        var star = this.stars.getFirstDead();
        // Set the new position of the obstacle
         star.reset(x, y);
        // Add velocity to the obstacle to make it move left
        star.body.velocity.x = (-200-this.score*6); 
        // Kill the obstacle when it's no longer visible 
        star.checkWorldBounds = true;
        star.outOfBoundsKill = true;
        
    },

    addRowOfobstacles: function() {
        
        var hole = Math.floor(Math.random()*40);
        var c=8;
        c=c+this.score/5;
            
        if(hole<=c){
            this.addOneobstacle(800, 10);
        }
        else if(hole<=2*c){
            this.addOneobstacle(800, 100);
        }
        else if(hole<=3*c){
            this.addOnestar(800,10)
        }
        
    
        this.score += 1;
        this.labelScore.text = 'stars:'+this.count;  
    },
    
     addRowOfobstacles2: function() {
        
        var hole1 = Math.floor(Math.random()*40);
        var c=8;
        c=c+this.score/5;
         
        if(hole1<=c){
            this.addOneobstacle(800, 270);
        }
        else if(hole1<=2*c){
            this.addOneobstacle(800, 365);
        }
         else if(hole1<=3*c){
            this.addOnestar(800,270)
        }
        
        this.score += 1;
        this.labelScore.text = 'stars:'+this.count;  
    },

      
    
     // This function is called 60 times per second
    update: function() {

        // If the dude overlap any obstacles, call 'restartGame'
        this.game.physics.arcade.overlap(this.dude, this.obstacles, this.restartGame, null, this);      
        this.game.physics.arcade.overlap(this.dude1, this.obstacles, this.restartGame, null, this);         
        this.game.physics.arcade.overlap(this.dude, this.stars, this.scoreup, null, this);      
        this.game.physics.arcade.overlap(this.dude1, this.stars, this.scoreup, null, this);     
    },
      
         // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
          this.game.state.start('gameover');
    },
    
     scoreup: function(player,star) {
        // Start the 'main' state, which restarts the game  
        star.kill();
        this.count+=1;
         
    
    }

  };
  
  module.exports = Play;