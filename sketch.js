var backImage,backgr, backImage2;
var player, player_running;
var ground,ground_img, banImg, obImg;
var hstore = 300
var END =0;
var PLAY =1;
var gameState = PLAY;
var fGroup, oGroup
var score = 0

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banImg = loadImage("banana.png")
  obImg = loadImage("stone.png")
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.42;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  fGroup = new Group()
  oGroup = new Group()
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);
 

  if(gameState===PLAY){
    drawSprites();
    if(fGroup.isTouching(player)){
      fGroup.destroyEach();
      score = score + 2
      player.scale += +0.1
      hstore = hstore - 60
      
    }  

    foodSpawn();
    obSpawn();
   if(backgr.x<100){
    backgr.x=backgr.width/2;
  if(oGroup.isTouching(player)){
    gameState = END
  }
  }
  
  if(player.y > hstore && keyDown("space")){
    player.velocityY = -14
    
    }
    
    player.velocityY = player.velocityY + 0.6
  
    player.collide(ground);

  }
  
 else if(gameState === END){
    end();
    textSize(30);
    fill(255);
    text("Game Over!", 400, 220)
  }

  drawSprites();
  stroke("white");
    fill("white");
    textSize(20);
    text("Score:"+  score, 500, 100);

 
}
function foodSpawn(){
  if(frameCount % 80 == 0){
    var rand1 = Math.round(random(100,200))
    banana = createSprite (880,rand1)
    banana.addImage(banImg)
    banana.velocityX = -4
    banana.lifetime = 300
    banana.scale = 0.05
    fGroup.add(banana)
    player.depth = banana.depth +1
  }
  
}
function obSpawn(){
  if(frameCount % 300 == 0){
    var rand1 = Math.round(random(340,340))
    obstacle = createSprite (880, rand1)
    obstacle.addImage(obImg)
    obstacle.velocityX = -4
    obstacle.lifetime = 300
    obstacle.scale = 0.16
    oGroup.add(obstacle)
  }
  
}
function end(){

  backgr.velocityX = 0;
    player.visible = false
    fGroup.destroyEach();
    oGroup.destroyEach();
backgr.scale = 0.0001

}