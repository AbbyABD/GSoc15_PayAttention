// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(600, 440, Phaser.AUTO, 'gameDiv');

// Creates a new 'main' state that will contain the game
var mainState = {

    // Function called first to load all the assets
    preload: function() {  
        // Change the background color of the game
        game.stage.backgroundColor = '#71c5cf';
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.image('obstacle', 'assets/obstacle.png'); 
        // Load the obstacle sprite
       
    },

    // Fuction called after 'preload' to setup the game 
    create: function() { 
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the dude on the screen
        this.dude = this.game.add.sprite(100, 120, 'dude');
        game.physics.arcade.enable(this.dude);
        this.dude.animations.add('r',  [5, 6, 7, 8], 10, true);
        
        this.dude1 = this.game.add.sprite(100, 265, 'dude');
        game.physics.arcade.enable(this.dude1);
        this.dude1.animations.add('r',  [5, 6, 7, 8], 10, true);
      
        
        this.bar =this.game.add.sprite(0,185, 'ground');
        this.bar.scale.setTo(2, 2);
        
        this.dude.animations.play('r');
        this.dude1.animations.play('r');

      
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        spaceKey.onDown.add(this.jump, this); 
        
         var space = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        space.onDown.add(this.player2, this); 

        // Create a group of 20 obstacles
        this.obstacles = game.add.group();
        this.obstacles.enableBody = true;
        this.obstacles.createMultiple(20, 'obstacle');
        
         // Create a group of 20 star
        this.stars = game.add.group();
        this.stars.enableBody = true;
        this.stars.createMultiple(20, 'star');
         this.stars.scale.setTo(2, 2);
       
        // Timer that calls 'addRowOfobstacles' ever 1.5 seconds
        this.timer = this.game.time.events.loop(1000, this.addRowOfobstacles, this); 
        
         this.timer = this.game.time.events.loop(1200, this.addRowOfobstacles2, this); 

        // Add a score label on the top left of the screen
        this.score = 0;
        this.count=0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  
    },

    // This function is called 60 times per second
    update: function() {
        // If the dude is out of the world (too high or too low), call the 'restartGame' function
        if (this.dude.inWorld == false)
            this.restartGame(); 

        // If the dude overlap any obstacles, call 'restartGame'
        game.physics.arcade.overlap(this.dude, this.obstacles, this.restartGame, null, this);      
        game.physics.arcade.overlap(this.dude1, this.obstacles, this.restartGame, null, this); 
        
         game.physics.arcade.overlap(this.dude, this.stars, this.scoreup, null, this);      
        game.physics.arcade.overlap(this.dude1, this.stars, this.scoreup, null, this); 
    
    },

    // Make the dude jump 
    jump: function() {
        // Add a vertical velocity to the dude
        if(this.dude.position.y == 30)
        this.dude.position.y = 120;
        
        else{
            this.dude.position.y = 30;
        }
    },
    
    player2: function() {
        // Add a vertical velocity to the dude
        if(this.dude1.position.y == 265)
        this.dude1.position.y = 350;
        
        else{
            this.dude1.position.y = 265;
        }
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
    
     scoreup: function(player,star) {
        // Start the 'main' state, which restarts the game  
        star.kill();
         this.count+=1;
         
    
    },

    // Add a obstacle on the screen
    addOneobstacle: function(x, y) {
        // Get the first dead obstacle of our group
        var obstacle = this.obstacles.getFirstDead();
       

        // Set the new position of the obstacle
        obstacle.reset(x, y);
         
        // Add velocity to the obstacle to make it move left
        obstacle.body.velocity.x = -250-this.score*8; 
       
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
        
        star.body.velocity.x = (-250-this.score*8)/2; 
               
        // Kill the obstacle when it's no longer visible 
        
        star.checkWorldBounds = true;
        star.outOfBoundsKill = true;
    },

    // Add a row of 6 obstacles with a hole somewhere in the middle
    addRowOfobstacles: function() {
        var hole = Math.floor(Math.random()*40);
        
   
        var c=8;
        
        c=c+this.score/5;
            
        if(hole<=c){
            this.addOneobstacle(600, 10);
        }
        else if(hole<=2*c){
            this.addOneobstacle(600, 100);
        }
        else if(hole<=3*c){
            this.addOnestar(600,10)
        }
        
    
        this.score += 1;
        this.labelScore.text = 'stars:'+this.count;  
    },
    
     addRowOfobstacles2: function() {
        var hole1 = Math.floor(Math.random()*40);
        

          var c=8;
        
        c=c+this.score/5;
         
        if(hole1<=c){
            this.addOneobstacle(600, 270);
        }
        else if(hole1<=2*c){
            this.addOneobstacle(600, 365);
        }
         else if(hole1<=3*c){
            this.addOnestar(600,270)
        }
        
        
    
        this.score += 1;
        this.labelScore.text = 'stars:'+this.count;  
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main'); 