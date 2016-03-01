var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// constructor
function Box(options) {
    this.x = options.x || 10;
    this.y = options.y || 10;
    this.width = options.width || 100;
    this.height = options.height || 100;
    this.color = options.color || '#000000';
    this.speed = options.speed || 5;
    this.direction = options.direction || 'right';
}

var keys = {};

var player = new Box({
    x: 10,
    y: 10,
    width: 100,
    height: 65,
    speed: 5
});

var bullets = [];

function loadImage(path, callback) {
    var img = new Image();
    img.onerror = function() {
        callback('image failed to load');
    }

    img.onabort = function() {
        callback('image failed to load');
    }

    img.onload = function() {
        callback(null, img);
    }

    img.src = path;
}



function input(player) {
    if (37 in keys) {
        player.x -= player.speed;
        player.direction = 'left';
    }
    if (39 in keys) {
        player.x += player.speed;
        player.direction = 'right';
    }

    if(38 in keys) {
        player.y -= player.speed;
        player.direction = 'up';
    }
    if(40 in keys) {
        player.y += player.speed;
        player.direction = 'down';
    }

    if(32 in keys) {
        bullets[bullets.length] = new Box({
            x: player.x + 50,
            y: player.y + 50,
            width: 4,
            height: 4,
            color: '#dc8ba2',
            speed: 10,
            direction: player.direction
        });
    }
}

function boundaries(box) {
    if (box.x <= 0) {
        box.x = 0;
    }

    if (box.x + box.width >= canvas.width) {
        box.x = canvas.width - box.width;
    }

    if (box.y <= 0) {
        box.y = 0;
    }

    if (box.y + box.height >= canvas.height) {
        box.y = canvas.height - box.height;
    }

    bullets.forEach(function(bullet) {
        if(bullet.x + bullet.width >= canvas.width) {
            bullet.speed *= -1;
        }

        if(bullet.x <= 0) {
            bullet.speed *= -1;
        }

        if(bullet.y <= 0) {
            bullet.speed *= -1;
        }

        if(bullet.y + bullet.height >= canvas.height) {
            bullet.speed *= -1;
        }
    });
}

function drawBox(box) {

    if(box.image) {
        context.drawImage(
            box.image,
            box.x,
            box.y,
            box.width,
            box.height
        );
    }
    else {
        context.fillStyle = box.color;
        context.fillRect(box.x, box.y, box.width, box.height);
    }

}



window.addEventListener('keydown', function(event) {
    keys[event.keyCode] = true;
    event.preventDefault();
});

window.addEventListener('keyup', function(event) {
    delete keys[event.keyCode];
});


function update() {
    input(player);
    boundaries(player);

    bullets.forEach(function (b) {
        if(b.direction == 'left') {
            b.x -= b.speed;
        }
        if(b.direction == 'right') {
            b.x += b.speed;
        }
        if(b.direction == 'up') {
            b.y -= b.speed;
        }
        if(b.direction == 'down') {
            b.y += b.speed;
        }
    });
}

function draw() {
    context.clearRect(0,0, canvas.width, canvas.height);
    drawBox(player);
    bullets.forEach(function(bullet) {
        drawBox(bullet);
    });
}

function loop() {
    update();
    draw();
    window.requestAnimationFrame(loop);
}


loadImage('/images/face.png', function(error, image) {

    if(error) return console.error(error);
    player.image = image;
    loop();
});



