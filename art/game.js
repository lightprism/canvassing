var Game = require('gameloop-canvas');
var Mouse = require('crtrdg-mouse');
var Keyboard = require('crtrdg-keyboard');

var game = Game({
  canvas: 'game',
  width: window.innerWidth,
  height: window.innerHeight
});

var mouse = new Mouse(game);
var keyboard = new Keyboard(game);
var keys = keyboard.keysDown;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRGBA(rmin, rmax, gmin, gmax, bmin, bmax, alpha) {
  var r = randomInt(rmin, rmax);
  var g = randomInt(gmin, gmax);
  var b = randomInt(bmin, bmax);
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}

// sun creation
var sun = {
  position: {x: 0, y: 0},
  size: {x: 40, y: 40},
  speed: 22,
  color: randomRGBA(15, 255, 15, 255, 15, 255, .95),
  exploding: false,
  explodeSize: 1
};


game.backgroundColor = randomRGBA(0, 256, 0, 256, 0, 256, 0.3);

mouse.on('click', function(event) {
  game.backgroundColor = randomRGBA(0, 256, 0, 256, 0, 256, 0.3);

  if(sun.exploding) {
    sun.exploding = false;
    sun.explodeSize = 1;
  } else {
    sun.exploding = true;
  }
});

// texture of the background

var size = 5;
var columns = game.width / size;
var rows = game.height / size;

game.on('draw', function (c) {
  c.fillStyle = game.backgroundColor;
  c.fillRect(0, 0, game.width, game.height);

  for (var h=0; h<rows; h+=randomInt(5, 20)){
    c.save();
    c.translate(game.width / 2, 0);
    c.rotate(Math.PI / randomInt(100, -180));
    c.fillStyle = randomRGBA(100, 255, 200, 255, 200, 255, 0.1);
    c.fillRect(
      -game.width/2-50,
      size*h-30,
      game.width+100,
      randomInt(100, 1000)
    );
    c.restore();
  }

  for (var w=0; w<columns; w+=randomInt(5, 20)){
    c.fillStyle = randomRGBA(100, 255, 100, 200, 100, 211, .6);
    c.fillRect(
      size*w,
      randomInt(0, game.height),
      randomInt(1, 3),
      randomInt(1, 3)
    );
  }
});

sun.update = function() {
  sun.input();
  sun.boundaries();
  console.log("sun update function called");
};

sun.idle = function(context) {
  for(var w = 0; w < 3; w++) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(Math.PI/180 * randomInt(-180, 180));
    context.fillStyle = randomRGBA(255, 255, 255, 255, 15, 255, .25);
    context.fillRect(
      -this.size.x / 2,
      -this.size.y / 2,
      this.size.x,
      this.size.y
    );
    context.restore();
  }
};


sun.draw = function(context) {
  if (sun.exploding) {
    sun.explode(context);
  } else {
    sun.idle(context);
  }
};

sun.input = function() {
  if('W' in keys) {
    sun.position.y -= sun.speed;
    console.log('W key');
  }
  if('S' in keys) {
    sun.position.y += sun.speed;
    console.log('S key');
  }

  if('A' in keys) {
    sun.position.x -= sun.speed;
    console.log('A key');

  }
  if('D' in keys) {
    sun.position.x += sun.speed;
    console.log('D key');

  }
};

sun.boundaries = function(){
  if (sun.position.x < -sun.size.x) {
    sun.position.x = game.width;
  }
  if (sun.position.y < -sun.size.y) {
    sun.position.y = game.height;
  }
  if (sun.position.x >= game.width + sun.size.x) {
    sun.position.x = -sun.size.x;
  }
  if (sun.position.y >= game.height + sun.size.y) {
    sun.position.y = -sun.size.y;
  }
}



sun.explode = function(context) {
  for(var w = 0; w < 20; w++) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(Math.PI/20 * randomInt(-20, 20));
    context.fillStyle = randomRGBA(200, 225, 20, 50, 0, 0, .35);
    ontext.fillRect(
      -this.size.x / 2,
      -this.size.y / 2 - 30,
      randomInt(10, 80),
      randomInt(60, this.explodeSize)
    );
    context.restore();
  }
  this.explodeSize += 10;
};

game.on('update', function(dt) {
  //sun.update();
  //sun.draw();
});



game.start();