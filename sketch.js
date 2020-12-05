//create globle function [Step:1]
  var monkey,monkeyimg;
  var baground,bagroundimg;
  var banana,bananaimg;
  var obstacle, obstacleimg;
  var score = 0 ,invg;
  var restart,restartimg
  var start , startimg
  var PLAY = 1
  var END = 0
  var SERVE =0.4
  var gamestate = SERVE
  

function preload(){
   monkeyimg=        loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",              "Monkey_04.png","Monkey_05.png","Monkey_06.png");
  bananaimg = loadImage("banana.png")
  obstacleimg= loadImage("stone.png")
  restartimg = loadImage("5.jpg")
  startimg = loadImage ("1.jpg")
  bagroundimg = loadImage("jungle-1.jpg")}

function setup() {
  
  createCanvas(500, 400);
  
  invg = createSprite(200,380,400,10)
  invg.visible = false
  
  baground = createSprite(0,200,800,40);
  
  
  start = createSprite(200,310,20,40);
  start.addImage(startimg);
  start.scale=0.45
  
  stone = new Group ();
  food  = new Group ()
  
  monkey = createSprite(40,380,20,50);
  monkey.addAnimation("monkey",monkeyimg)
  monkey.scale=0.1;
  
  restart = createSprite(250,200,50,50)
  restart.addImage(restartimg)
  restart.scale = 1.5
  
  }

function draw() {
  background("white")
  
if (gamestate === SERVE )
 {
  background("white")
  stroke("black")
  textSize(20)
  fill("black")
  text ("👋👋hello, welcome to monkey go happy game ",1,60) 
  text ("these are some instructions, hope you will like the game." , 1,100 )
  text ("1) Press spacebar Key to make the monkey jump. ",1,140)
  text ("2) If you will touch the stone ,the game will end.",1,170)
  text("3) if the game Ends then click on the restart lable.  ",1,200)
  text("which appears on the screen.",22,220) 
   text("4) To start the game now click on start.",1,250)
   
   text("⬇⬇⬇⬇",180,270)
   
  monkey.visible= false
  baground.visible = false;
  restart.visible = false; 
  
   if (mousePressedOver(start)) 
  {
    gamestate = PLAY
  }
  
  
  }else if (gamestate === PLAY)
  {
  monkey.visible= true
  spawnbanana();
  spawnStone();   
     
  if (keyDown("space")&& monkey.y > 200) 
  {
   monkey.velocityY = -10;
  }
   
  monkey.visible = true
    
  baground.visible = true;
  baground.addImage(bagroundimg);
  baground.velocityX=-1 
    
  restart.visible = false; 
  
  if (baground.x < 100)
  {
   baground.x = baground.width/2;
  }
  
  if (stone.isTouching(monkey))
  {
   monkey.scale = 0.1
  }
  
  if (monkey.isTouching(food))
  {
    food.destroyEach(); 
    score = score+2
  }
               
  switch(score)
  {
    case 10 : monkey.scale = 0.12
             break;
    case 20 : monkey.scale = 0.14
             break;
    case 30 : monkey.scale = 0.16
             break;
    case 40 : monkey.scale = 0.18
             break;
      default : break;    
  } 
  
  start.visible = false
    
  if (monkey.isTouching(stone) )
  {
   gamestate = END 
  }
    
  }else if (gamestate === END ) 
  {
    baground.visible = false
    monkey.visible= false
    baground.velocityX=0 
    restart.visible=true;
    stone.destroyEach();
    food.destroyEach();
    food.setLifetimeEach(-1);
    stone.setLifetimeEach(-1);
    food.setVelocityXEach(0);
    stone.setVelocityXEach(0);
    
    
    if (mousePressedOver(restart))
    {starte();}
  }

  
  console.log(gamestate)
  monkey.velocityY = monkey.velocityY+0.8
  monkey.collide(invg);
  
  drawSprites();
  
  stroke("white")
  textSize(20)
  fill("white")
  text("Score: "+score,200,20 )}


function spawnbanana() {
  //write code here to spawn the banana
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,260));
    banana.addImage(bananaimg);
    food.add(banana)
    banana.scale = 0.045
    banana.velocityX = -3;
 //assign lifetime to the variable
    banana.lifetime = 400;   
  }
}

function spawnStone() {
  //write code here to spawn the cbanana
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600,350,40,10);
    obstacle.addImage(obstacleimg);
    stone.add(obstacle) 
    obstacle.scale = 0.15
    obstacle.velocityX = -3;
 //assign lifetime to the variable
    obstacle.lifetime = 400;   
  }
}

function starte()
 {
    gamestate=PLAY;
    food.destroyEach();
    stone.destroyEach();
    restart.visible = false;
    score=0;
 }
  
