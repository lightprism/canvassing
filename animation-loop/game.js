var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 400;
// constructor
function Box(options) {
    this.x = options.x || 10;
    this.y = options.y || 10;
    this.width = options.width || 100;
    this.height = options.height || 100;
    this.color = options.color || '#000000';
}

var boxes = [];
var totalBoxes = 100;

for(var i = 0; i < totalBoxes; i++) {
    boxes[i] = new Box({
        x: 20,
        y: 100,
        width: 25,
        height: 50,
        color: 'red'
    });
    boxes[i].color = randomColor(0, 255, 0, 255, 0, 255, 0.5);
}

function update() {
    boxes.forEach(function(box, i) {
        box.x += randomNumber(-5, 5);
        box.y += randomNumber(-5, 5);
    });
}

function draw() {
    context.clearRect(0,0, canvas.width, canvas.height);

    boxes.forEach(function(box, i) {
        context.fillStyle = box.color;
        context.fillRect(box.x, box.y, box.width, box.height);

    });
}

function loop() {
    update();
    draw();
    window.requestAnimationFrame(loop);
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min + 1) + min);
}

function randomColor(rmin, rmax, gmin, gmax, bmin, bmax, alpha) {
    var r = randomNumber(rmin, rmax);
    var g = randomNumber(gmin, gmax);
    var b = randomNumber(bmin, bmax);
    return 'rgba(' + r + ',' + g + ', ' + b + ', ' + alpha + ')';
}

loop();



