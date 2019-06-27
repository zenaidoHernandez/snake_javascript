const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');

const SIZE = 20;

const head = {
    x: 0,
    y: 0
};

let body = [];

let food = randomFoodPosition();

let dx = 0;
let dy = 0;
let lastMoveAxis;

let score = 0;
let displayScore = document.getElementById('score');
setInterval(main, 100);

function main(){
    update();
    draw();
}
function update(){
    checkCollision();
    increaseSnake(true);
    head.x += dx;
    head.y += dy;

    if(dx != 0){
        lastMoveAxis = 'X';
    }else if (dy != 0){
        lastMoveAxis = 'Y';
    }

    if(head.x === food.x && head.y === food.y){
        score++;
        displayScore.innerHTML = score;
        food = randomFoodPosition();
    }
    else{
        increaseSnake(false);
    }
}

function randomFoodPosition(){
    let positionFood;
    do{
        positionFood = {x: getRandomX(), y: getRandomY()}
    }while(checkFoodCollision(positionFood));

    return positionFood;
}

function checkFoodCollision(positionFood){
    let bodyLength = body.length;
    for(let i = 0; i > bodyLength; i++){
        if(JSON.stringify(body[i]) == JSON.stringify(positionFood));
            return true;
    }

    if(JSON.stringify(head) == JSON.stringify(positionFood))
        return true;
    
    return false;
}
function increaseSnake(increase){
    if(increase){
        body.push({x: head.x, y: head.y});
    }
    else{
        body.shift();
    }
}

function checkCollision(){
    let bodyLength = body.length;
    let top = head.y < 0;
    let bottom = head.y >= 460;
    let left = head.x < 0;
    let right = head.x >= 400;
    for(let i = 0; i < bodyLength; i++){
        if(JSON.stringify(body[i]) == JSON.stringify(head)){
            gameOver();
           continue;
        }
    };
    if(top || bottom || left || right){
        gameOver();
    }
}

function gameOver(){
    head.x = 0;
    head.y = 0;
    dx = 0;
    dy = 0;
    body = [];
    score = 0;
    displayScore.innerHTML = 0;
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
            if(lastMoveAxis != 'Y'){
                dx = 0;
                dy = -SIZE;
            }
        break;
        case 'ArrowDown':
            if(lastMoveAxis != 'Y'){
                dx = 0;
                dy = SIZE;
            }
        break;
        case 'ArrowRight':
            if(lastMoveAxis != 'X'){
                dx = SIZE;
                dy = 0;
            }
        break;
        case 'ArrowLeft':
            if(lastMoveAxis != 'X'){
                dx = -SIZE;
                dy = 0;
            }
        break;
        
    }
}
