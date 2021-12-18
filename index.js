
const score = document.querySelector('.score');
const startScreen = document.querySelector('.start');
const gamearea = document.querySelector('.gamearea');


startScreen.addEventListener('click',start);
let keys = {ArrowUp : false, ArrowDown: false, ArrowLeft: false,ArrowRight: false}

function keyDown(e){
        e.preventDefault();
        keys[e.key]= true;
        // console.log(e.key);
        console.log(keys);
}
function keyUp(e){
        e.preventDefault();
        keys[e.key]= false;
        // console.log(e.key);
        console.log(keys);
}
document.addEventListener('keyup',keyUp);
document.addEventListener('keydown',keyDown);

let player = {speed : 6 , score : 0};

function isColide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top)||(aRect.top > bRect.bottom)||(
            aRect.right < bRect.left)||(aRect.left > bRect.right));
}

function movelines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

       
            if(item.y >= 400){
               item.y -= 670; 
            }

        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over! <br> Final Score is: " +player.score+
                            "<br>Press here to restart the Game."
}

function moveenemy(car){
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){

        if(isColide(car,item)){
            console.log("boom hit!");
            endGame();
        }
       
       
            if(item.y >= 700){
               item.y -= 950; 
              item.style.left = Math.floor(Math.random()*370)+"px";
            }

        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function gamePlay(){
    // console.log('Hey I am clicked!');
    let car = document.querySelector('.car');
    let road = gamearea.getBoundingClientRect();
    // console.log(road);
    
    if(player.start){
        
        movelines();
        moveenemy(car);

        if(keys.ArrowUp && player.y > (road.top +70)  ) {player.y -=player.speed}
        if(keys.ArrowDown && player.y<road.bottom - 70) {player.y +=player.speed}
        if(keys.ArrowLeft && player.x>0) {player.x -=player.speed}
        if(keys.ArrowRight && player.x<(road.width - 50)) {player.x +=player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";


    window.requestAnimationFrame(gamePlay);
    console.log(player.score++);

    player.score++;
    score.innerText = "Score : "+ player.score;
  }
}
function start(){  
    // gamearea.classList.remove('hide');
    startScreen.classList.add('hide');
    gamearea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    
    for(x=0; x<5; x++){
    let roadline = document.createElement('div');
    roadline.setAttribute('class', 'lines');
    roadline.y = (x*70); 
    roadline.style.top = roadline.y + "px";
    gamearea.appendChild(roadline);
   }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText = "Hey I am your car!";
    gamearea.appendChild(car);
    
    player.x=car.offsetLeft;
    player.y=car.offsetTop;

    // console.log(car.offsetTop);
    // console.log(car.offsetLeft);

    for(x=0; x<3; x++){
    let enemyCar = document.createElement('div');
    enemyCar.setAttribute('class','enemy');
    enemyCar.y = ((x+1) * 350) * -1; 
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.background = 'blue';
    enemyCar.style.left = Math.floor(Math.random()*350)+"px";
    gamearea.appendChild(enemyCar);
    }
}
