const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');

const SIZE = 20;

const head = {
    x: 0,
    y: 0
};

let food = null;

let dx = 0;
let dy = 0;

setInterval(main, 1000);

function main(){
    update();
    draw();
}
function update(){
    head.x += dx;
    head.y += dy;

    if(food && head.x === food.x && head.y === food.y){
        food = null;
    }

    if(!food){
        food = {x: getRandomX(), y: getRandomY()}
    }
}

function getRandomX(){
    return SIZE * (parseInt(Math.random() * 20));
}

function getRandomY(){
    return SIZE * (parseInt(Math.random() * 23));
}

function draw(){
    context.fillStyle = 'black';
    context.fillRect(0, 0, myCanvas.width, myCanvas.height);
    drawObject(head, 'lime');
    drawObject(food, 'white');
};

function drawObject(obj, color){
    context.fillStyle = color;
    context.fillRect(obj.x, obj.y, SIZE, SIZE);
}

document.addEventListener('keydown', moveSnake);

function moveSnake(event){
    switch(event.key){
        case 'ArrowUp':
            console.log('arriba');
            dx = 0;
            dy = -SIZE;
        break;
        case 'ArrowDown':
            console.log('abajo');
            dx = 0;
            dy = SIZE;
        break;
        case 'ArrowRight':
            console.log('Derecha');
            dx = SIZE;
            dy = 0;
        break;
        case 'ArrowLeft':
            console.log('Izquierda');
            dx = -SIZE;
            dy = 0;
        break;
        
    }
}
