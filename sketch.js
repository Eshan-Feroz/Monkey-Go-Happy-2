//Global Variables

var player, playerRunning;
var bananaImage, bananaGroup, stone_image, stoneGroup;
var backGround, backGroundImage;

var score = 0;
function preload(){
  backGroundImage = loadImage("jungle.jpg");
  
  playerRunning = loadAnimation("Monkey_01.png",      "Monkey_02.png","Monkey_03.png","Monkey_04.png",                        "Monkey_05.png","Monkey_06.png","Monkey_07.png",
                                "Monkey_08.png","Monkey_09.png","Monkey_10.png"); 
  
  bananaImage = loadImage("Banana.png");
  stone_image = loadImage("stone.png");
}

function setup() {
  createCanvas(600,300);
  
  
 
  backGround = createSprite(0, 0, 600, 300);
  backGround.addImage("background", backGroundImage);
  
  backGround.x = backGround.width/2;
  backGround.velocityX = -4;
  
  ground = createSprite(300, 280, 600, 15);
  ground.visible = false;
  
  player = createSprite(85, 240, 20, 20);
  player.addAnimation("running",playerRunning);
  player.scale = 0.10;
  
  stoneGroup = new Group();
  bananaGroup = new Group();
}


function draw(){
  
 background(255);
  
  
  
  if(keyDown("space")){
  player.velocityY = -10;  
  }  
  player.velocityY = player.velocityY + 0.8;
  player.collide(ground);
  
  if(backGround.x < 100){
    backGround.x = backGround.width/2;
   
  }  
  
   
  if(bananaGroup.isTouching(player)){
    bananaGroup.destroyEach();
    score = score + 2
    
  }
  switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
  obstaclesStone();
  foodBanana();
  
  if(stoneGroup.isTouching(player)){ 
        player.scale=0.08;
    }
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
}

function foodBanana(){
  
  
  if (World.frameCount % 40 === 0) {
    banana = createSprite(800, 200, 10, 10);
    banana.y = random(120, 200);
    banana.scale = 0.05;
    banana.addImage(bananaImage);
    banana.velocityX = -7;
    banana.lifetime = 800/7;
    bananaGroup.add(banana);
    player.depth = banana.depth + 1;
      
  }
}
function obstaclesStone(){
  if(World.frameCount % 300 === 0) {
    stone = createSprite(600, 253, 10, 10);
    stone.scale = 0.1;
    stone.addImage(stone_image);
    stone.velocityX = -8;
    stone.lifetime = 200;
    stoneGroup.add(stone);
  }    
}
