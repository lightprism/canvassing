var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

context.fillStyle = "#ee8833";
context.font = "italic 50px sans-serif";
context.fillText('hello', 100, 100);


context.strokeStyle = "#ff0000";
context.strokeWidth = 10;
context.strokeText("Hey", 10, 50);

context.stroke();

