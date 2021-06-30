
function init(){
    canvas = document.getElementById('myCanvas');

    w =  canvas.width = 562;
    h =  canvas.height = 562;
    cs = 40;

    gameOver = false;

    foodImg = new Image();
    foodImg.src = "assets/apple.png";

    score = 0;
    scoreImg = new Image();
    scoreImg.src = "assets/trophy.png";

    speed = 300;
    pNoFood = 0;
    headImg = new Image();
    headImg.src = "assets/sh1.jpg"

    pen = canvas.getContext('2d');

    snake = {
        init_len : 2,
        color : "blue",
        cells : [],
        direction : "right",
        createSnake : function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
            console.log(this.cells);
        },
        drawSnake : function(){
            
            pen.drawImage(headImg,this.cells[0].x*cs,this.cells[0].y*cs,cs-2,cs-2);
            
            for(var i=1;i<this.cells.length;i++){ 
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },
        updateSnake : function(){
            //console.log("updateing");

            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            if(headX == food.x && headY == food.y){
                food = getRandomFood();
                score++;
                let x = Math.floor(score/3);
                if(x > pNoFood){
                     pNoFood = x;
                    if(speed > 200){
                         speed -= 25;
                     }
                     else if(speed > 100){
                         speed -= 20;
                    }
                     else if(speed > 50)
                        speed -= 8;
                     else if(speed > 5)
                        speed -= 5;
                }
                //console.log(speed);
            }
            else{
                this.cells.pop();
            }

            var X,Y;

            if(this.direction == "right"){
                X = headX+1;
                Y = headY;
            }
            else if(this.direction == "left"){
                X = headX-1;
                Y = headY;
            }
            else if(this.direction == "up"){
                X = headX;
                Y = headY-1;
            }
            else if(this.direction == "down"){
                X = headX;
                Y = headY+1;
            }

            this.cells.unshift({x:X,y:Y});
            var lastX = Math.floor(w/cs); 
            var lastY = Math.floor(h/cs); 
            if(this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x >= lastX || this.cells[0].y >= lastY)
            gameOver=true;
        }
    }

    snake.createSnake();

    food = getRandomFood();

    function keyPressed(e){

        if(e.key == "ArrowRight" && snake.direction !== "left")
        snake.direction = "right";
        else if(e.key == "ArrowLeft" && snake.direction !== "right")
        snake.direction="left";
        else if(e.key == "ArrowDown" && snake.direction !== "up")
        snake.direction="down";
        else if(e.key == "ArrowUp" && snake.direction !== "down")
        snake.direction="up";

       // console.log(snake.cells);
       // console.log(e.key);
    }

    document.addEventListener('keydown',keyPressed);
}

function draw(){
    pen.clearRect(0,0,w,h);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.drawImage(foodImg,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(scoreImg,18,20,cs,cs);
    pen.fillStyle = "blue";
    pen.font = "25px roboto";
    pen.fillText(score,30,40);
    
}

function update(){
    
    snake.updateSnake();
    
}

function getRandomFood(){
    var f = true;

    do{
        f=false;
        var foodX = Math.round(Math.random()*(w-cs)/cs);
        var foodY = Math.round(Math.random()*(h-cs)/cs);

        for(let i=0;i<snake.cells.length;i++){

            if(foodX == (snake.cells[i].x) && foodY == (snake.cells[i].y)){
                f=true;
                break;
            }
        }

    }while(f);

    var food = {
        x : foodX,
        y : foodY,
        color : "red"
    }
    return food;
}
function gameLoop(){
    if(gameOver){
        clearInterval(f);
        alert("Game Over");
    }
    update();
    draw();
  //  console.log("gameloop");
}

init();
var f = setInterval(gameLoop,speed);
