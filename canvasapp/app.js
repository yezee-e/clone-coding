const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //ctx=context

canvas.height = 800;
canvas.width = 800;

ctx.rect(50, 50, 100, 100);

ctx.stroke();
