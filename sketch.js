
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var bananaImage,  obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;
var survivalscore=0;
var bgimage;
var bg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 bgimage = loadImage("forest.jfif");
}



function setup() {
  createCanvas(600,200);
  monkey = createSprite(50,152,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09;
  monkey.debug=false;

  ground = createSprite(200,189,590,16);
  ground.velocityX = -5;
  ground.x = ground.width/2;
  ground.visible = false;
  
 
  FoodGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background(200);
  fill("black");
  text("B@n@n@$ E@ten :- " + score ,400,30);
  text("$urv!v@al T!me :- " + survivalscore,100,30)
  
 if (gameState===PLAY){
   survivalscore = survivalscore + Math.round(getFrameRate()/60);
  
   if(keyDown("space") && monkey.y >100) {
      monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
  if (monkey.isTouching(FoodGroup)){
    score = score+1;
    FoodGroup.destroyEach();
    monkey.scale = monkey.scale + 0.05;
  }
  
  spawnbananas();
  spawnobstacle();
  if (monkey.isTouching(obstacleGroup)){
    monkey.scale=monkey.scale-0.04;
    }
   if (monkey.scale<0.02){
     gameState = END;
   }

    }
 else if (gameState === END) {
    ground.velocityX = 0;
   monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
   text("Press Space 2 Restart" ,250,100)
    
    if(keyDown("space")) {
      reset();
    }
  }
   monkey.collide(ground);
 
  drawSprites();
}

function spawnbananas() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(550,random(10,70),10,40);
    banana.velocityX = -6;
   banana.addImage(bananaImage);
    banana.scale=0.06
    banana.debug=false;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(85);
  }
}

  
function spawnobstacle() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(550,170,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
    obstacle.scale=0.08;
    obstacle.debug=false ;
   obstacleGroup.add(obstacle);
   obstacleGroup.setLifetimeEach(85);
  }
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
 FoodGroup.destroyEach();
 score = 0;
  survivalscore = 0;
  monkey.scale= 0.09;
  
}