let board;
let bw = 1000;
let bh = 2600;
let context;

let biw = 114;
let bih = 124;
let bix = bw/6;
let biy = bh/2;

let bird = {
    y : biy,
    x : bix,
    width : biw,
    height : bih,
}

let pipearray = [];
let pw = 250;
let ph = 1500;
let px = bw;
let py = 0;

let tpipeImg;
let bpipeImg;

let velocityx = -5;
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
    birdImg.src = "pics/birb.png";
    birdImg.onload = function(){
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
    }

    tpipeImg = new Image();
    tpipeImg.src = "pics/tipe.png";
    bpipeImg = new Image();
    bpipeImg.src = "pics/bipe.png";
    
    requestAnimationFrame(update);
    setInterval(placepipe,2700);
    document.addEventListener('click',movebird);
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
    if(bird.y > board.height ){
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
    while(pipearray.length>0 && pipearray[0].x < (-pw)){
        pipearray.shift();
    }
    context.fillStyle = "yellow";
    context.font = "145px sans-serif";
    context.fillText(score,5,135);
    if(gameover){
        context.fillText("   ",5,9)
    }
}
function placepipe(){
    let randompipey = py - ph/4 - Math.random()*(ph/2);
    openspace = bh/6;
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
function movebird(){
    velocityy = -9;
    if(gameover){
        bird.y = biy;
        pipearray = [];
        score = 0;
        gameover=false;
        update();
    }
    
}
function dcollision(a,b){
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}
