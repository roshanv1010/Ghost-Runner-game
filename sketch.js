var towerImg, tower, door, doorImg, doorGroup, climber,climberImg, climberGroup;
 
var ghost , ghostImg;

var invisibleBlockGroup, invisibleBlock;

var spookySound;

var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png")
  spookySound=loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  doorGroup = new Group();
  climberGroup = new Group(); 
  invisibleBlockGroup = new Group();
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,300,10,10);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  spookySound.loop();
}

function draw(){
  background(0);
  if (gameState === "play"){
    
  if (tower.y>400){
    tower.y = 300;
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  if(keyDown("space")){
    ghost.velocityY = - 5;
  }
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY =0;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  spawndoors();
  
  if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
  drawSprites();
  }
  if(gameState==="end"){
  stroke("yellow")
  fill("yellow")
  textSize(30);
  text("GameOver",230,250);
}
}



function spawndoors(){
  if (frameCount%420 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x  = Math.round(random(120,400));
    climber.x = door.x
    invisibleBlock.x = door.x;
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    door.setLifetime = 700;
    climber.setLifetime = 700;
    ghost.depth = door.depth;
    door.depth = door.depth+1;
  }
}