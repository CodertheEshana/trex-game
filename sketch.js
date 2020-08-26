var trex,ground;
var trexI;
var groundI;
var cloudI;
var CloudsGroup;
var ObstaclesI1;
var ObstaclesI2;
var ObstaclesI3;
var ObstaclesI4;
var ObstaclesI5;
var ObstaclesI6;
var ObstaclesGroup;
var gameOverI;
var restartI;
var gameState;
var PLAY=1;
var END=0;
var count=0;
function preload() {
  trexI=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundI=loadImage("ground2.png")
  cloudI=loadImage("cloud.png")
  Obstacles1I=loadImage("obstacle1.png")
   Obstacles2I=loadImage("obstacle2.png")
   Obstacles3I=loadImage("obstacle3.png")
   Obstacles4I=loadImage("obstacle4.png")
   Obstacles5I=loadImage("obstacle5.png")
   Obstacles6I=loadImage("obstacle6.png")
  gameOverI=loadImage("gameOver.png")
  restartI=loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,150,20,50)
  trex.addAnimation("tem",trexI)
  trex.scale=0.7
  ground=createSprite(200,180,400,10)
  ground.addImage("word",groundI)
  ObstaclesGroup=new Group();
  CloudsGroup=new Group();
  restart=createSprite(300,140)
  gameOver=createSprite(300,100)
   gameOver.visible = false;
    restart.visible = false;
  count=0;
  gameState=PLAY;
 gameOver.addImage("worm",gameOverI)
  gameOver.scale=0.5
  restart.addImage("work",restartI)
  restart.scale=0.5
  
}
function draw() {
  //set background to white
  background("white");
  //display score
  textSize(25)
  text("Score: "+ count, 450, 50);
  console.log(gameState);
  
  
  if(gameState === PLAY){
    //move the ground
   ground.velocityX = -(6 + 3*count/100);
    //scoring
   count = count +1;
    
    /*if (count>0 && count%100 === 0){
      playSound("checkPoint.mp3");
    }*/
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 141){
      trex.velocityY = -12 ;
      //playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
     // playSound("jump.mp3");
      gameState = END;
     
      //playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(ground);
  
  drawSprites();
}
  
  

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cloudI);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
     console.log(rand)
    switch(rand) {
        case 1: obstacle.addImage(Obstacles1I);
        break;
        case 2: obstacle.addImage(Obstacles2I);
        break;
        case 3: obstacle.addImage(Obstacles3I);
        break;
        case 4: obstacle.addImage(Obstacles4I);
        break;
        case 5: obstacle.addImage(Obstacles5I); 
        break;
        case 6: obstacle.addImage(Obstacles6I);
        break;
        default: break;
        
                 }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  
  
  count = 0;
  
}




