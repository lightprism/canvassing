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
}

var boxes = [];
var drawing = false;
var boxSize = 10;
document.addEventListener('mouseup', function(event) {
    drawing = false;
});

document.addEventListener('mousedown', function(event) {
    drawing = true;
});

document.addEventListener('mousemove', function(event) {
    if(drawing === true) {
        boxes[boxes.length] = new Box({
            x: event.clientX - boxSize/2,
            y: event.clientY - boxSize/2,
            width: boxSize,
            height: boxSize,
            color: randomColor(100, 255, 0, 0, 0, 255, 0.5)
        });
    }
});

function update() {
    boxes.forEach(function(box, i) {
        box.x += randomNumber(-1, 1);
        box.y += randomNumber(-1, 1);
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



