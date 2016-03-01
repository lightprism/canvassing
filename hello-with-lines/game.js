var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

context.beginPath();


/*
H
*/
context.moveTo(20, 20);
context.lineTo(20, 50);

context.moveTo(20, 35);
context.lineTo(35, 35);

context.moveTo(35, 20);
context.lineTo(35, 50);

// V

context.moveTo(50, 20);
context.lineTo(65, 50);

context.lineTo(80, 20);;

// change color
context.strokeStyle = '#ff0000';

// change width
context.lineWidth = 10;

// change lines end caps
context.lineCap = "round";

context.stroke();
