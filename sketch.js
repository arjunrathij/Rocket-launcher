var space, spaceImage, rocket, rocketImage;
var obstacle, obstacleImage, star, starImage;
var obstaclesGroup, starsGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload() {

  spaceImage = loadImage("space.png");
  rocketImage = loadImage("rocket.png");
  obstacleImage = loadImage("obstacle.png");
  starImage = loadImage("star.png");

}

function setup() {

  createCanvas(535, 550);

  space = createSprite(250, 225);
  space.addImage(spaceImage);
  space.scale = 4;
  space.velocityY = 1.5;

  obstaclesGroup = new Group();
  starsGroup = new Group();

  rocket = createSprite(250, 150);
  rocket.addImage(rocketImage);
  rocket.scale = 0.13;

  score = 0;
}

function draw() {
  background(0);
  // text("score: ",score,l00,100);
  
  if (gameState === PLAY) {

    fill("red");
    textSize(15);
    text("score", 100, 100);
    
    if (space.y > 300) {
      space.y = 200;
    }

    if (keyDown("space")) {
      rocket.velocityY = -8;
    }

    rocket.velocityY = rocket.velocityY + 0.8;

    if (keyDown(LEFT_ARROW)) {
      rocket.x = rocket.x - 4;
    }

    if (keyDown(RIGHT_ARROW)) {
      rocket.x = rocket.x + 4;
    }

    if (rocket.y > 550) {
      gameState = END;
    }

    if (obstaclesGroup.isTouching(rocket)) {
      gameState = END;

    }

    spawnObstacles();
    spawnStars();

  } else if (gameState === END) {
    fill("yellow");
    textSize(30);
    text("GameOver", 200, 200);

    fill("blue");
    textSize(20);
    text(" YOU CRASHED !", 200, 260);
    text(" FALL DOWN !", 200, 300);

    fill("orange");
    textSize(20);
    text(" or ", 200, 280);

    rocket.destroy();
    obstaclesGroup.destroyEach();
    starsGroup.destroyEach();
    space.destroy();

  }

  drawSprites();
}

function spawnObstacles() {

  if (frameCount % 150 === 0) {

    obstacle = createSprite(70, 0);
    obstacle.x = Math.round(random(100, 400));
    obstacle.addImage(obstacleImage);
    obstacle.velocityY = 1.5;
    obstacle.scale = 0.3;

    obstaclesGroup.add(obstacle);
  }
}

function spawnStars() {

  if (frameCount % 250 === 0) {

    star = createSprite(250, 100);
    star.x = Math.round(random(200, 500));
    star.addImage(starImage);
    star.velocityY = 1.5;
    star.scale = 0.3;

    starsGroup.add(star);
  }
}