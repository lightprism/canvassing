var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var glitchCanvas = document.createElement('canvas');
var glitchContext = glitchCanvas.getContext('2d');

glitchCanvas.width = canvas.width = window.innerWidth;
glitchCanvas.height = canvas.height = window.innerHeight;



var gif = new GIF({
    width: canvas.width,
    height: canvas.height
});

gif.on('finished', function(event) {
    window.open(URL.createObjectURL(event));
});

var frames = 0;


var sourceVideo = document.getElementById('source-video');

sourceVideo.addEventListener('playing', function(event) {
    console.log(event);
    copyFrame(this);
}, false);

function copyFrame(video) {
    glitchContext.drawImage(video, 0, 0, canvas.width, canvas.height);
    var data = glitchContext.getImageData(0, 0, canvas.width, canvas.height);
    var options = {
        amount: 10,
        seed: 11,
        iterations: 10,
        quality: 50
    };

    glitch(data, options, function(glitchData) {
        context.putImageData(glitchData, 0, 0);

        if(frames < 10) {
            frames ++;
            gif.addFrame(context, {
                copy: true,
                delay: 10
            });
            setTimeout(copyFrame, 20, video);
        } else {
            gif.render();
        }
    });
}






