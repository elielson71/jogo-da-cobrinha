var _canvas = document.getElementById("snake");
var context = _canvas.getContext("2d");
var box = 32;
var snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}
var direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,

}

//desenhar e deinir o backgroud do canvas
function criaBG() {
    context.fillStyle = "lightgreen";
    //desenha o retagula (x,y,altura e largura)
    context.fillRect(0, 0, 16 * box, 16 * box);
}




function criarCobrinha() {
    for (var i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}


function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}


document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right"
    if (event.keyCode == 40 && direction != "up") direction = "down";
}



function iniciarJogo() {


    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo)
            alert('Game Ouver :(');
        }

    }

    criaBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();

    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    let newHead = {

        x: snakeX,
        y: snakeY,
    }
    snake.unshift(newHead);
}

//a cada 100 mil ele reicia o jogo para ele não travar
iniciarJogo();
var jogo;
var comando = {

    iniciar() {
        jogo = setInterval(iniciarJogo, 100);
        criarCobrinha();
        drawFood();

    }

}

function init() {
    var iniciar = document.querySelector(".iniciar");
    iniciar.addEventListener("click", comando.iniciar())

}