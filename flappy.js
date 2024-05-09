let board;
let bw = 1280;
let bh = 700;
let context;

let biw = 54;
let bih = 44;
let bix = bw/8;
let biy = bh/2;

let bird = {
    y : biy,
    x : bix,
    width : biw,
    height : bih,
}

let pipearray = [];
let pw = 104;
let ph = 512;
let px = bw;
let py = 0;

let tpipeImg;
let bpipeImg;

let velocityx = -2;
let velocityy = 0;
let gravity = 0.4;

let gameover = false;
let score = 0;

window.onload= function(){
    board = document.getElementById('board');
    board.height = bh;
    board.width = bw;
    context = board.getContext("2d");

    context.fillStyle = "#0099cc";
    context.fillRect(bird.x,bird.y,bird.width,bird.height);

    birdImg = new Image();
    birdImg.src = "pics/bird.png";
    birdImg.onload = function(){
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
    }

    tpipeImg = new Image();
    tpipeImg.src = "pics/pipe.png";
    bpipeImg = new Image();
    bpipeImg.src = "pics/bipe.png";
    
    requestAnimationFrame(update);
    setInterval(placepipe,2300);
    document.addEventListener('keydown',movebird);
}

function update(){
    if(gameover){
        return;
    }
    requestAnimationFrame(update);
    context.clearRect(0,0,bw,bh);
    velocityy += gravity;
    bird.y = Math.max(bird.y + velocityy,0)
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
    if(bird.y > board.height){
        gameover=true;
    }
    for(let i=0; i<pipearray.length; i++){
        let pipe = pipearray[i];
        pipe.x += velocityx;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5;
            pipe.passed = true;
        }
        if(dcollision(bird,pipe)){
            gameover=true;
        }
    }
    while(pipearray.length>0 && pipearray[0].x < -50){
        pipearray.shift();
    }
    context.fillStyle = "yellow";
    context.font = "45px sans-serif";
    context.fillText(score,5,45);
    if(gameover){
        context.fillText("GameOver",5,90)
    }
}
function placepipe(){
    let randompipey = py - ph/4 - Math.random()*(ph/2);
    openspace = board.height/4;
    let tpipe = {
        img : tpipeImg,
        x : px,
        y : randompipey,
        width : pw,
        height: ph,
        passed : false
    }
    pipearray.push(tpipe);

    let bpipe = {
        img : bpipeImg,
        x : px,
        y : randompipey + ph + openspace,
        width : pw,
        height: ph,
        passed : false
    }
    pipearray.push(bpipe);
}
function movebird(e){
    if(e.code== "Space" || e.code == "ArrowUp"){
        velocityy = -6;
        if(gameover){
            bird.y = biy;
            pipearray = [];
            score = 0;
            gameover=false;
            update();
        }
    }
}
function dcollision(a,b){
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}