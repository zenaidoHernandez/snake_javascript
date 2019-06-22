const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');

const SIZE = 20;

const head = {
    x: 0,
    y: 0
};

const body = [];

let food = null;

let dx = 0;
let dy = 0;

setInterval(main, 200);

function main(){
    update();
    draw();
}
function update(){
    increaseSnake(true);

    head.x += dx;
    head.y += dy;

    if(!food){
        food = {x: getRandomX(), y: getRandomY()}
    }

    if(head.x === food.x && head.y === food.y){
        food = {x: getRandomX(), y: getRandomY()}
    }
    else{
        increaseSnake(false);
    }
}

function increaseSnake(increase){
    if(increase){
        console.log('debe crecer');
        body.push({x: head.x, y: head.y});
    }
    else{
        console.log('no debe crecer');
        body.shift();
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
    body.forEach(element => drawObject(element, 'lime'));
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
