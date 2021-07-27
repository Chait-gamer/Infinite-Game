var runningAnimation, gameBackground, platformBackground, obstaclePic, obstacle;
var runningPic1, runningPic2, runningPic3, runningPic4, runningPic5, runningPic6, runningPic7, runningPic8 
var runner;
var PLAY = 1
var END = 0
var GameState = PLAY

function preload(){
    
    runningPic1 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run00.png')
    runningPic2 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run01.png')
    runningPic3 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run02.png')
    runningPic4 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run03.png')
    runningPic5 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run04.png')
    runningPic6 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run05.png')
    runningPic7 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run06.png')
    runningPic8 = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run07.png')
    runningAnimation = loadAnimation(runningPic1, runningPic2, runningPic3, runningPic4, runningPic5, runningPic6, runningPic7, runningPic8        
      );
    
    gameBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultBackground.png');
    platformBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultPlatform.png');
    obstaclePic = loadImage("obstacle.jpg")
             
}

function setup(){

  createCanvas(840,390);
  runner = createSprite(100,240,100,100);
  runner.addAnimation("running",runningAnimation);
  runner.scale = 2;
  runner.setCollider("rectangle",0,0,runner.width,runner.height);
  runner.debug = false;

  platform = createSprite(420, 450, 100,100);
  platform.addImage(platformBackground);

  ground = createSprite(420, 290, 1000, 1)
  
  obstacleGroup = createGroup()
}

function draw(){
    
  background(gameBackground);

  if(GameState === PLAY){
    
    if(keyDown("space") && runner.y >= 200){
      
      runner.velocityY = -18;
      
    }
    
    if(obstacleGroup.isTouching(runner)){
      
      GameState = END;
      
    }
    
    
    runner.velocityY = runner.velocityY+ 1;

    obstacle1()
  
    
  }
  else if(GameState === END){
    
    obstacleGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    
    runner.velocityY = 0;
    
  }

  runner.collide(ground);
  drawSprites();

}

function obstacle1(){

  if(frameCount % 60==0){
    obstacle = createSprite(940,270,10);
    obstacle.addImage(obstaclePic);
    obstacle.velocityX = -15;
    obstacle.scale = 0.4;
    obstacle.lifetime = 400;
    
    obstacle.setCollider("circle",0,0,200);
    obstacle.debug = false
    
    obstacleGroup.add(obstacle);
  }

}